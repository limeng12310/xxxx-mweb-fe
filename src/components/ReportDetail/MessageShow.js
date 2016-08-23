import CircleProgress from './../common/CircleProgress';

class MessageShow extends React.Component {
  render() {
    const styles = {
      box: {
        height: '7.8rem',
        paddingTop: '1.706667rem',
        paddingBottom: '2.666667rem',
        display: 'flex',
        justifyContent: 'center'
      },
      boxLeft: {
        width: '45%',
        height: '100%',
        textAlign: 'center'
      },
      boxRight: {
        paddingRight: '1.333333rem',
        paddingTop: '2.0rem',
        width: '55%'
      },
      circleBox: {
        color: '#fff',
        fontSize: '0.4rem',
        paddingBottom: '0.5rem',
        paddingTop: '0.5rem'
      },
      circle: {
        display: 'inline-block',
        verticalAlign: 'middle',
        float: 'none'
      },
      num: {
        display: 'inline-block',
        verticalAlign: 'middle',
        float: 'none',
        marginLeft: '-0.95rem',
        marginTop: '-0.1rem',
        fontSize: '0.7rem'
      },
      stan: {
        display: 'inline-block',
        verticalAlign: 'middle',
        float: 'none',
        paddingLeft: '0.9rem'
      },
      location: {
        fontSize: '0.533333rem',
        color: '#fff',
        float: 'right'
      },
      date: {
        fontSize: '0.8rem',
        fontWeight: 900,
        color: '#fff',
        float: 'right'
      }
    };
    return (
      <div style={styles.box}>
        <div style={styles.boxLeft}>
          <div style={styles.circleBox}>
            <div style={styles.circle}><CircleProgress per="0.2" x="50" /></div>
            <div style={styles.num}>2</div>
            <div style={styles.stan}>正常指标</div>
          </div>
          <div style={styles.circleBox}>
            <div style={styles.circle}><CircleProgress per="0.9" x="50" /></div>
            <div style={styles.num}>9</div>
            <div style={styles.stan}>观察指标</div>
          </div>
        </div>
        <div style={styles.boxRight}>
          <div style={styles.location}>{this.props.messages.location}</div>
          <div style={styles.date}>{this.props.messages.date}</div>
        </div>
      </div>
    );
  }
}

MessageShow.propTypes = {
  messages: React.PropTypes.object
};

export default MessageShow;