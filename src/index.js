import 'lib-flexible';
import 'babel-polyfill';

import ReactDOM from 'react-dom';
import History from './components/history/History';
import './common.css';


ReactDOM.render(
  <History />,
  document.getElementById('approot')
);

