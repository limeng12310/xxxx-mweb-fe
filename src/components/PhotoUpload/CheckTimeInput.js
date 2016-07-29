import $ from 'jquery';

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
    const style = {
      time: {
        fontSize: 40,
        paddingBottom: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      },
      timeInput1: {
        fontSize: 40,
        width: 487,
        height: 64
        // paddingTop: 8,
        // paddingBottom: 7,
        // paddingLeft: 1
      }
    };

    let input;
    if (this.state.timeClicked) {
      input = (
        <input
          style={style.timeInput1}
          type="datetime-local"
          ref={this.updateRef}
          onChange={this.handleChange}
        />
      );
    } else {
      input = (
        <input
          style={style.timeInput1}
          type="text"
          placeholder="请选择检查时间"
          onClick={this.clickChange}
        />
      );
    }

    return (
      <div style={style.time}>
        <div>时间：</div>
        {input}
      </div>
    );
  }
}

CheckTimeInput.propTypes = {
  onUserDateInput: React.PropTypes.function
};

export default CheckTimeInput;