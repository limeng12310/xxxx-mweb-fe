import 'lib-flexible';
import 'babel-polyfill';

import ReactDOM from 'react-dom';
import HomeContainer from './components/home/HomeContainer';
import ReportDetailContainer from './components/ReportDetail/ReportDetailContainer';
import PhotoUploadContainer from './components/PhotoUpload/PhotoUploadContainer';
import History from './components/history/History';
import config from './config/default';

// react router
import { Router, Route, hashHistory } from 'react-router';

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
  <Router history={hashHistory}>
    <Route path="/" component={HomeContainer} />
    <Route path="/photo-upload" component={PhotoUploadContainer} />
    <Route path="/history" component={History} />
    <Route path="/report-detail" component={ReportDetailContainer} />
  </Router>
  ),
  document.getElementById('approot')
);

