/**
 * Created by zc on 2016/10/12.
 */

class Alert extends React.Component {
  constructor(props) {
    super(props);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
      open: false
    };
  }

  componentWillMount() {
    this.setState({
      open: this.props.open
    });
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      open: nextProps.open
    });
  }

  handleClose = () => {
    this.props.okHandler();
  };

  render() {
    const { message } = this.props;
    const AlertStyle = {
      modalLayer: {
        width: '100%',
        height: '100%',
        background: 'rgba(0,0,0,0.5)',
        position: 'fixed',
        zIndex: '999',
        top: 0,
        left: 0,
        display: this.state.open ? 'block' : 'none'
      },
      alertBox: {
        width: '6.6rem',
        height: '2.8rem',
        background: '#fff',
        borderRadius: '10px',
        position: 'fixed',
        zIndex: '9999',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        margin: 'auto'
      },
      message: {
        width: '100%',
        height: '2.1rem',
        lineHeight: '2.1rem',
        textAlign: 'center'
      },
      sure: {
        width: '100%',
        height: '0.7rem',
        lineHeight: '0.7rem',
        textAlign: 'center',
        borderTop: '1px solid #d8d8d8'
      }
    };
    return (
      <div style={AlertStyle.modalLayer}>
        <div style={AlertStyle.alertBox}>
          <div style={AlertStyle.message}>{message}</div>
          <div style={AlertStyle.sure} onClick={this.handleClose}>确定</div>
        </div>
      </div>
    );
  }
}
Alert.propTypes = {
  open: React.PropTypes.bool,
  okHandler: React.PropTypes.func,
  message: React.PropTypes.string
};
export default Alert;