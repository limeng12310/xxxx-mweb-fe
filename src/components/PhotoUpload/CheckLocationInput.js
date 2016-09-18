class CheckLocationInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onUserLocationInput(
      e.target.value
    );
    const HEIGHT = $('body').height();
    $(window).resize(() => {
      $('body').height(HEIGHT);
    });
  }
  render() {
    const styles = {
      location: {
        paddingBottom: '0.15625rem'
      },
      locationInput: {
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
      line: {
        height: '0.03125rem',
        background: 'linear-gradient(to right, rgba(255,255,255,0.1), rgba(255,255,255,0.6),rgba(255,255,255,0.1))',
        borderTopColor: '#fff',
        marginLeft: '0.426667rem',
        marginRight: '0.426667rem'
      }
    };
    return (
      <div style={styles.location}>
        <input
          style={styles.locationInput}
          type="text"
          placeholder="请输入检查地点"
          value={this.props.location}
          ref="locationInput"
          onChange={this.handleChange}
        />
        <div style={styles.line}></div>
      </div>
    );
  }
}

CheckLocationInput.propTypes = {
  onUserLocationInput: React.PropTypes.func,
  location: React.PropTypes.string
};

export default CheckLocationInput;