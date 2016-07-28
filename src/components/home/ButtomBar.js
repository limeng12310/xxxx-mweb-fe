/**
 * Created by zc on 2016/7/26.
 */
const ButtomBarStyle = {
  bottomBar: {
    width: '100%',
    height: '98px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: '0',
    left: '0',
    border: '1px solid red'

  },
  barItem: {
    textAlign: 'center'
  },
  icon: {
    display: 'block',
    width: '40px',
    height: '40px',
    border: '1px solid #f00'
  }
};
class ButtomBar extends React.Component {
  render() {
    return (
      <div style={ButtomBarStyle.bottomBar}>
        <div style={ButtomBarStyle.barItem}>
          <span className="icon" style={ButtomBarStyle.icon}></span>
          <a href="#">主页</a>
        </div>
        <div style={ButtomBarStyle.barItem}>
          <span className="icon" style={ButtomBarStyle.icon}></span>
          <a href="#">趋势</a>
        </div>
        <div style={ButtomBarStyle.barItem}>
          <span className="icon" style={ButtomBarStyle.icon}></span>
          <a href="#">我的</a>
        </div>
      </div>
    );
  }
}

export default ButtomBar;
