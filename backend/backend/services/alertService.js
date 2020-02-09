/**
 *
 * Copyright HackerBay, Inc.
 *
 */

module.exports = {

    hasEnoughBalance: async function (projectId, alertPhoneNumber, userId, alertType) {

        var project = await ProjectService.findOneBy({ _id: projectId });
        var balance = project.balance;
        var countryCode = alertPhoneNumber.split(' ')[0];
        var countryType = getCountryType(countryCode);
        var alertChargeAmount = getAlertChargeAmount(alertType, countryType);
        if (balance > alertChargeAmount.minimumBalance) {
            await PaymentService.chargeAlert(userId, projectId, alertChargeAmount.price);
            return true;
        } else {
            return false;
        }
    },

    checkConfig: async function (projectId, alertPhoneNumber) {
        var project = await ProjectService.findOneBy({ _id: projectId });
        var alertOptions = project.alertOptions;
        var countryCode = alertPhoneNumber.split(' ')[0];
        var countryType = getCountryType(countryCode);
        if (countryType === 'us') {
            countryType = 'billingUS';
        } else if (countryType === 'non-us') {
            countryType = 'billingNonUSCountries';
        } else if (countryType === 'risk') {
            countryType = 'billingRiskCountries';
        }
        if (alertOptions[countryType]) {
            return true;
        }
        return false;
    },
    findBy: async function ({ query, skip, limit, sort }) {
        try {
            if (!skip) skip = 0;

            if (!limit) limit = 10;

            if (!sort) sort = -1;

            if (typeof (skip) === 'string') {
                skip = parseInt(skip);
            }

            if (typeof (limit) === 'string') {
                limit = parseInt(limit);
            }

            if (typeof (sort) === 'string') {
                sort = parseInt(sort);
            }

            if (!query) {
                query = {};
            }

            if (!query.deleted) query.deleted = false;
            var alerts = await AlertModel.find(query)
                .sort(sort)
                .limit(limit)
                .skip(skip)
                .populate('userId', 'name')
                .populate('monitorId', 'name')
                .populate('projectId', 'name');
            return alerts;
        } catch (error) {
            ErrorService.log('alertService.findBy`  ', error);
            throw error;
        }
    },


    create: async function ({ projectId, monitorId, alertVia, userId, incidentId, onCallScheduleStatus, schedule, escalation, alertStatus, error, errorMessage }) {
        try {
            var alert = new AlertModel();
            alert.projectId = projectId;
            alert.onCallScheduleStatus = onCallScheduleStatus;
            alert.schedule = schedule;
            alert.escalation = escalation;
            alert.monitorId = monitorId;
            alert.alertVia = alertVia;
            alert.userId = userId;
            alert.incidentId = incidentId;
            alert.alertStatus = alertStatus;

            if (error) {
                alert.error = error;
                alert.errorMessage = errorMessage;
            }

            var savedAlert = await alert.save();

            return savedAlert;
        } catch (error) {
            ErrorService.log('alertService.create', error);
            throw error;
        }
    },

    countBy: async function (query) {
        try {
            if (!query) {
                query = {};
            }

            if (!query.deleted) query.deleted = false;
            var count = await AlertModel.count(query);
            return count;
        } catch (error) {
            ErrorService.log('alertService.countBy', error);
            throw error;
        }

    },

    updateOneBy: async function (query, data) {
        try {
            if (!query) {
                query = {};
            }

            if (!query.deleted) query.deleted = false;
            var updatedAlert = await AlertModel.findOneAndUpdate(query,
                {
                    $set: data
                },
                {
                    new: true
                });
        } catch (error) {
            ErrorService.log('AlertService.updateOneBy', error);
            throw error;
        }
        return updatedAlert;
    },

    updateBy: async function (query, data) {
        try {
            if (!query) {
                query = {};
            }

            if (!query.deleted) query.deleted = false;
            var updatedData = await AlertModel.updateMany(query, {
                $set: data
            });
            updatedData = await this.findBy(query);
            return updatedData;
        } catch (error) {
            ErrorService.log('alertService.updateMany', error);
            throw error;
        }
    },

    deleteBy: async function (query, userId) {
        try {
            if (!query) {
                query = {};
            }

            query.deleted = false;
            var alerts = await AlertModel.findOneAndUpdate(query, {
                $set: {
                    deleted: true,
                    deletedAt: Date.now(),
                    deletedById: userId
                }
            }, {
                new: true
            });
            return alerts;
        } catch (error) {
            ErrorService.log('alertService.deleteBy', error);
            throw error;
        }
    },

    sendCreatedIncident: async function (incident) {
        try {
            if (incident) {
                var _this = this;

                var monitorId = incident.monitorId._id ? incident.monitorId._id : incident.monitorId;

                var schedules = await ScheduleService.findBy({ monitorIds: monitorId });

                for (var schedule of schedules) {
                    _this.sendAlertsToTeamMembersInSchedule({ schedule, incident });
                }

            }
        } catch (error) {
            ErrorService.log('alertService.sendCreatedIncident', error);
            throw error;
        }
    },

    sendAlertsToTeamMembersInSchedule: async function ({ schedule, incident }) {
        var _this = this;
        var monitorId = incident.monitorId._id ? incident.monitorId._id : incident.monitorId;
        var projectId = incident.projectId._id ? incident.projectId._id : incident.projectId;
        var monitor = await MonitorService.findOneBy({ _id: monitorId });
        var project = await ProjectService.findOneBy({ _id: projectId });

        if (!project.alertEnable) {
            return;
        }

        if (!schedule || !incident) {
            return;
        }

        //scheudle has no escalations. Skip. 
        if (!schedule.escalationIds || schedule.escalationIds.length === 0) {
            return;
        }

        var callScheduleStatuses = OnCallScheduleStatusService.findBy({ query: { incident: incident.id, schedule: schedule } });
        var onCallScheduleStatus = null;
        var escalationId = null;
        var currentEscalationStatus = null;

        if (callScheduleStatuses.length === 0) {
            //start with first ecalation policy, and then escalationPolicy will take care of others in escalation policy.  
            escalationId = schedule.escalationIds[0];

            if (escalationId && escalationId._id) {
                escalationId = escalationId._id;
            }

            currentEscalationStatus = {
                escalation: escalationId,
                callRemindersSent: 0,
                emailRemindersSent: 0,
                smsRemindersSent: 0
            };

            //create new onCallScheduleStatus
            onCallScheduleStatus = await OnCallScheduleStatusService.create({
                projectId,
                incidentId: incident.id,
                activeEscalationId: escalationId,
                scheduleId: schedule.id,
                incidentAcknowledged: false,
                escalations: [currentEscalationStatus]
            });
        } else {
            onCallScheduleStatus = callScheduleStatuses[0];
            currentEscalationStatus = onCallScheduleStatus.escalations[onCallScheduleStatus.escalations.length - 1];
            escalationId = currentEscalationStatus.escalation.id;
        }

        var shouldSendSMSReminder = false;
        var shouldSendCallReminder = false;
        var shouldSendEmailReminder = false;

        //No escalation found in the database skip. 
        var escalation = await EscalationService.findOneBy({ _id: escalationId });

        if (!escalation) {
            return;
        }

        shouldSendSMSReminder = escalation.smsReminders > currentEscalationStatus.smsRemindersSent;
        shouldSendCallReminder = escalation.callReminders > currentEscalationStatus.callRemindersSent;
        shouldSendEmailReminder = escalation.emailReminders > currentEscalationStatus.emailRemindersSent;

        if (!shouldSendSMSReminder && !shouldSendEmailReminder && !shouldSendCallReminder) {
            _this.escalate({ schedule, incident });
        } else {
            _this.sendAlertsToTeamMembersInEscalationPolicy({ escalation, monitor, incident, schedule, onCallScheduleStatus });
        }
    },

    escalate: async function ({ schedule, incident }) {
        var _this = this;
        var callScheduleStatuses = OnCallScheduleStatusService.findBy({ query: { incident: incident.id, schedule: schedule } });
        var monitorId = incident.monitorId._id ? incident.monitorId._id : incident.monitorId;
        var monitor = await MonitorService.findOneBy({ _id: monitorId });

        if (callScheduleStatuses.length === 0) {
            return;
        }

        var callScheduleStatus = callScheduleStatuses[0];

        var activeEscalationPolicy = callScheduleStatus.activeEscalationPolicy;

        if (!schedule.escalationIds || schedule.escalationIds.length === 0) {
            return;
        }

        var nextEscalationPolicy = null;


        //find next escalationPolicy.
        var found = false;
        for (let escalationId of schedule.escalationIds) {

            if (found) {
                nextEscalationPolicy = escalationId;
                break;
            }

            if (escalationId && escalationId._id) {
                escalationId = escalationId._id;
            }

            if (activeEscalationPolicy.id === escalationId) {
                found = true;
            }
        }

        if (!nextEscalationPolicy.id === activeEscalationPolicy.id) {
            return; //can't escalate anymore. 
        }

        callScheduleStatus.escalations.push({
            escalation: nextEscalationPolicy,
            callRemindersSent: 0,
            emailRemindersSent: 0,
            smsRemindersSent: 0
        });
        callScheduleStatus.activeEscalationPolicy = nextEscalationPolicy;

        await callScheduleStatus.save();

        _this.sendAlertsToTeamMembersInEscalationPolicy({ escalation: nextEscalationPolicy, monitor, incident, schedule, onCallScheduleStatus: callScheduleStatus });


    },

    sendAlertsToTeamMembersInEscalationPolicy: async function ({ escalation, incident, monitor, schedule, onCallScheduleStatus }) {
        var _this = this;
        var monitorId = monitor.id;

        var projectId = incident.projectId._id ? incident.projectId._id : incident.projectId;
        var project = await ProjectService.findOneBy({ _id: projectId });

        escalation = await EscalationService.findOneBy({ _id: escalation.id });

        const activeTeam = escalation.activeTeam;
        var currentEscalationStatus = onCallScheduleStatus.escalations[onCallScheduleStatus.escalations.length - 1];

        var shouldSendSMSReminder = escalation.smsReminders > currentEscalationStatus.smsRemindersSent;
        var shouldSendCallReminder = escalation.callReminders > currentEscalationStatus.callRemindersSent;
        var shouldSendEmailReminder = escalation.emailReminders > currentEscalationStatus.emailRemindersSent;

        if (shouldSendCallReminder) {
            currentEscalationStatus.callRemindersSent++;
        }

        if (shouldSendEmailReminder) {
            currentEscalationStatus.emailRemindersSent++;
        }

        if (shouldSendSMSReminder) {
            currentEscalationStatus.smsRemindersSent++;
        }

        if (!activeTeam.teamMembers || activeTeam.teamMember.length === 0) {
            return;
        }

        onCallScheduleStatus.escalations[onCallScheduleStatus.escalations.length - 1] = currentEscalationStatus;
        await onCallScheduleStatus.save();

        for (var teamMember of activeTeam.teamMembers) {

            var isNotOnDuty = await _this.isNotOnDuty(teamMember.timezone, teamMember.startTime, teamMember.endTime);

            if (!isNotOnDuty) {

                if (escalation.call && shouldSendCallReminder) {
                    await _this.create({ projectId: incident.projectId, monitorId, alertVia: AlertType.Call, userId: user._id, incidentId: incident._id, schedule: schedule, escalation: escalation, onCallScheduleStatus: onCallScheduleStatus, alertStatus: 'Not on Duty' });
                }
                if (escalation.email && shouldSendEmailReminder) {
                    await _this.create({ projectId: incident.projectId, monitorId, alertVia: AlertType.Email, userId: user._id, incidentId: incident._id, schedule: schedule, escalation: escalation, onCallScheduleStatus: onCallScheduleStatus, alertStatus: 'Not on Duty' });
                }
                if (escalation.sms && shouldSendSMSReminder) {
                    await _this.create({ projectId: incident.projectId, monitorId, alertVia: AlertType.SMS, userId: user._id, incidentId: incident._id, schedule: schedule, escalation: escalation, onCallScheduleStatus: onCallScheduleStatus, alertStatus: 'Not on Duty' });
                }

                continue;
            }

            let user = await UserService.findOneBy({ _id: teamMember.userId });

            if (!user) {
                continue;
            }

            if (escalation.sms && shouldSendCallReminder) {
                _this.sendSMSAlert({ incident, user, project, monitor, schedule, escalation, onCallScheduleStatus });
            }

            if (escalation.email && shouldSendEmailReminder) {
                _this.sendEmailAlert({ incident, user, project, monitor, schedule, escalation, onCallScheduleStatus });
            }

            if (escalation.call && shouldSendSMSReminder) {
                _this.sendCallAlert({ incident, user, project, monitor, schedule, escalation, onCallScheduleStatus });
            }
        }
    },

    sendEmailAlert: async function ({ incident, user, project, monitor, schedule, escalation, onCallScheduleStatus }) {
        var _this = this;
        var date = new Date();
        var monitorId = monitor.id;
        let accessToken = UserService.getAccessToken({ userId: user._id, expiresIn: 12 * 60 * 60 * 1000 });
        const queryString = `projectId=${incident.projectId}&&userId=${user._id}&&accessToken=${accessToken}`;
        let ack_url = `${baseApiUrl}/incident/${incident.projectId}/acknowledge/${incident._id}?${queryString}`;
        let resolve_url = `${baseApiUrl}/incident/${incident.projectId}/resolve/${incident._id}?${queryString}`;
        let firstName = user.name;
        if (user.timezone && TimeZoneNames.indexOf(user.timezone) > -1) {
            date = moment(date).tz(user.timezone).format();
        }

        try {
            await MailService.sendIncidentCreatedMail(date, monitor.name, user.email, user._id, firstName.split(' ')[0], incident.projectId, ack_url, resolve_url, accessToken, incident.incidentType, project.name);
            await _this.create({ projectId: incident.projectId, schedule: schedule.id, escalation: escalation.id, onCallScheduleStatus: onCallScheduleStatus.id, monitorId, alertVia: AlertType.Email, userId: user._id, incidentId: incident._id, alertStatus: 'Success' });

        } catch (e) {
            await _this.create({ projectId: incident.projectId, monitorId, schedule: schedule.id, escalation: escalation.id, onCallScheduleStatus: onCallScheduleStatus.id, alertVia: AlertType.Email, userId: user._id, incidentId: incident._id, alertStatus: 'Cannot Send' });
        }
    },

    sendCallAlert: async function ({ incident, user, project, monitor, schedule, escalation, onCallScheduleStatus }) {
        var _this = this;
        let alertStatus, alert, balanceStatus;
        var date = new Date();
        var monitorId = monitor.id;
        let accessToken = UserService.getAccessToken({ userId: user._id, expiresIn: 12 * 60 * 60 * 1000 });
        let hasEnoughBalance = await _this.hasEnoughBalance(project.id, user.alertPhoneNumber, user._id, AlertType.Call);
        if (hasEnoughBalance) {
            let alertSuccess = await TwilioService.sendIncidentCreatedCall(date, monitor.name, user.alertPhoneNumber, accessToken, incident._id, incident.projectId, incident.incidentType);
            if (alertSuccess && alertSuccess.code && alertSuccess.code === 400) {
                await _this.create({ projectId: project.id, schedule: schedule.id, escalation: escalation.id, onCallScheduleStatus: onCallScheduleStatus.id, monitorId, alertVia: AlertType.Call, userId: user._id, incidentId: incident._id, alertStatus: null, error: true, errorMessage: alertSuccess.message });
            }
            else if (alertSuccess) {
                alert = await _this.create({ projectId: project.id, schedule: schedule.id, escalation: escalation.id, onCallScheduleStatus: onCallScheduleStatus.id, monitorId, alertVia: AlertType.Call, userId: user._id, incidentId: incident._id, alertStatus: 'Success' });
                balanceStatus = await _this.getBalanceStatus(project.id, user.alertPhoneNumber, AlertType.Call);
                AlertChargeService.create(incident.projectId, balanceStatus.chargeAmount, balanceStatus.closingBalance, alert._id, monitorId, incident._id, user.alertPhoneNumber);
            }
        } else {
            alertStatus = 'Blocked - Low balance';
            await _this.create({ projectId: incident.projectId, schedule: schedule.id, escalation: escalation.id, onCallScheduleStatus: onCallScheduleStatus.id, monitorId, alertVia: AlertType.Call, userId: user._id, incidentId: incident._id, alertStatus });
        }
    },

    sendSMSAlert: async function ({ incident, user, project, monitor, schedule, escalation, onCallScheduleStatus }) {
        var _this = this;
        let alertStatus, alert, balanceStatus;
        let projectId = project.id;
        var date = new Date();
        var monitorId = monitor.id;
        let hasEnoughBalance = await _this.hasEnoughBalance(incident.projectId, user.alertPhoneNumber, user._id, AlertType.SMS);
        let configCheckStatus = await _this.checkConfig(incident.projectId, user.alertPhoneNumber);
        if (hasEnoughBalance && configCheckStatus) {
            let alertSuccess = await TwilioService.sendIncidentCreatedMessage(date, monitor.name, user.alertPhoneNumber, incident._id, user._id, user.name, incident.incidentType, projectId);

            if (alertSuccess && alertSuccess.code && alertSuccess.code === 400) {
                await _this.create({ projectId: incident.projectId, monitorId, alertVia: AlertType.SMS, userId: user._id, incidentId: incident._id, schedule: schedule.id, escalation: escalation.id, onCallScheduleStatus: onCallScheduleStatus.id, alertStatus: null, error: true, errorMessage: alertSuccess.message });
            }

            else if (alertSuccess) {
                alertStatus = 'Success';
                alert = await _this.create({ projectId: incident.projectId, schedule: schedule.id, escalation: escalation.id, onCallScheduleStatus: onCallScheduleStatus.id, monitorId, alertVia: AlertType.SMS, userId: user._id, incidentId: incident._id, alertStatus: alertStatus });
                balanceStatus = await _this.getBalanceStatus(incident.projectId, user.alertPhoneNumber, AlertType.SMS);
                AlertChargeService.create(incident.projectId, balanceStatus.chargeAmount, balanceStatus.closingBalance, alert._id, monitorId, incident._id, user.alertPhoneNumber);
            }
        } else if (!hasEnoughBalance && configCheckStatus) {
            alertStatus = 'Blocked - Low balance';
            await _this.create({ projectId: incident.projectId, monitorId, schedule: schedule.id, escalation: escalation.id, onCallScheduleStatus: onCallScheduleStatus.id, alertVia: AlertType.SMS, userId: user._id, incidentId: incident._id, alertStatus });
        }
    },


    sendCreatedIncidentToSubscribers: async function (incident) {
        try {
            let _this = this;
            if (incident) {
                let monitorId = incident.monitorId._id ? incident.monitorId._id : incident.monitorId;
                var subscribers = await SubscriberService.findBy({ monitorId: monitorId });
                subscribers.forEach(async (subscriber) => {
                    if (subscriber.statusPageId) {
                        var enabledStatusPage = await StatusPageService.findOneBy({ _id: subscriber.statusPageId, isSubscriberEnabled: true });
                        if (enabledStatusPage) {
                            await _this.sendSubscriberAlert(subscriber, incident);
                        }
                    } else {
                        await _this.sendSubscriberAlert(subscriber, incident);
                    }
                });
            }
        } catch (error) {
            ErrorService.log('alertService.sendCreatedIncidentToSubscribers', error);
            throw error;
        }
    },

    sendAcknowledgedIncidentToSubscribers: async function (incident) {
        try {
            let _this = this;
            if (incident) {
                let monitorId = incident.monitorId._id ? incident.monitorId._id : incident.monitorId;
                var subscribers = await SubscriberService.findBy({ monitorId: monitorId });
                subscribers.forEach(async (subscriber) => {
                    if (subscriber.statusPageId) {
                        var enabledStatusPage = await StatusPageService.findOneBy({ _id: subscriber.statusPageId, isSubscriberEnabled: true });
                        if (enabledStatusPage) {
                            await _this.sendSubscriberAlert(subscriber, incident, 'Subscriber Incident Acknowldeged');
                        }
                    } else {
                        await _this.sendSubscriberAlert(subscriber, incident, 'Subscriber Incident Acknowldeged');
                    }
                });
            }
        } catch (error) {
            ErrorService.log('alertService.sendAcknowledgedIncidentToSubscribers', error);
            throw error;
        }
    },

    sendResolvedIncidentToSubscribers: async function (incident) {
        try {
            let _this = this;
            if (incident) {
                let monitorId = incident.monitorId._id ? incident.monitorId._id : incident.monitorId;
                var subscribers = await SubscriberService.findBy({ monitorId: monitorId });
                subscribers.forEach(async (subscriber) => {
                    if (subscriber.statusPageId) {
                        var enabledStatusPage = await StatusPageService.findOneBy({ _id: subscriber.statusPageId, isSubscriberEnabled: true });
                        if (enabledStatusPage) {
                            await _this.sendSubscriberAlert(subscriber, incident, 'Subscriber Incident Resolved');
                        }
                    } else {
                        await _this.sendSubscriberAlert(subscriber, incident, 'Subscriber Incident Resolved');
                    }
                });
            }
        } catch (error) {
            ErrorService.log('alertService.sendResolvedIncidentToSubscribers', error);
            throw error;
        }
    },

    sendSubscriberAlert: async function (subscriber, incident, templateType = 'Subscriber Incident Created') {
        try {
            let _this = this;
            let date = new Date();
            var project = await ProjectService.findOneBy({ _id: incident.projectId });
            if (subscriber.alertVia == AlertType.Email) {
                var emailTemplate = await EmailTemplateService.findOneBy({ projectId: incident.projectId, emailType: templateType });
                const subscriberAlert = await SubscriberAlertService.create({ projectId: incident.projectId, incidentId: incident._id, subscriberId: subscriber._id, alertVia: AlertType.Email, alertStatus: 'Sent' });
                const alertId = subscriberAlert._id;
                var trackEmailAsViewedUrl = `${BACKEND_HOST}/subscriberAlert/${incident.projectId}/${alertId}/viewed`;
                if (templateType === 'Subscriber Incident Acknowldeged') {
                    await MailService.sendIncidentAcknowledgedMailToSubscriber(date, subscriber.monitorName, subscriber.contactEmail, subscriber._id, subscriber.contactEmail, incident, project.name, emailTemplate, trackEmailAsViewedUrl);
                } else if (templateType === 'Subscriber Incident Resolved') {
                    await MailService.sendIncidentResolvedMailToSubscriber(date, subscriber.monitorName, subscriber.contactEmail, subscriber._id, subscriber.contactEmail, incident, project.name, emailTemplate, trackEmailAsViewedUrl);
                } else {
                    await MailService.sendIncidentCreatedMailToSubscriber(date, subscriber.monitorName, subscriber.contactEmail, subscriber._id, subscriber.contactEmail, incident, project.name, emailTemplate, trackEmailAsViewedUrl);
                }
            } else if (subscriber.alertVia == AlertType.SMS) {
                var countryCode = await _this.mapCountryShortNameToCountryCode(subscriber.countryCode);
                let contactPhone = subscriber.contactPhone;
                if (countryCode) {
                    contactPhone = countryCode + contactPhone;
                }
                var sendResult;
                var smsTemplate = await SmsTemplateService.findOneBy({ projectId: incident.projectId, smsType: templateType });
                if (templateType === 'Subscriber Incident Acknowldeged') {
                    sendResult = await TwilioService.sendIncidentAcknowldegedMessageToSubscriber(date, subscriber.monitorName, contactPhone, smsTemplate, incident, project.name, incident.projectId);
                } else if (templateType === 'Subscriber Incident Resolved') {
                    sendResult = await TwilioService.sendIncidentResolvedMessageToSubscriber(date, subscriber.monitorName, contactPhone, smsTemplate, incident, project.name, incident.projectId);
                } else {
                    sendResult = await TwilioService.sendIncidentCreatedMessageToSubscriber(date, subscriber.monitorName, contactPhone, smsTemplate, incident, project.name, incident.projectId);
                }
                if (sendResult && sendResult.code && sendResult.code === 400) {
                    await SubscriberAlertService.create({ projectId: incident.projectId, incidentId: incident._id, subscriberId: subscriber._id, alertVia: AlertType.SMS, alertStatus: null, error: true, errorMessage: sendResult.message });
                }
                else {
                    await SubscriberAlertService.create({ projectId: incident.projectId, incidentId: incident._id, subscriberId: subscriber._id, alertVia: AlertType.SMS, alertStatus: 'Success' });
                }
            }
        } catch (error) {
            ErrorService.log('alertService.sendSubscriberAlert', error);
            throw error;
        }
    },

    mapCountryShortNameToCountryCode(shortName) {
        return countryCode[[shortName]];
    },

    isNotOnDuty(timezone, escalationStartTime, escalationEndTime) {
        if (!timezone || !escalationStartTime || !escalationEndTime) {
            return true;
        }

        var currentDate = new Date();
        escalationStartTime = DateTime.changeDateTimezone(escalationStartTime, timezone);
        escalationEndTime = DateTime.changeDateTimezone(escalationEndTime, timezone);
        return DateTime.isInBetween(currentDate, escalationStartTime, escalationEndTime);
    },

    getSubProjectAlerts: async function (subProjectIds) {
        var _this = this;
        let subProjectAlerts = await Promise.all(subProjectIds.map(async (id) => {
            let alerts = await _this.findBy({ projectId: id }, 0, 10);
            let count = await _this.countBy({ projectId: id });
            return { alerts, count, _id: id, skip: 0, limit: 10 };
        }));
        return subProjectAlerts;
    },

    hardDeleteBy: async function (query) {
        try {
            await AlertModel.deleteMany(query);
            return 'Alert(s) removed successfully';
        } catch (error) {
            ErrorService.log('alertService.hardDeleteBy', error);
            throw error;
        }
    },

    restoreBy: async function (query) {
        const _this = this;
        query.deleted = true;
        let alert = await _this.findBy(query);
        if (alert && alert.length > 1) {
            const alerts = await Promise.all(alert.map(async (alert) => {
                const alertId = alert._id;
                alert = await _this.updateOneBy({
                    _id: alertId
                }, {
                    deleted: false,
                    deletedAt: null,
                    deleteBy: null
                });
                return alert;
            }));
            return alerts;
        } else {
            alert = alert[0];
            if (alert) {
                const alertId = alert._id;
                alert = await _this.updateOneBy({
                    _id: alertId
                }, {
                    deleted: false,
                    deletedAt: null,
                    deleteBy: null
                });
            }
            return alert;
        }
    },
    getBalanceStatus: async function (projectId, alertPhoneNumber, alertType) {
        var project = await ProjectService.findOneBy({ _id: projectId });
        var balance = project.balance;
        var countryCode = alertPhoneNumber.split(' ')[0];
        var countryType = getCountryType(countryCode);
        var alertChargeAmount = getAlertChargeAmount(alertType, countryType);
        return {
            chargeAmount: alertChargeAmount.price,
            closingBalance: balance
        };
    },

    checkPhoneAlertsLimit: async function (projectId) {
        var _this = this;
        var yesterday = new Date(new Date().getTime() - (24 * 60 * 60 * 1000));
        let alerts = await _this.countBy({ projectId: projectId, alertVia: { $in: [AlertType.Call, AlertType.SMS] }, error: { $in: [null, undefined, false] }, createdAt: { $gte: yesterday } });
        let smsCounts = await SmsCountService.countBy({ projectId: projectId, createdAt: { '$gte': yesterday } });
        let project = await ProjectService.findOneBy({ _id: projectId });
        let limit = project && project.alertLimit ? project.alertLimit : twilioAlertLimit;
        if (limit && typeof limit === 'string') {
            limit = parseInt(limit, 10);
        }
        if ((alerts + smsCounts) <= limit) {
            return true;
        }
        else {
            await ProjectService.updateOneBy({ _id: projectId }, { alertLimitReached: true });
            return false;
        }
    }
};


const AlertModel = require('../models/alert');
const ProjectService = require('./projectService');
const PaymentService = require('./paymentService');
const AlertType = require('../config/alertType');
const ScheduleService = require('./scheduleService');
const SubscriberService = require('./subscriberService');
const SubscriberAlertService = require('./subscriberAlertService');
const EmailTemplateService = require('./emailTemplateService');
const SmsTemplateService = require('./smsTemplateService');
const EscalationService = require('./escalationService');
const MailService = require('./mailService');
const UserService = require('./userService');
const MonitorService = require('./monitorService');
const TwilioService = require('./twilioService');
const ErrorService = require('./errorService');
const StatusPageService = require('./statusPageService');
const AlertChargeService = require('./alertChargeService');
const countryCode = require('../config/countryCode');
const baseApiUrl = require('../config/baseApiUrl');
const { getAlertChargeAmount, getCountryType } = require('../config/alertType');
const { BACKEND_HOST } = process.env;
const { twilioAlertLimit } = require('../config/twilio');
const SmsCountService = require('./smsCountService');
const DateTime = require('../utils/DateTime');
const moment = require('moment-timezone');
const TimeZoneNames = moment.tz.names();
const OnCallScheduleStatusService = require('./onCallScheduleStatusService');