import Keycloak from 'keycloak-js';
import { environment } from '../environments/environment';

const AUTH_SERVER_URL = environment.NX_KEYCLOCK_AUTH_SERVER_URL;
const DATABASE = environment.NX_KEYCLOCK_DATABASE;
const CLIENT_ID = environment.NX_KEYCLOCK_CLIENT_ID;
const SECRET_KEY = environment.NX_KEYCLOCK_SECRET_KEY;

export const keycloakConfig = {
  url: AUTH_SERVER_URL,
  realm: DATABASE,
  clientId: CLIENT_ID,
  // credentials:{
  //   secret:SECRET_KEY
  // },
  // cors:true
};
 


const keycloak = Keycloak(keycloakConfig);
export default keycloak;
