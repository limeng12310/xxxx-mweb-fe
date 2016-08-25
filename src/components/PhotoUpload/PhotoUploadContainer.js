import CheckTimeInput from './CheckTimeInput';
import CheckLocationInput from './CheckLocationInput';
import PhotosToUpload from './PhotosToUpload';
import boxBackground from './img/background.png';
import foot from './img/foot.svg';
import Header from './../common/Header';


class PhotoUploadContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleUserDateInput = this.handleUserDateInput.bind(this);
    this.handleUserLocationInput = this.handleUserLocationInput.bind(this);
    this.handleUserImageInput = this.handleUserImageInput.bind(this);
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
    if (this.state.date == null) {
      alert('检查时间不能为空！');
    } else if (this.state.location == null) {
      alert('检查地点不能为空！');
    } else if (this.state.items == null) {
      alert('您还未添加图片！');
    }
    // else {
    //   fetch(`${config.apiPrefix}/reports`, {
    //     method: 'POST',
    //     headers: {
    //       Accept: 'application/json',
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //       checkTime: this.state.date, // '2016-04-29 11:37:45'
    //       reportType: '图片', // '图片'
    //       reportValues: this.state.items // ['...', ... ] //图片报告为mediaId
    //     })
    //   })
    //   .then(response => {
    //     if (response.status === 200) {
    //       return response.json();
    //     }
    //     throw new Error;
    //   })
    //   .then(json => {
    //     if (json.retCode === 0) {
    //       alert('照片上传成功！');
    //     } else {
    //       alert('请求出错！');
    //     }
    //   })
    //   .catch(error => {
    //     alert('照片上传失败！');
    //     console.log(error);
    //   });
    // }
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
    $('#scroll').scrollTop( $('#scroll')[0].scrollHeight );
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
  handleUserImageUpload(serverId) {
    this.setState({
      server: [
        ...this.state.server,
        ...serverId
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
    this.setState({
      items: newItems,
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
        backgroundSize: 'cover',
        zIndex: -100
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
        overflowY: 'scroll',
        WebkitOverflowScrolling: 'touch'
      },
      footLine: {
        position: 'fixed',
        bottom: '1.466667rem',
        width: '100%',
        height: '0.078125rem',
        background: 'linear-gradient(to right, rgba(255,255,255,0.1), rgba(255,255,255,1),rgba(255,255,255,0.1))',
        zIndex: -10
      },
      foot: {
        position: 'fixed',
        bottom: 0,
        width: '100%',
        height: '1.466667rem',
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
          <div style={styles.footLine}></div>
          <div style={styles.foot}></div>
        </div>
      </div>
    );
  }
}

export default PhotoUploadContainer;