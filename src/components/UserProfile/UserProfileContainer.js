import background from './img/background.png';
import headPhoto from './img/photo.jpg';

import ButtomBar from '../common/ButtomBar';

class UserProfileContainer extends React.Component {
  constructor(props) {
    super(props);
    this.changePassword = this.changePassword.bind(this);
    this.bindEmail = this.bindEmail.bind(this);
    this.changeEmail = this.changeEmail.bind(this);
    this.bindPhone = this.bindPhone.bind(this);
    this.changePhone = this.changePhone.bind(this);
    this.logout = this.logout.bind(this);
    this.success = this.success.bind(this);
    this.failure = this.failure.bind(this);
  }
  changePassword() {
    segue.performSegue('changePasswordSegue');
  }
  bindEmail() {
    segue.performSegue('bindEmailSegue');
  }
  changeEmail() {
    segue.performSegue('changeEmailSegue');
  }
  bindPhone() {
    segue.performSegue('bindPhoneSegue');
  }
  changePhone() {
    segue.performSegue('changePhoneSegue');
  }
  logout() {
    LogoutPlugin.logout(() => {
      cookieMaster.clearCookies(() => {
        segue.performSegue('unwindToLogin');
      }, () => {
        alert('退出登陆失败');
      });
    }, () => {
      alert('退出登陆失败');
    });
  }
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
      lists: {
        width: '100%',
        background: 'rgba(255,255,255,0.1)',
        listStyle: 'none'
      },
      list: {
        height: '1.25rem',
        color: '#fff',
        fontSize: '0.5rem',
        paddingTop: '0.33rem',
        paddingBottom: '0.33rem',
        paddingLeft: '1.25rem'
      }
    };
    return (
      <div style={styles.bg}>
        <div style={styles.user}>
          <div style={styles.headPhoto}></div>
          <div style={styles.name}>{data.name}</div>
        </div>
        <div>
          <ul style={styles.lists}>
            <li style={styles.list} onTouchTap={this.changePassword}>
              <div>修改密码</div>
            </li>
            <div className="line"></div>
            <li style={styles.list} onTouchTap={this.bindEmail}>
              <div>绑定邮箱</div>
            </li>
            <div className="line"></div>
            <li style={styles.list} onTouchTap={this.changeEmail}>
              <div>更换邮箱</div>
            </li>
            <div className="line"></div>
            <li style={styles.list} onTouchTap={this.bindPhone}>
              <div>绑定手机</div>
            </li>
            <div className="line"></div>
            <li style={styles.list} onTouchTap={this.changePhone}>
              <div>更换手机</div>
            </li>
            <div className="line"></div>
            <li style={styles.list} onTouchTap={this.logout}>
              <div>退出登陆</div>
            </li>
          </ul>
        </div>
        <ButtomBar bottombarType="2" />
      </div>
    );
  }
}

export default UserProfileContainer;