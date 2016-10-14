/**
 * Created by zc on 2016/10/13.
 */

class Confirm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSure = this.handleSure.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.state = {
      open: false
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      open: nextProps.open
    });
  }

  handleSure = () => {
    this.props.okHandler();
  };

  handleCancel = () => {
    this.props.cancelHandler();
  };

  render() {
    const { message } = this.props;
    const ConfirmStyle = {
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
      ConfirmBox: {
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
      controlBox: {
        width: '100%',
        height: '0.7rem',
        display: 'flex',
        alignItems: 'center',
        borderTop: '1px solid #d8d8d8'
      },
      sure: {
        flex: 1,
        borderLeft: '1px solid #d8d8d8',
        color: '#ea575d',
        textAlign: 'center'
      },
      Cancel: {
        flex: 1,
        textAlign: 'center'
      }
    };
    return (
      <div style={ConfirmStyle.modalLayer}>
        <div style={ConfirmStyle.ConfirmBox}>
          <div style={ConfirmStyle.message}>{message}</div>
          <div style={ConfirmStyle.controlBox}>
            <div style={ConfirmStyle.Cancel} onClick={this.handleCancel}>取消</div>
            <div style={ConfirmStyle.sure} onClick={this.handleSure}>确定</div>
          </div>
        </div>
      </div>
    );
  }
}
Confirm.propTypes = {
  open: React.PropTypes.bool,
  okHandler: React.PropTypes.func,
  cancelHandler: React.PropTypes.func,
  message: React.PropTypes.string
};
export default Confirm;