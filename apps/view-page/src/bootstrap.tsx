import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import './main.css';

import App from './app/app';
import KeycloakLogin from './app/keycloakLogin';

ReactDOM.render(
  <StrictMode>
    <App pageId="" />
    {/* <KeycloakLogin />, */}
  </StrictMode>,
  document.getElementById('root')
);
