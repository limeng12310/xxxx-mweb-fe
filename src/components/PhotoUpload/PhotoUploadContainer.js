import CheckTimeInput from './CheckTimeInput';
import CheckLocationInput from './CheckLocationInput';
import PhotosToUpload from './PhotosToUpload';
import boxBackground from './img/background.png';
import back from './img/back.png';
import ok from './img/ok.png';

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
      ]
      // count: this.state.count + imgIds.length
    });
  }
  // handleUserImageInput() {
  //   this.setState({
  //     items: [
  //       ...this.state.items,
  //       ''
  //     ]
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
    this.setState({
      items: this.state.items.map((imgId, i) => {
        if (i === index) {
          return null;
        }
        return imgId;
      }),
      count: this.state.items.length - 1
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
        zIndex: -1
      },
      box: {
        position: 'absolute',
        height: '100%',
        width: '100%'
      },
      nav: {
        height: '5.5%',
        paddingTop: '0.203125rem',
        paddingBottom: '0.203125rem'
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
        height: '84.5%',
        paddingTop: '1.25rem',
        textAlign: 'center',
        overflowY: 'scroll'
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
        </div>
      </div>
    );
  }
}

export default PhotoUploadContainer;