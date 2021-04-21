import React, { Component } from 'react';
import Fade from 'react-reveal/Fade';
import Dashboard from '../components/Dashboard';
import BreadCrumbItem from '../components/breadCrumb/BreadCrumbItem';
import ShouldRender from '../components/basic/ShouldRender';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import getParentRoute from '../utils/getParentRoute';
import { SHOULD_LOG_ANALYTICS } from '../config';
import { bindActionCreators } from 'redux';
import { logEvent } from '../analytics';
import { loadPage } from '../actions/page';
import { LoadingState } from '../components/basic/Loader';
import { fetchPerformanceMonitors } from '../actions/performanceMonitor';
import NewPerformanceMonitor from '../components/performanceMonitor/NewPerformanceMonitor';
import { fetchComponent } from '../actions/component';
import PerformanceMonitorList from '../components/performanceMonitor/PerformanceMonitorList';

class PerformanceMonitor extends Component {
    componentDidMount() {
        this.props.loadPage('Performance Monitor');
        if (SHOULD_LOG_ANALYTICS) {
            logEvent(
                'PAGE VIEW: DASHBOARD > PROJECT > COMPONENT > PERFORMANCE MONITOR LIST'
            );
        }
    }

    componentDidUpdate(prevProps) {
        if (
            JSON.stringify(prevProps.currentProject) !==
                JSON.stringify(this.props.currentProject) ||
            prevProps.componentId !== this.props.componentId
        ) {
            const componentId = this.props.componentId;
            const projectId = this.props.currentProject
                ? this.props.currentProject._id
                : null;
            if (projectId && componentId) {
                this.props.fetchPerformanceMonitors({
                    projectId,
                    componentId,
                    skip: 0,
                    limit: 10,
                });
            }
        }
    }

    ready = () => {
        this.props.fetchComponent(this.props.componentSlug);

        const componentId = this.props.componentId;
        const projectId = this.props.currentProject
            ? this.props.currentProject._id
            : null;
        if (projectId && componentId) {
            this.props.fetchPerformanceMonitors({
                projectId,
                componentId,
                skip: 0,
                limit: 10,
            });
        }
    };

    renderPerformanceMonitorList = () => {
        const {
            performanceMonitorList,
            componentSlug,
            projectSlug,
        } = this.props;
        return performanceMonitorList.performanceMonitors.map(
            performanceMonitor => (
                <PerformanceMonitorList
                    key={performanceMonitor.name}
                    performanceMonitor={performanceMonitor}
                    componentSlug={componentSlug}
                    projectSlug={projectSlug}
                />
            )
        );
    };

    render() {
        if (this.props.currentProject) {
            document.title = this.props.currentProject.name + ' Dashboard';
        }
        const {
            location: { pathname },
            component,
        } = this.props;

        const componentName = component ? component.name : '';
        return (
            <Dashboard ready={this.ready}>
                <Fade>
                    <BreadCrumbItem
                        route={getParentRoute(pathname)}
                        name={componentName}
                    />
                    <BreadCrumbItem
                        route={pathname}
                        name="Performance Monitor"
                    />
                    <div>
                        <div>
                            <ShouldRender
                                if={
                                    this.props.performanceMonitorList.requesting
                                }
                            >
                                <LoadingState />
                            </ShouldRender>
                            {this.renderPerformanceMonitorList()}
                            <ShouldRender
                                if={
                                    !this.props.performanceMonitorList
                                        .requesting
                                }
                            >
                                <div className="db-RadarRulesLists-page">
                                    <NewPerformanceMonitor
                                        index={2000}
                                        formKey="NewPerformanceMonitorForm"
                                        componentId={this.props.componentId}
                                        componentSlug={this.props.componentSlug}
                                    />
                                </div>
                            </ShouldRender>
                        </div>
                    </div>
                </Fade>
            </Dashboard>
        );
    }
}

PerformanceMonitor.displayName = 'PerformanceMonitor';

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            fetchPerformanceMonitors,
            loadPage,
            fetchComponent,
        },
        dispatch
    );
};

const mapStateToProps = (state, ownProps) => {
    const currentProject = state.project.currentProject;
    const { componentSlug, slug } = ownProps.match.params;

    return {
        componentId:
            state.component.currentComponent.component &&
            state.component.currentComponent.component._id,
        component:
            state.component && state.component.currentComponent.component,
        componentSlug,
        projectSlug: slug,
        currentProject,
        performanceMonitorList: state.performanceMonitor.performanceMonitorList,
    };
};

PerformanceMonitor.propTypes = {
    location: PropTypes.shape({
        pathname: PropTypes.string,
    }),
    component: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
        })
    ),
    componentId: PropTypes.string,
    componentSlug: PropTypes.string,
    loadPage: PropTypes.func,
    currentProject: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.oneOf([null, undefined]),
    ]),
    fetchPerformanceMonitors: PropTypes.func,
    performanceMonitorList: PropTypes.object,
    fetchComponent: PropTypes.func,
    projectSlug: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(PerformanceMonitor);
