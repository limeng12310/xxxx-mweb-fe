import $ from 'jquery';
import './myinput.css';

class CheckTimeInput extends React.Component {
  constructor() {
    super();
    this.updateRef = this.updateRef.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.clickChange = this.clickChange.bind(this);
    this.state = {
      timeClicked: false
    };
  }

  updateRef(ref) {
    this.dateInput = ref;
  }

  handleChange(e) {
    this.props.onUserDateInput(
      e.target.value
    );
  }
  clickChange() {
    this.setState({
      timeClicked: true
    }, function () {
      $(this.dateInput).trigger('blur');
      console.log($(this.dateInput));
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
        // paddingTop: 8,
        // paddingBottom: 7,
        // paddingLeft: 1
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
          style={styles.timeInput1}
          type="datetime-local"
          ref={this.updateRef}
          onChange={this.handleChange}
        />
      );
    } else {
      input = (
        <input
          style={styles.timeInput1}
          type="text"
          placeholder="请选择检查时间"
          onClick={this.clickChange}
        />
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