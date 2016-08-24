import 'lib-flexible';
import 'babel-polyfill';

import ReactDOM from 'react-dom';
import HomeContainer from './components/home/HomeContainer';
// import ReportDetailContainer from './components/ReportDetail/ReportDetailContainer';
import PhotoUploadContainer from './components/PhotoUpload/PhotoUploadContainer';
import config from './config/default';

// react router
import { Router, Route, browserHistory } from 'react-router';

import './common.css';

// 初始化微信jssdk配置
fetch(`${config.apiPrefix}/test-signature`)
  .then(response => response.json())
  .then(json => {
    wx.config({
      debug: false,
      appId: json.appId,
      timestamp: json.timestamp,
      nonceStr: json.noncestr,
      signature: json.signature,
      jsApiList: [
        'checkJsApi',
        'onMenuShareAppMessage',
        'uploadImage',
        'previewImage',
        'chooseImage'
      ]
    });
  });

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={HomeContainer} />
    <Route path="/photo-upload" component={PhotoUploadContainer} />
  </Router>
  ),
  document.getElementById('approot')
);

