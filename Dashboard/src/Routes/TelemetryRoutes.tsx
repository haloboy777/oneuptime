import React, {
    FunctionComponent,
    LazyExoticComponent,
    ReactElement,
    Suspense,
    lazy,
} from 'react';
import { Routes, Route as PageRoute } from 'react-router';
import Route from 'Common/Types/API/Route';
import RouteMap, { TelemetryRouthPath } from '../Utils/RouteMap';
import PageMap from '../Utils/PageMap';
import ComponentProps from '../Pages/PageComponentProps';
import Loader from '../Components/Loader/Loader';

// Lazy Pages
const TelemetryServices: LazyExoticComponent<
    FunctionComponent<ComponentProps>
> = lazy(() => {
    return import('../Pages/Telemetry/Services');
});
const TelemetryServiceView: LazyExoticComponent<
    FunctionComponent<ComponentProps>
> = lazy(() => {
    return import('../Pages/Telemetry/Services/View/Index');
});
const TelemetryServiceViewDelete: LazyExoticComponent<
    FunctionComponent<ComponentProps>
> = lazy(() => {
    return import('../Pages/Telemetry/Services/View/Delete');
});
const TelemetryServiceViewLogs: LazyExoticComponent<
    FunctionComponent<ComponentProps>
> = lazy(() => {
    return import('../Pages/Telemetry/Services/View/Logs/Index');
});
const TelemetryServiceViewTraces: LazyExoticComponent<
    FunctionComponent<ComponentProps>
> = lazy(() => {
    return import('../Pages/Telemetry/Services/View/Traces/Index');
});
const TelemetryServiceViewMetrics: LazyExoticComponent<
    FunctionComponent<ComponentProps>
> = lazy(() => {
    return import('../Pages/Telemetry/Services/View/Metrics/Index');
});
const TelemetryServiceViewDashboard: LazyExoticComponent<
    FunctionComponent<ComponentProps>
> = lazy(() => {
    return import('../Pages/Telemetry/Services/View/Dashboard/Index');
});

const TelemetryRoutes: FunctionComponent<ComponentProps> = (
    props: ComponentProps
): ReactElement => {
    return (
        <Routes>
            <PageRoute
                index
                element={
                    <Suspense fallback={Loader}>
                        <TelemetryServices
                            {...props}
                            pageRoute={RouteMap[PageMap.TELEMETRY] as Route}
                        />
                    </Suspense>
                }
            />

            <PageRoute
                path={TelemetryRouthPath[PageMap.TELEMETRY_SERVICES] || ''}
                element={
                    <Suspense fallback={Loader}>
                        <TelemetryServices
                            {...props}
                            pageRoute={
                                RouteMap[PageMap.TELEMETRY_SERVICES] as Route
                            }
                        />
                    </Suspense>
                }
            />

            <PageRoute
                path={TelemetryRouthPath[PageMap.TELEMETRY_SERVICES_VIEW] || ''}
                element={
                    <Suspense fallback={Loader}>
                        <TelemetryServiceView
                            {...props}
                            pageRoute={
                                RouteMap[
                                    PageMap.TELEMETRY_SERVICES_VIEW
                                ] as Route
                            }
                        />
                    </Suspense>
                }
            />

            <PageRoute
                path={
                    TelemetryRouthPath[
                        PageMap.TELEMETRY_SERVICES_VIEW_DELETE
                    ] || ''
                }
                element={
                    <Suspense fallback={Loader}>
                        <TelemetryServiceViewDelete
                            {...props}
                            pageRoute={
                                RouteMap[
                                    PageMap.TELEMETRY_SERVICES_VIEW_DELETE
                                ] as Route
                            }
                        />
                    </Suspense>
                }
            />

            <PageRoute
                path={
                    TelemetryRouthPath[PageMap.TELEMETRY_SERVICES_VIEW_LOGS] ||
                    ''
                }
                element={
                    <Suspense fallback={Loader}>
                        <TelemetryServiceViewLogs
                            {...props}
                            pageRoute={
                                RouteMap[
                                    PageMap.TELEMETRY_SERVICES_VIEW_LOGS
                                ] as Route
                            }
                        />
                    </Suspense>
                }
            />

            <PageRoute
                path={
                    TelemetryRouthPath[
                        PageMap.TELEMETRY_SERVICES_VIEW_TRACES
                    ] || ''
                }
                element={
                    <Suspense fallback={Loader}>
                        <TelemetryServiceViewTraces
                            {...props}
                            pageRoute={
                                RouteMap[
                                    PageMap.TELEMETRY_SERVICES_VIEW_TRACES
                                ] as Route
                            }
                        />
                    </Suspense>
                }
            />

            <PageRoute
                path={
                    TelemetryRouthPath[
                        PageMap.TELEMETRY_SERVICES_VIEW_METRICS
                    ] || ''
                }
                element={
                    <Suspense fallback={Loader}>
                        <TelemetryServiceViewMetrics
                            {...props}
                            pageRoute={
                                RouteMap[
                                    PageMap.TELEMETRY_SERVICES_VIEW_METRICS
                                ] as Route
                            }
                        />
                    </Suspense>
                }
            />

            <PageRoute
                path={
                    TelemetryRouthPath[
                        PageMap.TELEMETRY_SERVICES_VIEW_DASHBOARDS
                    ] || ''
                }
                element={
                    <Suspense fallback={Loader}>
                        <TelemetryServiceViewDashboard
                            {...props}
                            pageRoute={
                                RouteMap[
                                    PageMap.TELEMETRY_SERVICES_VIEW_DASHBOARDS
                                ] as Route
                            }
                        />
                    </Suspense>
                }
            />
        </Routes>
    );
};

export default TelemetryRoutes;
