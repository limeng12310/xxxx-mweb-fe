import loadingIcon from './img/loadingIcon.png';

class ProcessIndicator extends React.Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {
		this.setState({
			open: this.props.open,
			message: this.props.message,
		});
	}

	componentWillReceiveProps(nextProps) {
		const open = nextProps.open;

		this.setState({
			open: open !== null ? open : this.state.open,
			message: nextProps.message
		});
	}

	render() {
		const {
			message
		}=this.props;
		const styles = {
			background: {
				zIndex: '9999',
				position: 'fixed',
				width: '100%',
				height: '100%',
				backgroundColor: 'rgba(0,0,0,0.5)',
				textAlign: 'center',
				display: this.state.open ? 'flex' : 'none',
				justifyContent: 'middle'
			},
			processIndicatorContent: {
				display: 'inline-block',
				margin: 'auto',
				minWidth: '6.64rem',
				minHeight: '2.15rem',
				color: '#000',
				backgroundColor: '#fff',
				textAlign: 'center',
				borderRadius: '0.28rem',
				padding: '0 0.5rem'
			},
			loadingIcon: {
				width: '0.8rem',
				height: '0.8rem',
				display:'block',
				margin:'0.2rem auto',
				animation:'loading 1.5s linear infinite'
			}
		};
		return (
			<div style={styles.background}>
				<div style={styles.processIndicatorContent}>
					<img src={loadingIcon} style={styles.loadingIcon} alt=""/>
					{message}
				</div>
			</div>
		);
	}
}

ProcessIndicator.propTypes = {
	message: React.PropTypes.string,
	open: React.PropTypes.bool
};

export default ProcessIndicator;
