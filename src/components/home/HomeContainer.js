/**
 * Created by zc on 2016/7/26.
 */
import ButtomBar from './../common/ButtomBar';
import Upload from './Upload';
import ReportList from './ReportList';
import Summary from './Summary';
import homeBG from './img/homeBG.png';
import config from '../../config';
import moment from 'moment';
import ProcessIndicator from '../common/ProcessIndicator';
import { connect } from 'react-redux';
import { refreshAggregation, refreshreportList } from '../../actions/refreshHome';
import Toast from '../common/Toast';
const HomeContainerStyle = {
  ReportListBox: {
    width: '100%',
    display: 'flex'
  },
  HomeBox: {
    width: '100%',
    height: '100%',
    background: `url(${homeBG}) no-repeat`,
    backgroundSize: '100% 100%',
    position: 'absolute',
    overflow: 'hidden'
  },
  Report: {
    width: '100%',
    position: 'absolute',
    left: 0,
    bottom: '1.42rem'
  },
  Center: {
    width: '100%',
    position: 'absolute',
    top: '0.8rem',
    left: 0,
    height: '45%'
  },
  Filter: {
    width: '100%',
    height: '1rem',
    display: 'flex',
    lineHeight: '1rem',
    textAlign: 'center'
  },
  Button: {
    flex: '1',
    fontSize: '0.48rem',
    color: '#fff',
    textDecoration: 'none'
  }
};
class HomeContainer extends React.Component {
  constructor(props) {
    super(props);
    this.reportList = this.reportList.bind(this);
    this.amount = this.amount.bind(this);
    this.onUserReportDelete = this.onUserReportDelete.bind(this);
    this.state = {
      PIOpen: false,
      confirmOpen: false,
      ToastOpen: false
    };
  }

  componentDidMount() {
    this.reportList();
    this.amount();
  }

  onUserReportDelete(index) {
    const newReportList = [];
    for (let i = 0; i < this.props.reportList.length; i++) {
      if (i !== index) {
        newReportList.push(this.props.reportList[i]);
      }
    }
    this.props.disRefreshReportList(newReportList);
    fetch(`${config.apiPrefix}/reports/${this.props.reportList[index].id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
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
          this.setState({
            ToastOpen: true
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

  amount() {
    const timeDiff = moment().diff(this.props.updateTime, 'minutes');
    if (!this.props.aggregation && timeDiff < 10) {
      return;
    }
    fetch(`${config.apiPrefix}/report-aggregation`, {
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
          this.props.disRefreshAggregation(json.data);
        } else {
          alert('请求出错！');
        }
      })
      .catch(error => {
        alert('出错啦！');
        console.log(error);
      });
  }

  reportList() {
    const timeDiff = moment().diff(this.props.updateTime, 'minutes');
    if (this.props.reportList.length > 0 && timeDiff < 10) {
      return;
    }
    this.setState({
      PIOpen: true
    });
    fetch(`${config.apiPrefix}/reports?_limit=99999&_offset=0`, {
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
          this.props.disRefreshReportList(json.data);
          this.setState({
            PIOpen: false
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

  render() {
    return (
      <div>
        <div style={HomeContainerStyle.HomeBox}>
          <div style={HomeContainerStyle.Center}>
            <Summary cnt={this.props.aggregation} />
          </div>
          <div style={HomeContainerStyle.Report}>
            <div style={HomeContainerStyle.Filter}>
              <a href="###" style={HomeContainerStyle.Button}>报告时间</a>
              <a href="###" style={HomeContainerStyle.Button}></a>
            </div>
            <div className="weightLine"></div>
            <div style={HomeContainerStyle.ReportListBox}>
              <ReportList data={this.props.reportList} onUserReportDelete={this.onUserReportDelete} />
              <Upload />
            </div>
          </div>
          <ButtomBar bottombarType="0" />
        </div>
        <ProcessIndicator open={this.state.PIOpen} message="loading" />
        <Toast open={this.state.ToastOpen} message="成功删除一个报告" duration={2000} />
        {this.props.children}
      </div>
    );
  }
}
// 上传时间
HomeContainer.propTypes = {
  headerType: React.PropTypes.number,
  hasSubmitButton: React.PropTypes.bool,
  onSubmit: React.PropTypes.func,
  children: React.PropTypes.element,
  updateTime: React.PropTypes.string,
  disRefreshReportList: React.PropTypes.func,
  disRefreshAggregation: React.PropTypes.func,
  aggregation: React.PropTypes.object,
  reportList: React.PropTypes.array
};

export default connect(
  state => ({
    aggregation: state.refreshHome.aggregation,
    reportList: state.refreshHome.reportList,
    updateTime: state.refreshHome.updateTime
  }),
  {
    disRefreshAggregation: refreshAggregation,
    disRefreshReportList: refreshreportList
  }
)(HomeContainer);