import 'lib-flexible';
import 'babel-polyfill';

import ReactDOM from 'react-dom';
import PhotoUploadContainer from './components/PhotoUpload/PhotoUploadContainer';
import fetch from 'isomorphic-fetch';
import config from './config/default';

fetch(`${config.apiPrefix}/test-signature`)
  .then(response => response.json())
  .then(json => {
    // 初始化微信jssdk配置
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

ReactDOM.render(
  <PhotoUploadContainer />,
  document.getElementById('approot')
);

