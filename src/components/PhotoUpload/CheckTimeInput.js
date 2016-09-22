import './myinput.css';
import moment from 'moment';

class CheckTimeInput extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.clickChange = this.clickChange.bind(this);
    this.state = {
      timeClicked: false
    };
  }
  handleChange(e) {
    this.props.onUserDateInput(
      moment(e.target.value).format('YYYY-MM-DD HH:mm:ss')
    );
  }
  clickChange() {
    this.setState({
      timeClicked: true
    }, function () {
      setTimeout(() => this.refs.datetime.click(), 800);
    });
  }
  render() {
    const styles = {
      time: {
        paddingBottom: '0.15625rem'
      },
      timeInput1: {
        fontSize: '0.625rem',
        color: '#fff',
        height: '1.0rem',
        textAlign: 'center',
        background: 'none',
        border: 'none',
        outline: 'none',
        MozAppearance: 'none',
        msProgressAppearance: 'none',
        WebkitAppearance: 'none'
      },
      timeInput2: {
        fontSize: '0.625rem',
        color: '#fff',
        height: '1.0rem',
        textAlign: 'center',
        background: 'none',
        border: 'none',
        outline: 'none',
        MozAppearance: 'none',
        msProgressAppearance: 'none',
        WebkitAppearance: 'none',
        paddingLeft: '1rem'
      },
      line: {
        height: '0.03125rem',
        background: 'linear-gradient(to right, rgba(255,255,255,0.1), rgba(255,255,255,0.6),rgba(255,255,255,0.1))',
        borderTopColor: '#fff',
        marginLeft: '0.426667rem',
        marginRight: '0.426667rem'
      }
    };

    let input;
    if (this.state.timeClicked) {
      input = (
        <input
          style={styles.timeInput2}
          type="datetime-local"
          ref="datetime"
          onChange={this.handleChange}
        />
      );
    } else {
      input = (
        // <input
        //   style={styles.timeInput1}
        //   type="text"
        //   placeholder="请选择检查时间"
        //   onTouchTap={this.clickChange}
        // />
        <div
          style={styles.timeInput1}
          onTouchTap={this.clickChange}
        >
          请选择检查时间
        </div>
      );
    }

    return (
      <div style={styles.time}>
        {input}
        <div style={styles.line}></div>
      </div>
    );
  }
}

CheckTimeInput.propTypes = {
  onUserDateInput: React.PropTypes.func
};

export default CheckTimeInput;