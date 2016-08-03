/**
 * Created by zc on 2016/8/2.
 */
import advisoryIcon from './img/advisoryIcon.png';

const HeaderStyle = {
  Header: {
    width: '100%',
    height: '50px',
    position: 'absolute',
    left: 0,
    top: 0
  },
  HeaderBox: {
    width: '100%',
    height: '44px',
    lineHeight: '44px'
  },
  Icon: {
    width: '28px',
    verticalAlign: 'middle',
    marginRight: '4px',
    marginLeft: '30px'
  },
  color: {
    color: 'rgb(252, 252, 252)'
  }
};


class Header extends React.Component {
  render() {
    return (
      <div style={HeaderStyle.Header}>
        <div style={HeaderStyle.HeaderBox}>
          <img src={advisoryIcon} alt="" style={HeaderStyle.Icon} /><span style={HeaderStyle.color}>咨询</span>
        </div>
        <div className="weightLine"></div>
      </div>
    );
  }
}

export default Header;
