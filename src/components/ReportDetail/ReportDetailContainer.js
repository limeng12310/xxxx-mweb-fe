import MessageShow from './MessageShow';
import ReportShow from './ReportShow';
import containerBackground from './img/background1.svg';
// import example from './img/example.jpg';
import Header from './../common/Header';
import config from '../../config';

import { hashHistory } from 'react-router';
class ReportDetailContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleChangeScroll1 = this.handleChangeScroll1.bind(this);
    this.handleChangeScroll2 = this.handleChangeScroll2.bind(this);
    this.handleGoItemReport = this.handleGoItemReport.bind(this);
    this.state = {
      aaStyle: {},
      message: {
        checkTime: '',
        normal: 0,
        warning: 0,
        danger: 0,
        imgs: [],
        values: []
      }
    };
  }
  componentWillMount() {
    const reportId = this.props.location.state.id;
    if (!reportId) {
      return;
    }
    fetch(`${config.apiPrefix}/reports/${reportId}`)
      .then(response => {
        if (response.status === 200) {
          return response.json();
        }
        throw new Error;
      })
      .then(json => {
        if (json.retCode === 0) {
          this.setState({
            message: json.data
          });
        } else {
          alert('请求出错！');
        }
      })
      .catch(error => {
        alert('出错啦！');
        console.log(error);
      });
  }
  componentDidMount() {
    $('#scroll').scroll(() => {
      const scroH = $('#scroll').scrollTop();
      // console.log(scroH);
      if (scroH >= Math.floor(lib.flexible.rem * 7.8)) {
        this.setState({
          aaStyle: {
            overflowY: 'scroll'
          }
        });
      } else if (scroH < Math.floor(lib.flexible.rem * 7.8)) {
        this.setState({
          aaStyle: {
            overflowY: 'hidden'
          }
        });
      }
    });
  }
  handleChangeScroll1() {
    $('#scroll').css({
      overflowY: 'scroll'
    });
    const t = $('#scroll').scrollTop();
    $('#scroll').animate({ scrollTop: t - 2 }, 100);
  }
  handleChangeScroll2() {
    $('#scroll').css({
      overflowY: 'hidden'
    });
  }
  handleGoItemReport(leftIndex, rightIndex) {
    hashHistory.push({
      pathname: '/item-report',
      state: this.state.message.values[leftIndex].items[rightIndex]
    });
  }
  render() {
    const styles = {
      container: {
        height: '100%',
        width: '100%',
        backgroundImage: `url(${containerBackground})`,
        position: 'absolute',
        backgroundPosition: 'center',
        backgroundSize: 'cover'
      },
      scrollBox: {
        position: 'absolute',
        width: '100%',
        height: 'calc(100% - 1.22rem)',
        marginTop: '1.22rem',
        overflowY: 'scroll',
        WebkitOverflowScrolling: 'touch'
      }
    };
    return (
      <div>
        <div style={styles.container}>
          <Header headerType="1" />
          <div style={styles.scrollBox} id="scroll">
            <MessageShow messages={this.state.message} />
            <ReportShow
              messages={this.state.message}
              scrollStyle={this.state.aaStyle}
              changeScroll1={this.handleChangeScroll1}
              changeScroll2={this.handleChangeScroll2}
              handleGoItemReport={this.handleGoItemReport}
            />
          </div>
        </div>
      </div>

    );
  }
}
ReportDetailContainer.propTypes = {
  location: React.PropTypes.object
};
export default ReportDetailContainer;