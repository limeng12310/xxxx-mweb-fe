import background from './img/background.jpg';
import headPhoto from './img/photo.jpg';

import ButtomBar from '../common/ButtomBar';

class UserProfileContainer extends React.Component {
  render() {
    const data = {
      headPhoto: `url(${headPhoto})`,
      name: '昵称'
    };
    const styles = {
      bg: {
        position: 'fixed',
        height: '100%',
        width: '100%',
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover'
      },
      user: {
        height: '4rem',
        width: '100%',
        marginTop: '1.3rem',
        padding: '0.3rem 0 0.5rem 0',
        display: 'flex'
      },
      headPhoto: {
        backgroundImage: data.headPhoto,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: '1.6rem',
        marginLeft: 'auto',
        marginRight: 'auto',
        height: '3.2rem',
        width: '3.2rem'
      },
      name: {
        position: 'absolute',
        top: '4.1rem',
        fontSize: '0.5rem',
        color: '#fff',
        marginLeft: '6.6rem'
      },
      list: {
        // height: '9rem',
        width: '100%',
        background: '#fff',
        filter: 'alpha(opacity=20)',
        MozOpacity: 0.2,
        opacity: 0.2
      }
    };
    return(
      <div style={styles.bg}>
        <div style={styles.user}>
          <div style={styles.headPhoto}></div>
          <div style={styles.name}>{data.name}</div>
        </div>
        <div style={styles.list}>
        </div>
        <ButtomBar bottombarType="2" />
      </div>
    );
  }
}

export default UserProfileContainer;