class Toast extends React.Component {

  componentWillMount() {
    this.setState({
      open: this.props.open,
      message: this.props.message,
      duration: this.props.duration
    });
  }

  componentDidMount() {
    if (this.state.open) {
      this.setAutoHideTimer();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.open && nextProps.open &&
      (nextProps.message !== this.props.message)) {
      this.setState({
        open: false
      });

      clearTimeout(this.timerOneAtTheTimeId);
      this.timerOneAtTheTimeId = setTimeout(() => {
        this.setState({
          message: nextProps.message,
          open: true
        });
      }, 400);
    } else {
      const open = nextProps.open;

      this.setState({
        open: open !== null ? open : this.state.open,
        message: nextProps.message
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.open !== this.state.open) {
      if (this.state.open) {
        this.setAutoHideTimer();
      } else {
        clearTimeout(this.timerAutoHideId);
      }
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timerAutoHideId);
    clearTimeout(this.timerOneAtTheTimeId);
  }

  // Timer that controls delay before snackbar auto hides
  setAutoHideTimer() {
    const duration = this.props.duration;

    if (duration > 0) {
      clearTimeout(this.timerAutoHideId);
      this.timerAutoHideId = setTimeout(() => {
        if (this.props.open !== null && this.props.closeHandler) {
          this.props.closeHandler('timeout');
        } else {
          this.setState({open: false});
        }
      }, duration);
    }
  }

  // Timer that controls delay before click-away events are captured (based on when animation completes)
  // setTransitionTimer() {
  // 	this.timerTransitionId = setTimeout(() => {
  // 		this.timerTransitionId = undefined;
  // 	}, 400);
  // }

  render() {
    const {
      message
    } = this.props;
    const duration = this.props.duration - 400;
    const styles = {
      background: {
        zIndex: '9999',
        top: '50%',
        position: 'fixed',
        width: '100%',
        textAlign: 'center',
        display: this.state.open ? 'block' : 'none',
        animation: `fadeOut .3s linear ${duration}ms`,
        animationFillMode: 'forwards'
      },
      alertContent: {
        display: 'inline-block',
        margin: '0 auto',
        minWidth: '3.1rem',
        minHeight: '0.56rem',
        color: '#fff',
        backgroundColor: 'rgba(0,0,0,0.2)',
        textAlign: 'center',
        borderRadius: '0.28rem',
        padding: '0 0.5rem'
      }
    };
    return (
      <div style={styles.background}>
        <div style={styles.alertContent}>
          {message}
        </div>
      </div>
    );
  }
}

Toast.propTypes = {
  message: React.PropTypes.string,
  open: React.PropTypes.bool,
  duration: React.PropTypes.number,
  closeHandler: React.PropTypes.func
};

export default Toast;
