import CheckTimeInput from './CheckTimeInput';
import CheckLocationInput from './CheckLocationInput';
import PhotosToUpload from './PhotosToUpload';
import boxBackground from './img/background.png';
import foot from './img/foot.png';
import add from './img/add.png';
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
    this.state = {
      date: '',
      location: '',
      items: [],
      count: 0,
      server: []
    };
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
          reportType: '图片', // '图片'
          reportValues: this.state.server // ['...', ... ] //图片报告为mediaId
        })
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
  // handleUserImageInput() {
  //   this.setState({
  //     items: [
  //       ...this.state.items,
  //       ''
  //     ],
  //     count: this.state.count + 1
  //   });
  // }
  // handleUserImageUpload = (serverIds) => {
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
        position: 'fixed',
        right: 0,
        left: 0,
        bottom: '1.01rem',
        margin: '0.1875rem',
        width: '2.24rem',
        height: '2.24rem',
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundImage: `url(${add})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        zIndex: 20
      },
      foot: {
        position: 'fixed',
        bottom: 0,
        width: '100%',
        height: '1.5rem',
        backgroundImage: `url(${foot})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover'
      }
    };
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
              imgCount={this.state.count}
              onUserImageInput={this.handleUserImageInput}
              onUserImageUpload={this.handleUserImageUpload}
              onUserImageDelete={this.handleUserImageDelete}
            />
          </div>
          <div style={styles.add}></div>
          <div style={styles.foot}></div>
        </div>
      </div>
    );
  }
}

export default PhotoUploadContainer;