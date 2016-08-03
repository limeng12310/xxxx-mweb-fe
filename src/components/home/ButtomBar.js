/**
 * Created by zc on 2016/7/26.
 */
import State from './img/state.png';
import history from './img/history.png';
import user from './img/user.png';

const ButtomBarStyle = {
  bottomBar: {
    width: '100%',
    height: '98px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: '0',
    left: '0'

  },
  barItem: {
    textAlign: 'center'
  },
  icon: {
    display: 'block',
    width: '36px'
  },
  iconFont: {
    color: '#fff',
    fontSize: '14px',
    textDecoration: 'none'
  }
};
class ButtomBar extends React.Component {
  render() {
    return (
      <div style={ButtomBarStyle.bottomBar}>
        <div style={ButtomBarStyle.barItem}>
          <img src={State} alt="" style={ButtomBarStyle.icon} />
          <a href="#" style={ButtomBarStyle.iconFont}>动态</a>
        </div>
        <div style={ButtomBarStyle.barItem}>
          <img src={history} alt="" style={ButtomBarStyle.icon} />
          <a href="#" style={ButtomBarStyle.iconFont}>历史</a>
        </div>
        <div style={ButtomBarStyle.barItem}>
          <img src={user} alt="" style={ButtomBarStyle.icon} />
          <a href="#" style={ButtomBarStyle.iconFont}>用户</a>
        </div>
      </div>
    );
  }
}

export default ButtomBar;
