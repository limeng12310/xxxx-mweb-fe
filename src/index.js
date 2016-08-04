import 'lib-flexible';
import 'babel-polyfill';

import ReactDOM from 'react-dom';
import PhotoUploadContainer from './components/PhotoUpload/PhotoUploadContainer';

ReactDOM.render(
  <PhotoUploadContainer />,
  document.getElementById('approot')
);

