import * as ReactDOM from 'react-dom';
import App from './app/app';
import './main.css';

if (process.env.NODE_ENV !== 'development') {
  console.log = () => {};
}

ReactDOM.render(
  <div>
    <App />
  </div>,

  document.getElementById('root')
);
