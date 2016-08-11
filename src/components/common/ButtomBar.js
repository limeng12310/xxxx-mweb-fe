/**
 * Created by zc on 2016/7/26.
 */
import State from './../home/img/state.png';
import history from './../home/img/history.png';
import user from './../home/img/user.png';

const ButtomBarStyle = {
  bottomBarBox: {
    width: '100%',
    height: '1.42rem',
    position: 'absolute',
    bottom: '0',
    left: '0'
  },
  bottomBar: {
    width: '100%',
    height: '1.4rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  barItem: {
    textAlign: 'center'
  },
  icon: {
    display: 'block',
    width: '0.7rem'
  },
  iconFont: {
    color: '#fff',
    fontSize: '0.4rem',
    textDecoration: 'none'
  }
};
class ButtomBar extends React.Component {
  render() {
    return (
      <div style={ButtomBarStyle.bottomBarBox}>
        <div className="weightLine"></div>
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
      </div>
    );
  }
}

export default ButtomBar;
