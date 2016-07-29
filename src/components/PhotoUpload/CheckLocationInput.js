class CheckLocationInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onUserLocationInput(
      e.target.value
    );
  }
  render() {
    const style = {
      location: {
        fontSize: 40,
        paddingBottom: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      },
      locationInput: {
        fontSize: 40,
        height: 64
        // paddingTop: 8,
        // paddingBottom: 7,
        // paddingLeft: 1
      }
    };
    return (
      <div style={style.location}>
        <div>地点：</div>
        <input
          style={style.locationInput}
          type="text"
          placeholder="请选择检查地点"
          value={this.props.location}
          ref="locationInput"
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

CheckLocationInput.propTypes = {
  onUserLocationInput: React.PropTypes.function,
  location: React.PropTypes.string
};

export default CheckLocationInput;