import mock from '../mock';
import onSuccess from '../../utils/responseWrapper';
import { environment } from '../../environments/environment';
// import generateRandomString from '../../utils/randomString';

export interface IPalette {
  mode: string;
  text: Array<string>;
  primary: Array<string>;
  secondary: Array<string>;
  common: Array<string>;
  background: Array<string>;
  custom: Array<string>;
}

const colorPalette = {
  mode: 'dark',
  text: {
    primary: '#BDBDBD',
    secondary: '#BDBDBD',
    disabled: '#BDBDBD',
  },
  primary: {
    50: '#ffffff',
    100: '#ffffff',
    200: '#ffffff',
    300: '#ffffff',
    400: '#ffffff',
    500: '#ffffff',
    600: '#ffffff',
    700: '#ffffff',
    800: '#ffffff',
    900: '#ffffff',
    A100: '#fafafa',
    A200: '#e9e9e9',
    A400: '#e0e0e0',
    A700: '#d9d9d9',
    contrastDefaultColor: 'light',
  },
  secondary: {
    '50': '#edf9f5',
    '100': '#d1f1e6',
    '200': '#b3e7d5',
    '300': '#94ddc4',
    '400': '#7dd6b8',
    '500': '#66cfab',
    '600': '#5ecaa4',
    '700': '#53c39a',
    '800': '#49bd91',
    '900': '#38b280',
    A100: '#fdfffe',
    A200: '#caffe9',
    A400: '#97ffd3',
    A700: '#7effc8',
    contrastDefaultColor: 'light',
  },
  common: {
    black: 'rgb(17, 24, 39)',
    white: 'rgb(255, 255, 255)',
  },
  // primary: white,
  background: {
    default: '#121212',
    paper: '#191919',
  },
  custom: {
    selectedText: '#303030',
    form1: '#155189',
    form2: '#2F2F2F',
    form3: '#292929',
    formError: 'red',
    inputNode: '#ffbf00',
    transformNode: '#BA55D3',
    storeNode: '#33b64d',
    outputNode: '#33b64d',
    btnColor: '#3399FF',
    dashboardButtonBg: '#272727',
    dashboardButtonHover: '#525252',

    sideBarBg: '#191919',
    sideBarText1: '#BDBDBD',
    sideBarText2: '#FFFFFF',
    btnDisabled: '#ffffff1f',

    dropDownChip: '#57B4AA',

    errorMsg: '#FF0000',
    successMsg: '#52C41A',

    inputComponentBg: '#2B2B2B',

    dashboardTableHeadBg: '#121212',
    dashboardTableRowBg: '#242424',

    tablePaginationBg: '#1890FF',
    btnDeleteColor: '#FFFFFF',

    scrollBarTrackBg: '#404040',
    scrollBarThumbBg: '#737272',
  },
};

mock.onGet(`/color/`).reply(200, colorPalette);
