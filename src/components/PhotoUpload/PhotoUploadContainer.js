import CheckTimeInput from './CheckTimeInput';
import CheckLocationInput from './CheckLocationInput';
import PhotosToUpload from './PhotosToUpload';
import boxBackground from './img/background.jpg';

import './aliyun-sdk.min';
import fetch from 'isomorphic-fetch';

class PhotoUploadContainer extends React.Component {
  constructor(props) {
    super(props);

    this.oss = new ALY.OSS({                  // eslint-disable-line
      accessKeyId: '2pSR2UNkcliLiZJH',
      secretAccessKey: 'APhROJpzai4PxKnchcbHl3byuVBlBx',
      securityToken: '',
      endpoint: 'http://oss-cn-beijing',
      apiVersion: '2013-10-15'
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
    const timestamp = new Date().getTime();

    this.setState({
      items: [
        ...this.state.items,
        ...imgIds
      ],
      count: this.state.count + imgIds.length
    });

    for (let i = 0; i < imgIds.length; ++i) {
      fetch(imgIds[i])
        .then(response => response.json())
        .then(data => {
          this.oss.putObject({
            Bucket: 'thorgene-mweb',
            Key: `tmp/${timestamp}_${i}`,                 // 注意, Key 的值不能以 / 开头, 否则会返回错误.
            Body: data,
            AccessControlAllowOrigin: '',
            // ContentType: 'image/jpeg',
            CacheControl: 'no-cache',         // 参考: http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.9
            ContentDisposition: '',           // 参考: http://www.w3.org/Protocols/rfc2616/rfc2616-sec19.html#sec19.5.1
            ContentEncoding: 'utf-8',         // 参考: http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.11
            ServerSideEncryption: 'AES256',
            Expires: null                     // 参考: http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.21
          }, (err, res) => {
            if (err) {
              console.log(`error: ${err}`);
            } else {
              console.log(`success: ${res}`);
            }
          });
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