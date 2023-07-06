import {Navigate} from 'react-router';
import {IPageConfig} from '../../../types/pageConfig';

const ProjectConfig: IPageConfig = {
    settings: {
        showHeader: true,
        layout: 'classic-ltr',
    },
    routes: [
        {
            path: '*',
            element: <Navigate to="demo"/>,
        },
    ],
};

export default ProjectConfig;
