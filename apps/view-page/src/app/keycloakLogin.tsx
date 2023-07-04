import { useEffect, useState } from 'react';
import App from './app';
import keycloakData from '../keycloak/keycloak';
import keycloak from '../keycloak/keycloak';
import { getLocalStorage, setLocalStorage } from '../utils/localStorageService';

export function KeycloakLogin() {
  const [initKeycloak, setInitKeycloak] = useState({});
  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    // removeItem('userInfo');
    const userInfo = getLocalStorage('userInfo');
    if (userInfo) {
      setInitKeycloak(keycloakData);
      setIsAuth(true);
    } else {
      keycloakData.init({ onLoad: 'login-required' }).then((authenticated) => {
        const prom = new Promise((resolve, reject) => {
          resolve(setLocalStorage('userInfo', userInfo));
        }).then(() => {
          setInitKeycloak(keycloakData);
          setIsAuth(authenticated);
        });
      });
    }
  }, []);

  if (initKeycloak) {
    if (isAuth) return <App pageId="" />;
    else return <div>Loading Keycloak...</div>;
  }
  return <div>Initializing Keycloak...</div>;
}

export default KeycloakLogin;
