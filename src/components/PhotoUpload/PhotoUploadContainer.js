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
    this.state = {
      date: '',
      location: '',
      items: [],
      count: 0,
      server: [],
      isDelete: false,
      i: true
    };
  }
  componentWillMount() {
    // 初始化alioss client (CORDOVA环境)
    // this.client = client;
  }
  photoSubmit() {
    if (this.state.date === '') {
      alert('检查时间不能为空！');
    } else if (this.state.location === '') {
      alert('检查地点不能为空！');
    } else if (this.state.items.length === 0) {
      alert('您还未添加图片！');
    } else {
      fetch(`${config.apiPrefix}/reports`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          checkTime: this.state.date, // '2016-04-29 11:37:45'
          checkAddr: this.state.location,
          reportType: '图片', // '图片'
          reportValues: this.state.server // ['...', ... ] //图片报告为mediaId
        }),
        credentials: 'include'
      })
      .then(response => {
        if (response.status === 200) {
          return response.json();
        }
        throw new Error;
      })
      .then(json => {
        if (json.retCode === 0) {
          alert('照片上传成功！');
          hashHistory.goBack();
        } else {
          alert('请求出错！');
        }
      })
      .catch(error => {
        alert('照片上传失败！');
        console.log(error);
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
      ],
      count: this.state.count + imgIds.length
    });
    $('#scroll').scrollTop($('#scroll')[0].scrollHeight);
  }
  handleUserImageUpload(serverIds) {
    this.setState({
      server: [
        ...this.state.server,
        ...serverIds
      ]
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
    for (let i = 0; i < this.state.server.length; i ++) {
      if (i !== index) {
        newSever.push(this.state.server[i]);
      }
    }
    this.setState({
      items: newItems,
      server: newSever,
      count: this.state.count - 1
    });
  }
  clickAlert() {
    alert('最多只能添加九张图片！');
  }
  clickChange() {
    this.setState({
      isDelete: false,
      i: true
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
  }
  wxChooseImgSuccess(res) {
    if ((this.state.count + res.localIds.length) > 9) {
      alert('最多只能添加九张图片！');
    } else {
      this.handleUserImageInput(res.localIds);
      const serverIds = [];
      for (let i = 0; i < res.localIds.length; i ++) {
        const j = i;
        wx.uploadImage({
          localId: res.localIds[i], // 需要上传的图片的本地ID，由chooseImage接口获得
          isShowProgressTips: 1, // 默认为1，显示进度提示
          // success: (() => {
          //   const ctx = this;
          //   return function (cbkRes) {
          //     console.log(j);
          //     serverIds[j] = cbkRes.serverId;
          //     if (serverIds.length === res.localIds.length) {
          //       ctx.handleUserImageUpload(serverIds);
          //     }
          //   };
          // })(),
          success: (cbkRes) => {
            console.log(j);
            serverIds[j] = cbkRes.serverId;
            if (serverIds.length === res.localIds.length) {
              this.handleUserImageUpload(serverIds);
            }
          }
        });
      }
    }
  }
  clickDelete() {
    if (this.state.i) {
      this.setState({
        isDelete: true,
        i: false
      });
    } else {
      this.setState({
        isDelete: false,
        i: true
      });
    }
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
        width: '100%'
      },
      container: {
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
        zIndex: 2000
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
        bottom: 0
      }
    };
    let add;
    let del;
    if (this.state.count >= 9) {
      add = (
        <div onTouchTap={this.clickAlert} style={styles.add}></div>
      );
    } else {
      add = (
        <div onTouchTap={this.clickChange} style={styles.add}></div>
      );
    }
    if (this.state.count >= 1) {
      del = (
        <div onTouchTap={this.clickDelete} style={styles.del}></div>
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