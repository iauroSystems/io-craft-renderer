import {environment} from '../../environments/environment';

const MFViewPageApp = {
    url: environment.NX_VIEW_PAGE_MF,
    scope: 'ViewPageApp',
    components: {
        ViewPageAppComponent: './ViewPageAppComponent',
    },
    slices: {
        grid: './grid',
    },
    routes: {
        // default: './RoutingDemoConfig',
    },
};

export default MFViewPageApp;
