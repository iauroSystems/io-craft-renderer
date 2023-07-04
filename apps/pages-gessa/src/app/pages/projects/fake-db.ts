import { getLocalStorage } from 'apps/pages-gessa/src/utils/localStorageService';

const _userInfo = getLocalStorage('userInfo');
export const headerComponentProps = {
  logoImagePath:
    'https://gessa-fileservice.s3.eu-central-1.amazonaws.com/Logo.svg',
  searchData: {
    label: 'Search',
    placeholder: 'Search',
    value: 'This is value',
  },
  notificationData: {
    name: 'Notification_24dp',
    size: 55,
    color: '#ff00ff',
    label: 'notification',
  },

  userData: {
    text: _userInfo.userName,
  },
};
