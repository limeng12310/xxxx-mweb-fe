/**
 * Created by zc on 2016/7/26.
 */
import ButtomBar from './../common/ButtomBar';
import Upload from './Upload';
import ReportList from './ReportList';
import Summary from './Summary';
import homeBG from './img/homeBG.png';
import config from '../../config';

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
      reportList: [],
      aggregation: {}
    };
  }
  componentDidMount() {
    this.reportList();
    this.amount();
  }
  onUserReportDelete(index) {
    const newReportList = [];
    for (let i = 0; i < this.state.reportList.length; i ++) {
      if (i !== index) {
        newReportList.push(this.state.reportList[i]);
      }
    }
    this.setState({
      reportList: newReportList
    });
    // fetch(`${config.apiPrefix}/reports/${this.state.reportList[index].id}`, {
    //   method: 'DELETE',
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json'
    //   }
    // })
    //   .then(response => {
    //   if (response.status === 200) {
    //     return response.json();
    //   }
    //   throw new Error;
    //   })
    //   .then(json => {
    //     if (json.retCode === 0) {
    //       alert('成功删除一个报告！');
    //     } else {
    //       alert('请求出错！');
    //     }
    //   })
    //   .catch(error => {
    //     alert('出错啦！');
    //     console.log(error);
    //   });
  }
  amount() {
    return new Promise((resolve, reject) => {
      fetch(`${config.apiPrefix}/report-aggregation`)
        .then(response => {
          if (response.status === 200) {
            return response.json();
          }
          throw new Error;
        })
        .then(json => {
          if (json.retCode === 0) {
            this.setState({
              aggregation: json.data
            }, () => {
              resolve();
            });
          } else {
            alert('请求出错！');
          }
        })
        .catch(error => {
          alert('出错啦！');
          console.log(error);
          reject(error);
        });
    });
  }
  reportList() {
    return new Promise((resolve, reject) => {
      fetch(`${config.apiPrefix}/reports?_limit=99999&_offset=0`)
        .then(response => {
          if (response.status === 200) {
            return response.json();
          }
          throw new Error;
        })
        .then(json => {
          if (json.retCode === 0) {
            this.setState({
              reportList: json.data
            }, () => {
              resolve();
            });
          } else {
            alert('请求出错！');
          }
        })
        .catch(error => {
          alert('出错啦！');
          console.log(error);
          reject(error);
        });
    });
  }
  render() {
    return (
      <div>
        <div style={HomeContainerStyle.HomeBox}>
          <div style={HomeContainerStyle.Center}>
            <Summary cnt={this.state.aggregation} />
          </div>
          <div style={HomeContainerStyle.Report}>
            <div style={HomeContainerStyle.Filter}>
              <a href="###" style={HomeContainerStyle.Button}>报告时间</a>
              <a href="###" style={HomeContainerStyle.Button}></a>
            </div>
            <div className="weightLine"></div>
            <div style={HomeContainerStyle.ReportListBox}>
              <ReportList data={this.state.reportList} onUserReportDelete={this.onUserReportDelete} />
              <Upload />
            </div>
          </div>
          <ButtomBar bottombarType="0" />
        </div>
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
  children: React.PropTypes.element
};

export default HomeContainer;