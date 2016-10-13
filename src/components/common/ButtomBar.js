/**
 * Created by zc on 2016/7/26.
 */
import State from './../home/img/state.png';
import history from './../home/img/history.png';
import user from './../home/img/user.png';

import { hashHistory } from 'react-router';

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
    fontSize: '0.4rem'
  }
};
class ButtomBar extends React.Component {
  render() {
    // 0表示动态
    // 1表示历史
    // 2表示用户
    const { bottombarType } = this.props;
    let barItemOne = {};
    let barItemTwo = {};
    let barItemThree = {};
    if (bottombarType === '0') {
      barItemOne = {
        filter: 'alpha(opacity=100)',
        MozOpacity: 1,
        opacity: 1
      };
      barItemTwo = {
        filter: 'alpha(opacity=60)',
        MozOpacity: 0.6,
        opacity: 0.6
      };
      barItemThree = {
        filter: 'alpha(opacity=60)',
        MozOpacity: 0.6,
        opacity: 0.6
      };
    } else if (bottombarType === '1') {
      barItemOne = {
        filter: 'alpha(opacity=60)',
        MozOpacity: 0.6,
        opacity: 0.6
      };
      barItemTwo = {
        filter: 'alpha(opacity=100)',
        MozOpacity: 1,
        opacity: 1
      };
      barItemThree = {
        filter: 'alpha(opacity=60)',
        MozOpacity: 0.6,
        opacity: 0.6
      };
    } else if (bottombarType === '2') {
      barItemOne = {
        filter: 'alpha(opacity=60)',
        MozOpacity: 0.6,
        opacity: 0.6
      };
      barItemTwo = {
        filter: 'alpha(opacity=60)',
        MozOpacity: 0.6,
        opacity: 0.6
      };
      barItemThree = {
        filter: 'alpha(opacity=100)',
        MozOpacity: 1,
        opacity: 1
      };
    }
    return (
      <div style={ButtomBarStyle.bottomBarBox}>
        <div className="weightLine"></div>
        <div style={ButtomBarStyle.bottomBar}>
          <div style={Object.assign({}, ButtomBarStyle.barItem, barItemOne)} onTouchTap={() => hashHistory.push('/')}>
            <img src={State} alt="" style={ButtomBarStyle.icon} />
            <span style={ButtomBarStyle.iconFont}>动态</span>
          </div>
          <div
            style={Object.assign({}, ButtomBarStyle.barItem, barItemTwo)}
            onTouchTap={() => hashHistory.push('/history')}
          >
            <img src={history} alt="" style={ButtomBarStyle.icon} />
            <span style={ButtomBarStyle.iconFont}>历史</span>
          </div>
          {
            CORDOVA_ENV === 'true' ? (            // eslint-disable-line
              <div
                style={Object.assign({}, ButtomBarStyle.barItem, barItemThree)}
                onTouchTap={() => hashHistory.push('/user-profile')}
              >
                <img src={user} alt="" style={ButtomBarStyle.icon} />
                <span style={ButtomBarStyle.iconFont}>用户</span>
              </div>
            ) : null
          }

        </div>
      </div>
    );
  }
}

ButtomBar.propTypes = {
  bottombarType: React.PropTypes.string
};
export default ButtomBar;
