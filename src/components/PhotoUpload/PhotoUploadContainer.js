import CheckTimeInput from './CheckTimeInput';
import CheckLocationInput from './CheckLocationInput';
import PhotosToUpload from './PhotosToUpload';
import boxBackground from './img/background.jpg';

import { Wrapper } from 'ali-oss';

class PhotoUploadContainer extends React.Component {
  constructor(props) {
    super(props);
    this.ossClient = new Wrapper({
      "region": "oss-cn-beijing",
      "accessKeyId": "2pSR2UNkcliLiZJH",
      "accessKeySecret": "APhROJpzai4PxKnchcbHl3byuVBlBx",
      "bucket": "thorgene-mweb"
    });

    this.handleUserDateInput = this.handleUserDateInput.bind(this);
    this.handleUserLocationInput = this.handleUserLocationInput.bind(this);
    this.handleUserImageInput = this.handleUserImageInput.bind(this);
    this.state = {
      date: '',
      location: '',
      count: 0,
      items: []
    };
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

    var timestamp = new Date().getTime();
    for (var i = 0; i < imgId; ++i) {
      this.ossClient.put(`/tmp/${timestamp}_${i}`, imgIds[i])
        .then(function (val) {
          alert(val);
        })
        .catch(function (err) {
          alert('上传图片失败');
        });
    }

  }
  render() {
    const styles = {
      box: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        backgroundImage: `url(${boxBackground})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover'
      },
      container: {
        paddingTop: 50,
        textAlign: 'center'
      },
      nav: {
        height: 90,
        paddingTop: 30,
        fontSize: 50,
        color: '#5BA8FC',
        borderBottomWidth: 2,
        borderBottomStyle: 'solid',
        borderBottomColor: '#D7D7D7'
      },
      back: {
        fontSize: 50,
        color: '#5BA8FC',
        textDecoration: 'none',
        position: 'fixed',
        left: 55,
        border: 'none',
        background: 'none',
        cursor: 'pointer',
        display: 'flex'
      },
      ok: {
        fontSize: 50,
        color: '#5BA8FC',
        textDecoration: 'none',
        position: 'fixed',
        right: 40,
        border: 'none',
        background: 'none',
        cursor: 'pointer',
        display: 'flex'
      }
    };
    return (
      <div style={styles.box}>
        <div style={styles.nav}>
          <div><a style={styles.back}><span>&lt;</span>返回</a></div>
          <div><input style={styles.ok} value="完成" type="submit" /></div>
        </div>
        <div style={styles.container}>
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
            onUserImageInput={this.handleUserImageInput}
            imgCount={this.state.count}
          />
        </div>
      </div>
    );
  }
}

export default PhotoUploadContainer;