import {lazy, Suspense} from 'react';

const ProjectWrapper = lazy(
    () => import('./projects/component/ProjectWrapper')
);

const MyRoutes = {
    routes: [
        {
            path: 'project/:projectId/:menuId/:subMenuId/',
            element: <ProjectWrapper/>,
            children: [
                {
                    path: ':projectId/',
                    element: <></>,
                    children: [
                        {
                            path: ':menuId/',
                            element: <></>,
                            children: [
                                {
                                    path: ':subMenuId/',
                                    element: <></>,
                                    children: [],
                                },
                            ],
                        },
                    ],
                },
            ],
        },

        {
            path: 'project/:projectId/:menuId',
            element: (
                <Suspense fallback={<></>}>
                    <ProjectWrapper/>
                </Suspense>
            ),
            children: [
                {
                    path: ':projectId/',
                    element: (
                        <Suspense fallback={<></>}>
                            <ProjectWrapper/>
                        </Suspense>
                    ),
                    children: [
                        {
                            path: ':menuId/',
                            element: (
                                <Suspense fallback={<></>}>
                                    <ProjectWrapper/>
                                </Suspense>
                            ),
                            children: [],
                        },
                    ],
                },
            ],
        },
        {
            path: 'project/:projectId/',
            element: (
                <Suspense fallback={<></>}>
                    <ProjectWrapper/>
                </Suspense>
            ),
            children: [],
        },
    ],
};

export default MyRoutes;
