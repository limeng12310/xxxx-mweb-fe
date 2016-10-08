import boxBackground from './img/background.png';
import foot from './img/foot.png';
import addImg from './img/add.png';
import backgroudDelImg from './img/del.png';

import CheckTimeInput from './CheckTimeInput';
import CheckLocationInput from './CheckLocationInput';
import PhotosToUpload from './PhotosToUpload';
import Header from './../common/Header';

import config from '../../config';
import { hashHistory } from 'react-router';
import moment from 'moment';

const ossClient = new OSS.Wrapper({
  region: config.aliOss.region,
  accessKeyId: config.aliOss.accessKeyId,
  accessKeySecret: config.aliOss.accessKeySecret,
  bucket: config.aliOss.bucket
});

class PhotoUploadContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleUserDateInput = this.handleUserDateInput.bind(this);
    this.handleUserLocationInput = this.handleUserLocationInput.bind(this);
    this.handleUserImageInput = this.handleUserImageInput.bind(this);
    this.handleUserImageUpload = this.handleUserImageUpload.bind(this);
    this.handleUserImageDelete = this.handleUserImageDelete.bind(this);
    this.photoSubmit = this.photoSubmit.bind(this);
    this.clickAlert = this.clickAlert.bind(this);
    this.clickChange = this.clickChange.bind(this);
    this.clickDelete = this.clickDelete.bind(this);
    this.wxChooseImgSuccess = this.wxChooseImgSuccess.bind(this);
    this.successFunction = this.successFunction.bind(this);
    // this.failFunction = this.failFunction.bind(this);
    this.handleUserImageUploadCordova = this.handleUserImageUploadCordova.bind(this);
    this.state = {
      date: '',
      location: '',
      items: [],
      isDelete: false // 是否处于delete状态 ——周列淳
    };
    //  只需要isDelete这一个状态即可 ——周列淳
    // this.bigDelete = true; // true表示点击大删除按钮时小删除按钮出现，false表示点击大删除按钮时小删除按钮消失
    this.server = [];
    this.count = 0;
    this.promiseItems = [];
  }

  photoSubmit() {
    if (this.state.date === '') {
      alert('检查时间不能为空！');
    } else if (this.state.location === '') {
      alert('检查地点不能为空！');
    } else if (this.state.items.length === 0) {
      alert('您还未添加图片！');
    } else {
      Promise.all(this.promiseItems)
        .then(() => {
          return fetch(`${config.apiPrefix}/reports`, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              checkTime: this.state.date, // '2016-04-29 11:37:45'
              checkAddr: this.state.location,
              reportType: '图片', // '图片'
              reportValues: this.server // ['...', ... ] //图片报告为mediaId
            })
          });
        })
        .then(response => {
          if (response.status === 200) {
            return response.json();
          }
          throw new Error();
        })
        .then(json => {
          if (json.retCode === 0) {
            alert('报告上传成功！');
            hashHistory.goBack();
          } else {
            alert('请求出错！');
          }
        })
        .catch(error => {
          alert('报告上传失败！');
          throw error;
        });
    }
  }
  handleUserDateInput(date) {
    this.setState({ date });
  }
  handleUserLocationInput(location) {
    this.setState({ location });
  }
  handleUserImageInput(imgIds) {
    this.setState({
      items: [
        ...this.state.items,
        ...imgIds
      ]
    });
    this.count = this.count + imgIds.length;
    $('#scroll').scrollTop($('#scroll')[0].scrollHeight);
  }
  handleUserImageUpload(serverIds) {
    this.server = [
      ...this.server,
      ...serverIds
    ];
  }
  handleUserImageUploadCordova(imgUrl, dataUrl, imgIndex) {
    const putKey = `/report/${moment().format('YYYY-MM-DD-HH-mm-ss')}.jpeg`;
    return fetch(dataUrl)
      .then(res => res.arrayBuffer())
      .then(buf => {
        const mimeType = dataUrl.split(';')[0].split(':')[1];
        return ossClient.multipartUpload(putKey, new File([buf], undefined, { type: mimeType }), {
          progress: p => {
            return function (done) {
              // TODO 显示上传进度
              console.log(p);
              done();
            };
          }
        });
      })
      .then(result => {
        // TODO 出错时处理
        console.log(result);

        this.server[imgIndex] = `${config.aliOss.ossPrefix}${putKey}`;
      })
      .catch(() => {
        alert('图片上传失败，请稍后重试');
      });
  }
  handleUserImageDelete(index) {
    const newItems = [];
    for (let i = 0; i < this.state.items.length; i ++) {
      if (i !== index) {
        newItems.push(this.state.items[i]);
      }
    }
    const newSever = [];
    for (let i = 0; i < this.server.length; i ++) {
      if (i !== index) {
        newSever.push(this.server[i]);
      }
    }
    this.setState({
      items: newItems
    });
    this.server = newSever;
    this.count = this.count - 1;
    if (CORDOVA_ENV === 'true') {
      const newPromiseItems = [];
      for (let i = 0; i < this.server.length; i ++) {
        if (i !== index) {
          newPromiseItems.push(this.promiseItems[i]);
        }
      }
      this.promiseItems = newPromiseItems;
    }
  }
  clickAlert() {
    alert('最多只能添加九张图片！');
  }
  clickChange(event) {
    event.preventDefault();
    if (CORDOVA_ENV === 'false') {
      this.setState({
        isDelete: false
      });
      wx.chooseImage({
        count: 9,
        sizeType: ['original'],
        sourceType: ['album', 'camera'],
        success: this.wxChooseImgSuccess,
        error() {
          alert('图片选择失败');
        }
      });
    } else {
      this.setState({
        isDelete: false
      });
      SelectImagePlugin.selectImage(this.successFunction, () => {
        alert('图片选择失败！');
      });

      // this.successFunction('useless', this.dataUrl);
    }
  }
  wxChooseImgSuccess(res) {
    if ((this.count + res.localIds.length) > 9) {
      alert('最多只能添加九张图片！');
    } else {
      this.handleUserImageInput(res.localIds);
      const serverIds = [];
      const tmpLocalIds = [...res.localIds];
      this.wxUploadSync(tmpLocalIds, serverIds);
    }
  }
  wxUploadSync(localIds, serverIds) {
    const localId = localIds.pop();
    wx.uploadImage({
      localId,
      isShowProgressTips: 1,
      success: (cbkRes) => {
        serverIds.push(cbkRes.serverId);
        if (localIds.length === 0) {
          // 所有图片上传完毕
          this.handleUserImageUpload(serverIds);
        } else {
          // 继续上传图片
          this.wxUploadSync(localIds, serverIds);
        }
      }
    });
  }
  successFunction(imgUrl) {
    if ((this.state.count + 1) > 9) {
      alert('最多只能添加九张图片！');
    } else {
      this.handleUserImageInput([imgUrl[0]]);
      // 当前图片的下标，因为在handleUserImageInput里加1了，所以这里要减1
      const imgIndex = this.count - 1;
      this.promiseItems[imgIndex] = this.handleUserImageUploadCordova(imgUrl[0], imgUrl[1], imgIndex);
    }
  }
  clickDelete() {
    // 切换删除状态，如果处于删除状态，则改为非删除状态，反之亦然  ——周列淳
    this.setState({
      isDelete: !this.state.isDelete
    });
  }
  render() {
    const styles = {
      bg: {
        position: 'fixed',
        height: '100%',
        width: '100%',
        backgroundImage: `url(${boxBackground})`,
        backgroundSize: 'cover'
      },
      box: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        minHeight: '13rem'
      },
      container: {
        zIndex: '999',
        position: 'absolute',
        width: '100%',
        height: 'calc(100% - 2.4rem - 5rem)',
        marginTop: '1.4rem',
        paddingTop: '1rem',
        textAlign: 'center',
        overflowY: 'auto',
        WebkitOverflowScrolling: 'touch'
      },
      add: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: '1.01rem',
        margin: '0.1875rem',
        width: '2.24rem',
        height: '2.24rem',
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundImage: `url(${addImg})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        zIndex: 100
      },
      delNone: {
        width: '0.7815rem',
        height: '0.77rem',
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundImage: 'none',
        backgroundPosition: 'center',
        backgroundSize: 'cover'
      },
      del: {
        marginTop: '0.3125rem',
        marginBottom: '0.1875rem',
        width: '0.7815rem',
        height: '0.77rem',
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundImage: `url(${backgroudDelImg})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover'
      },
      foot: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: '1.5rem',
        backgroundImage: `url(${foot})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover'
      },
      addBox: {
        width: '100%',
        height: '4.5rem',
        position: 'absolute',
        left: 0,
        bottom: 0,
        top: 'calc(100% - 4.5rem)',
        zIndex: 99
      }
    };
    let add;
    let del;
    if (this.count >= 9) {
      add = (
        <div onClick={this.clickAlert} style={styles.add}></div>
      );
    } else {
      add = (
        <div onClick={this.clickChange} style={styles.add}></div>
      );
    }
    if (this.count >= 1) {
      del = (
        <div onClick={this.clickDelete} style={styles.del}></div>
      );
    } else {
      del = (
        <div style={styles.delNone}></div>
      );
    }
    return (
      <div>
        <div style={styles.bg}></div>
        <div style={styles.box}>
          <Header headerType="1" hasSubmitButton="true" onSubmit={this.photoSubmit} />
          <div style={styles.container} id="scroll">
            <CheckTimeInput
              date={this.state.date}
              onUserDateInput={this.handleUserDateInput}
            />
            <CheckLocationInput
              location={this.state.location}
              onUserLocationInput={this.handleUserLocationInput}
            />
            <PhotosToUpload
              items={this.state.items}
              isDelete={this.state.isDelete}
              onUserImageDelete={this.handleUserImageDelete}
            />
          </div>
          <div style={styles.addBox}>
            {del}
            {add}
            <div style={styles.foot}></div>
          </div>
        </div>
      </div>
    );
  }
}

export default PhotoUploadContainer;