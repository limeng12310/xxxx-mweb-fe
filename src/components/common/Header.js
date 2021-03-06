/**
 * Created by zc on 2016/8/2.
 */
import advisoryIcon from './../home/img/advisoryIcon.png';
import back from './../home/img/back.svg';
import ok from './../home/img/ok.svg';

import { hashHistory } from 'react-router';
const HeaderStyle = {
  Header: {
    width: '100%',
    height: '1.2rem',
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 999,
    backgroundColor: 'rgb(60,228,255)'
  },
  HeaderBox: {
    width: '100%',
    height: '1.2rem',
    lineHeight: '1.2rem'
  },
  Icon: {
    width: '0.8rem',
    verticalAlign: 'middle',
    marginRight: '0.2rem',
    marginLeft: '0.8rem'
  },
  color: {
    fontSize: '0.4rem',
    color: 'rgb(252, 252, 252)'
  },
  backStyle: {
    width: '1.2rem',
    height: '1.2rem',
    verticalAlign: 'middle',
    paddingLeft: '0.4rem',
    paddingRight: '0.4rem'
  },
  okStyle: {
    width: '1.2rem',
    height: '1.2rem',
    paddingRight: '0.4rem',
    float: 'right'
  }
};

class Header extends React.Component {

  EmptyOnClick = () => {
    alert('callback()函数 没有传');
  };
  render() {
    // 0表示一级页面header
    // 1表示二级页面header
    const { headerType } = this.props;
    // true 表示有确定按钮，只对headerType为1有效。
    const { hasSubmitButton } = this.props;
    // 点击确定按钮后执行的callback，只对headerType为1有效。
    const { onSubmit } = this.props;

    if (headerType === '0') {
      return (
        <div style={HeaderStyle.Header}>
          <div style={HeaderStyle.HeaderBox}>
            <img src={advisoryIcon} alt="" style={HeaderStyle.Icon} /><span style={HeaderStyle.color}>咨询</span>
          </div>
          <div className="weightLine"></div>
        </div>
      );
    } else if (headerType === '1') {
      if (hasSubmitButton === 'true') {
        if (onSubmit) {
          return (
            <div style={HeaderStyle.Header}>
              <div style={HeaderStyle.HeaderBox}>
                <img src={back} alt="" style={HeaderStyle.backStyle} onTouchTap={() => hashHistory.goBack()} />
                <img src={ok} alt="" style={HeaderStyle.okStyle} onTouchTap={onSubmit} />
              </div>
              <div className="weightLine"></div>
            </div>
          );
        }
        return (
          <div style={HeaderStyle.Header}>
            <div style={HeaderStyle.HeaderBox}>
              <img src={back} alt="" style={HeaderStyle.backStyle} onTouchTap={() => hashHistory.goBack()} />
              <img src={ok} alt="" style={HeaderStyle.okStyle} onTouchTap={this.EmptyOnClick} />
            </div>
            <div className="weightLine"></div>
          </div>
        );
      }
      return (
        <div style={HeaderStyle.Header}>
          <div style={HeaderStyle.HeaderBox}>
            <img src={back} alt="" style={HeaderStyle.backStyle} onTouchTap={() => hashHistory.goBack()} />
          </div>
          <div className="weightLine"></div>
        </div>
      );
    }
    return null;
  }
}
Header.propTypes = {
  headerType: React.PropTypes.string,
  hasSubmitButton: React.PropTypes.bool,
  onSubmit: React.PropTypes.func
};
export default Header;
