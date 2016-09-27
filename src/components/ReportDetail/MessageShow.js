import CircleProgress from './../common/CircleProgress';

class MessageShow extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    const handleDom = this.refs.handleDom;
    let touchStartTop = 0;
    $(handleDom).on('touchstart', e => {
      e.preventDefault();
      $('#scroll').removeClass('domMoveAnimition');
      touchStartTop = e.changedTouches[0].screenY;
    });
    $(handleDom).on('touchmove', e => {
      e.preventDefault();
      const touchNowDis = e.changedTouches[0].screenY - touchStartTop;
      const moveDistence = lib.flexible.px2rem(touchNowDis);
      const marginTopNow = parseFloat($('#scroll').css('transform').slice(11).slice(0, -4));
      console.log(marginTopNow);
      if (marginTopNow >= 1.22 && touchNowDis > 0) {
        touchStartTop = e.changedTouches[0].screenY;
        return;
      }
      if (marginTopNow <= -6.58 && touchNowDis < 0) {
        touchStartTop = e.changedTouches[0].screenY;
        return;
      }
      this.props.handleDomMove(moveDistence);
    });
    $(handleDom).on('touchend', e => {
      e.preventDefault();
      $('#scroll').addClass('domMoveAnimition');
      const touchNowDis = e.changedTouches[0].screenY - touchStartTop;
      // console.log(touchNowDis);
      if (touchNowDis > 0) {
        this.props.changeScrollDown();
      } else if (touchNowDis < 0) {
        this.props.changeScrollUp();
      }
    });
  }

  render() {
    const x = lib.flexible.rem * 0.67;
    const styles = {
      box: {
        height: '7.8rem',
        paddingTop: '1.57rem',
        paddingBottom: '1.93rem',
        display: 'flex',
        justifyContent: 'center'
      },
      boxLeft: {
        width: '4.6rem',
        height: '100%',
        paddingLeft: '1.3rem'
      },
      boxRight: {
        paddingRight: '1.386667rem',
        paddingTop: '2.0rem',
        width: '5.4rem'
      },
      circleBox: {
        color: '#fff',
        fontSize: '0.37rem',
        paddingBottom: '0.54rem',
        paddingTop: '0.6rem'
      },
      circle: {
        display: 'inline-block',
        verticalAlign: 'middle',
        float: 'none',
        width: 2 * x,
        height: 2 * x
      },
      num: {
        display: 'inline-block',
        verticalAlign: 'middle',
        float: 'none',
        fontSize: '0.6rem',
        marginLeft: '-1.32rem',
        // paddingTop: '0.2rem',
        height: '1.33rem',
        width: '1.33rem',
        lineHeight: '1.33rem',
        textAlign: 'center'
      },
      stan: {
        display: 'inline-block',
        verticalAlign: 'middle',
        float: 'none',
        paddingLeft: '0.2rem'
      },
      location: {
        fontSize: '0.43rem',
        color: '#fff',
        float: 'right'
      },
      date: {
        fontSize: '0.65rem',
        fontWeight: 700,
        color: '#fff',
        float: 'right'
      }
    };
    let messageBox;
    if (this.props.messages !== {}) {
      const normal = this.props.messages.normal;
      const observe = this.props.messages.warning + this.props.messages.danger;
      const sum = this.props.messages.normal + observe;
      const normalPercent = normal / sum;
      const observePercent = observe / sum;
      let checkAdress;
      if (this.props.messages.location === null ||
        typeof (this.props.messages.location) === 'undefined' ||
        this.props.messages.location === '') {
        checkAdress = '';
      } else {
        checkAdress = this.props.messages.location;
      }
      messageBox = (
        <div style={styles.box} ref="handleDom">
          <div style={styles.boxLeft}>
            <div style={styles.circleBox}>
              <div style={styles.circle}><CircleProgress per={normalPercent} x={x} /></div>
              <div style={styles.num}>{normal}</div>
              <div style={styles.stan}>正常指标</div>
            </div>
            <div style={styles.circleBox}>
              <div style={styles.circle}><CircleProgress per={observePercent} x={x} /></div>
              <div style={styles.num}>{observe}</div>
              <div style={styles.stan}>观察指标</div>
            </div>
          </div>
          <div style={styles.boxRight}>
            <div style={styles.location}>{checkAdress}</div>
            <div style={styles.date}>{this.props.messages.checkTime.substring(0, 10)}</div>
          </div>
        </div>
      );
    } else {
      messageBox = (
        <div style={styles.box} ref="handleDom"></div>
      );
    }
    return messageBox;
  }
}

MessageShow.propTypes = {
  messages: React.PropTypes.object,
  changeScrollUp: React.PropTypes.func.isRequired,
  changeScrollDown: React.PropTypes.func.isRequired,
  handleDomMove: React.PropTypes.func.isRequired
};

export default MessageShow;