import Cookies from 'js-cookie';
import config from './config';
import { Base64 } from 'js-base64';

const nickName = Cookies.get('nickname');
const headImgUrl = Cookies.get('headimgurl');
const sex = Cookies.get('sex');
let gender;
switch (sex) {
  case '1': {
    gender = 0;
    break;
  }
  case '2': {
    gender = 1;
    break;
  }
  default: {
    gender = -1;
  }
}

fetch(`${config.apiPrefix}/isNewUser`, {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  // send cookies
  credentials: 'include'
})
.then(response => {
  if (response.status === 200) {
    return response.json();
  }
  throw new Error();
})
.then(json => {
  if (json.retCode === 0) {
    // new user
    fetch(`${config.apiPrefix}/users`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nickName: nickName ? Base64.decode(nickName) : '',
        gender,
        headImg: headImgUrl || ''
      }),
      credentials: 'include'
    })
      .then(resp => {
        if (resp.status === 200) {
          return resp.json();
        }
        throw new Error();
      })
      .then(json => {
        if (json.retCode === 0) {
          // window.location.replace('app-home.html');
        } else {
          throw new Error();
        }
      })
      .catch(err => {
        // TODO
        alert('出错了,请稍候重试');
        throw err;
      });
  } else {
    // old user
    window.location.replace('app-home.html');
  }
})
.catch(err => {
  // TODO
  alert('出错了,请稍候重试');
  throw err;
});