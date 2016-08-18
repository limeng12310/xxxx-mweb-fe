import CheckTimeInput from './CheckTimeInput';
import CheckLocationInput from './CheckLocationInput';
import PhotosToUpload from './PhotosToUpload';
import boxBackground from './img/background.png';
import back from './img/back.png';
import ok from './img/ok.png';
import foot from './img/foot.svg';

class PhotoUploadContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleUserDateInput = this.handleUserDateInput.bind(this);
    this.handleUserLocationInput = this.handleUserLocationInput.bind(this);
    this.handleUserImageInput = this.handleUserImageInput.bind(this);
    this.handleUserImageDelete = this.handleUserImageDelete.bind(this);
    this.state = {
      date: '',
      location: '',
      items: [],
      count: 0,
      server: []
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
    // items: this.state.items.map((imgId, i) => {
      //   if (i !== index) {
      //     return imgId;
      //   }
      //   return null;
      // }),
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
      nav: {
        height: '1rem',
        position: 'absolute',
        width: '100%',
        paddingTop: '0.2rem',
        paddingBottom: '0.2rem'
      },
      line: {
        marginTop: '1.03275rem',
        height: '0.078125rem',
        background: 'linear-gradient(to right, rgba(255,255,255,0.1), rgba(255,255,255,0.8),rgba(255,255,255,0.1))',
        borderTopColor: '#fff'
      },
      back: {
        width: '1.0625rem',
        height: '0.890625rem',
        backgroundImage: `url(${back})`,
        backgroundSize: 'cover',
        textDecoration: 'none',
        position: 'absolute',
        left: '0.546875rem',
        border: 'none',
        cursor: 'pointer',
        display: 'flex'
      },
      ok: {
        width: '1.03125rem',
        height: '0.90625rem',
        backgroundSize: 'cover',
        backgroundImage: `url(${ok})`,
        textDecoration: 'none',
        position: 'absolute',
        right: '0.4375rem',
        border: 'none',
        cursor: 'pointer',
        display: 'flex'
      },
      container: {
        position: 'absolute',
        width: '100%',
        height: 'calc(100% - 2.4rem - 5rem)',
        marginTop: '1.4rem',
        paddingTop: '1rem',
        textAlign: 'center',
        overflowY: 'scroll'
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
        // position: 'fixed',
        // bottom: 0,
        // width: '100%',
        // height: '1.466667rem',
        // backgroundColor: '#fff',
        // filter: 'alpha(opacity=20)', // IE滤镜，透明度50%
        // mozOpacity: 0.2, // Firefox私有，透明度50%
        // opacity: 0.2, // 其他，透明度50%
        // zIndex: -10
      }
    };
    return (
      <div>
        <div style={styles.bg}></div>
        <div style={styles.box}>
          <div style={styles.nav}>
            <div><a style={styles.back}></a></div>
            <div style={styles.ok}></div>
            <div style={styles.line}></div>
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