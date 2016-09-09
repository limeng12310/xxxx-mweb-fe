/**
 * Created by zc on 2016/7/25.
 */
import Manual from './img/ReportIcon1.png';
import Photo from './img/ReportIcon2.png';
import DeleteIcon from './img/delete.png';
import moment from 'moment';

import { hashHistory } from 'react-router';
const ReportItemStyle = {
  reportList: {
    width: '80%',
    height: '4.8rem',
    overflowY: 'scroll',
    overflowScrolling: 'touch'
  },
  reportContent: {
    width: '100%',
    height: '1.6rem',
    display: 'flex',
    justifyContent: 'space-around'
  },
  reportItem: {
    width: '100%',
    height: '1.6rem',
    lineHeight: '1.6rem'
  },
  reportKpi: {
    width: '0.74rem',
    display: 'inline-block',
    verticalAlign: 'middle'
  },
  diagonal: {
    display: 'inline-block',
    width: '0.8rem',
    height: '0.054rem',
    background: '#FFF',
    transform: 'rotate(-45deg)',
    position: 'absolute',
    top: '0.64rem',
    left: '0.3rem'
  },
  year: {
    color: '#fcfcfc',
    fontSize: '0.6rem',
    marginLeft: '0.1rem'
  },
  month: {
    position: 'absolute',
    top: '0.1rem',
    left: '0.66rem',
    color: '#fcfcfc'
  },
  day: {
    position: 'absolute',
    top: '-0.4rem',
    left: '0.4rem',
    color: '#fcfcfc'
  },
  Date: {
    display: 'inline-block',
    position: 'relative',
    width: '1rem',
    height: '0.8rem',
    left: '-0.2rem'
  },
  hospital: {
    color: '#fcfcfc',
    fontSize: '0.3rem'
  },
  Delete: {
    width: '0.6rem',
    marginTop: '0.6rem'
  }
};

class ReportItem extends React.Component {
  constructor() {
    super();
    this.reportDelete = this.reportDelete.bind(this);
  }
  reportDelete(e) {
    const index = parseInt(e.target.getAttribute('data-index'), 10);
    this.props.onUserReportDelete(index);
  }
  render() {
    const data = this.props.data;
    let ReportTu;
    let ClickFunction;
    if (data.type === '用户输入') {
      ReportTu = Manual;
    } else {
      ReportTu = Photo;
    }
    return (
      <div style={ReportItemStyle.reportList}>
        {
          data.map((item, i) => {
            let Year = moment(item.checkTime).format('YY');
            let Month = moment(item.checkTime).format('MM');
            let Day = moment(item.checkTime).format('DD');
            if (data[i].status === '返回用户') {
              ClickFunction = () => hashHistory.push({ pathname: '/report-detail', state: { id: item.id } });
            } else {
              ClickFunction = () => { alert('报告正在解读中'); };
            }
            return (
              <div style={ReportItemStyle.reportItem}>
                <div style={ReportItemStyle.reportContent}>

                  <div onClick={ClickFunction}>
                    <img src={ReportTu} alt="" style={ReportItemStyle.reportKpi} />
                    <b style={ReportItemStyle.year}>{Year}</b>
                    <div style={ReportItemStyle.Date}>
                      <b style={ReportItemStyle.day}>{Month}</b>
                      <span style={ReportItemStyle.diagonal}></span>
                      <b style={ReportItemStyle.month}>{Day}</b>
                    </div>
                    <span style={ReportItemStyle.hospital}>{item.content}</span>
                  </div>

                  <div>
                    <img
                      src={DeleteIcon}
                      data-index={i}
                      alt=""
                      style={ReportItemStyle.Delete}
                      onClick={this.reportDelete}
                    />
                  </div>
                </div>
                <div className="line"></div>
              </div>
            );
          })
        }
      </div>
    );
  }
}
ReportItem.propTypes = {
  data: React.PropTypes.array,
  onUserReportDelete: React.PropTypes.func
};
export default ReportItem;