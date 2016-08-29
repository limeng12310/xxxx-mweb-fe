import CircleProgress from './../common/CircleProgress';

class MessageShow extends React.Component {
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
        marginLeft: '-0.85rem',
        marginTop: '-0.1rem',
        fontSize: '0.7rem'
      },
      stan: {
        display: 'inline-block',
        verticalAlign: 'middle',
        float: 'none',
        paddingLeft: '0.7rem'
      },
      location: {
        fontSize: '0.43rem',
        color: '#fff',
        float: 'right'
      },
      date: {
        fontSize: '0.75rem',
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
      messageBox = (
        <div style={styles.box}>
          <div style={styles.boxLeft}>
            <div style={styles.circleBox}>
              <div style={styles.circle}><CircleProgress per={normal / sum} x={x} /></div>
              <div style={styles.num}>{normal}</div>
              <div style={styles.stan}>正常指标</div>
            </div>
            <div style={styles.circleBox}>
              <div style={styles.circle}><CircleProgress per={observe / sum} x={x} /></div>
              <div style={styles.num}>{observe}</div>
              <div style={styles.stan}>观察指标</div>
            </div>
          </div>
          <div style={styles.boxRight}>
            // /*<div style={styles.location}>{this.props.messages.location}</div>*/
            <div style={styles.date}>{this.props.messages.checkTime.substring(0, 10)}</div>
          </div>
        </div>
      );
    } else {
      messageBox = (
        <div style={styles.box}></div>
      );
    }
    return (
    { messageBox }
    );
  }
}

MessageShow.propTypes = {
  messages: React.PropTypes.object
};

export default MessageShow;