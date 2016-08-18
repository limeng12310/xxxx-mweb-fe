import stateIcon from './img/wordInput.svg';

class MessageShow extends React.Component {
  render() {
    const styles = {
      box: {
        height: 500,
        paddingTop: 200,
        paddingBottom: 80,
        display: 'flex',
        justifyContent: 'center'
      },
      boxLeft: {
        width: '50%',
        height: '100%',
        textAlign: 'center'
      },
      boxRight: {
        paddingRight: 100,
        paddingTop: 200,
        width: '50%',
        height: '50%'
      },
      icon: {
        height: '50%',
        width: '100%',
        backgroundImage: `url(${stateIcon})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      },
      isNormal: {
        marginTop: 20,
        fontSize: 40,
        color: '#fff'
      },
      location: {
        fontSize: 40,
        color: '#fff',
        float: 'right'
      },
      date: {
        fontSize: 70,
        fontWeight: 900,
        color: '#fff',
        float: 'right'
      },
      description: {
        paddingLeft: 110,
        fontSize: 40,
        color: '#fff',
        float: 'left'
      }
    };
    return (
      <div style={styles.box}>
        <div style={styles.boxLeft}>
          <div style={styles.icon}></div>
          <div style={styles.isNormal}>{this.props.messages.isNormal}</div>
        </div>
        <div style={styles.boxRight}>
          <div style={styles.location}>{this.props.messages.location}</div>
          <div style={styles.date}>{this.props.messages.date}</div>
          <div style={styles.description}>{this.props.messages.description}</div>
        </div>
      </div>
    );
  }
}

MessageShow.propTypes = {
  messages: React.PropTypes.object
};

export default MessageShow;