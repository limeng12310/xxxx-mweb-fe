import {connect} from 'react-redux';
import {refreshReport} from '../../actions/reports';
import MessageShow from './MessageShow';
import ReportShow from './ReportShow';
import containerBackground from './img/background1.svg';
import ProcessIndicator from '../common/ProcessIndicator';
import moment from 'moment';
// import example from './img/example.jpg';
import Header from './../common/Header';
import config from '../../config';


import {hashHistory} from 'react-router';
class ReportDetailContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleChangeScrollUp = this.handleChangeScrollUp.bind(this);
    this.handleChangeScrollDown = this.handleChangeScrollDown.bind(this);
    this.handleDomMove = this.handleDomMove.bind(this);
    this.handleGoItemReport = this.handleGoItemReport.bind(this);
    this.state = {
      processOpen: false,
      aaStyle: {},
      location: '',
      message: {
        checkTime: '',
        location: '',
        normal: 0,
        warning: 0,
        danger: 0,
        imgs: [],
        values: []
      }
    };
  }

  componentDidMount() {
    const reportId = this.props.location.state.id;
    if (!reportId) {
      return;
    }
    const reportData = this.props.reports[reportId.toString()];
    if (reportData != null) {
      const timeDiff = moment().diff(reportData.lastUpdateTime, 'minutes');
      if (timeDiff < 10) {
        return;
      }
    }
    // TODO
    // 潜在风险，待调研
    this.setState({               // eslint-disable-line react/no-did-mount-set-state
      processOpen: true
    });
    fetch(`${config.apiPrefix}/reports/${reportId}`, {
      credentials: 'include'
    })
      .then(response => {
        if (response.status === 200) {
          return response.json();
        }
        throw new Error;
      })
      .then(json => {
        if (json.retCode === 0) {
          this.props.disRefreshReport(reportId, json.data);
          this.setState({
            processOpen: false
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

  fx(fn, begin, end) {
    //  渐出特效
    this.easeOut = (t, b, c, d) => {
      let e = t;
      return -c * (e /= d) * (e - 2) + b;
    };

    const duration = 500;
    const ease = this.easeOut;

    const startTime = new Date().getTime();
    this.respon = () => {
      const timestamp = new Date().getTime() - startTime;
      fn(ease(timestamp, begin, (end - begin), duration), 'step');

      if (duration <= timestamp) {
        fn(end, 'end');
      } else {
        setTimeout(this.respon, 20);
      }
    };
    (() => {
      setTimeout(this.respon, 20);
    })();
  }

  handleChangeScrollUp() {
    $('#scroll').css('transform', 'translateY(-6.58rem)');
  }

  handleChangeScrollDown() {
    $('#scroll').css('transform', 'translateY(1.22rem)');
  }

  handleDomMove(distent, isCollaps) {
    const marginNow = isCollaps ? -6.58 : 1.22;
    $('#scroll').css('transform', `translateY(${(marginNow + distent)}rem)`);
  }

  handleGoItemReport(leftIndex, rightIndex) {
    const reportData = this.props.reports[this.props.location.state.id.toString()].reportData;
    hashHistory.push({
      pathname: '/item-report',
      state: reportData.values[leftIndex].items[rightIndex]
    });
  }

  render() {
    let reportData;
    const report = this.props.reports[this.props.location.state.id.toString()];
    console.log(report);
    if (!report) {
      reportData = {
        checkTime: '',
        location: '',
        normal: 0,
        warning: 0,
        danger: 0,
        imgs: [],
        values: []
      };
    } else {
      reportData = report.reportData;
    }

    const styles = {
      container: {
        height: '100%',
        width: '100%',
        backgroundImage: `url(${containerBackground})`,
        position: 'absolute',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        overflowY: 'hidden'
      },
      scrollBox: {
        position: 'absolute',
        width: '100%',
        height: 'calc(100% - 1.22rem + 7.8rem)',
        transform: 'translateY(1.22rem)',
        overflowY: 'hidden',
        WebkitOverflowScrolling: 'touch'
      }
    };
    return (
      <div>
        <ProcessIndicator message={'数据加载中...'} open={this.state.processOpen} />
        <div style={styles.container}>
          <Header headerType="1" />
          <div style={styles.scrollBox} id="scroll" className="domMoveAnimition">
            <MessageShow
              messages={reportData}
              location={this.props.location.state.location}
              changeScrollUp={this.handleChangeScrollUp}
              changeScrollDown={this.handleChangeScrollDown}
              handleDomMove={this.handleDomMove}
            />
            <ReportShow
              messages={reportData}
              scrollStyle={this.state.aaStyle}
              changeScrollUp={this.handleChangeScrollUp}
              changeScrollDown={this.handleChangeScrollDown}
              handleDomMove={this.handleDomMove}
              handleGoItemReport={this.handleGoItemReport}
            />
          </div>
        </div>
        {this.props.children}
      </div>

    );
  }
}
ReportDetailContainer.propTypes = {
  location: React.PropTypes.object,
  children: React.PropTypes.element,
  reports: React.PropTypes.object,
  disRefreshReport: React.PropTypes.func
};

export default connect(
  state => ({
    reports: state.reportDetail.reports
  }),
  {
    disRefreshReport: refreshReport
  }
)(ReportDetailContainer);