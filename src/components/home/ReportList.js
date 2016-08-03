/**
 * Created by zc on 2016/7/25.
 */
import ReportIcon1 from './img/ReportIcon1.png';

const ReportItemStyle = {
  reportList: {
    width: '80%',
    height: '240px',
    overflowY: 'auto'
  },
  reportContent: {
    width: '100%',
    height: '80px',
    display: 'flex',
    justifyContent: 'space-around'
  },
  reportItem: {
    width: '100%',
    height: '80px',
    lineHeight: '80px'
  },
  reportKpi: {
    width: '28px',
    display: 'inline-block',
    verticalAlign: 'middle'
  },
  diagonal: {
    display: 'inline-block',
    width: '30px',
    height: '2px',
    background: '#fff',
    transform: 'rotate(-45deg)',
    position: 'absolute',
    top: '24px',
    left: '10px'
  },
  year: {
    color: '#fcfcfc',
    fontSize: '20px',
    marginLeft: '4px'
  },
  month: {
    position: 'absolute',
    top: '-24px',
    left: '10px',
    color: '#fcfcfc'
  },
  day: {
    position: 'absolute',
    top: '-4px',
    left: '24px',
    color: '#fcfcfc'
  },
  Date: {
    display: 'inline-block',
    position: 'relative',
    width: '42px',
    height: '30px'
  },
  hospital: {
    color: '#fcfcfc',
    fontSize: '10px'
  }
};

class ReportItem extends React.Component {
  render() {
    const data = this.props.data;
    return (
      <div style={ReportItemStyle.reportList}>
        {
          data.map(item => (
            <div style={ReportItemStyle.reportItem}>
              <div style={ReportItemStyle.reportContent}>
                <div>
                  <img src={ReportIcon1} alt="" style={ReportItemStyle.reportKpi} />
                  <b style={ReportItemStyle.year}>{item.year}</b>
                  <div style={ReportItemStyle.Date}>
                    <b style={ReportItemStyle.month}>{item.month}</b>
                    <span style={ReportItemStyle.diagonal}></span>
                    <b style={ReportItemStyle.day}>{item.day}</b>
                  </div>
                  <span style={ReportItemStyle.hospital}>{item.content}</span>
                </div>
                <div>删除</div>
              </div>
              <div className="line"></div>
            </div>
            )
          )
        }
      </div>
    );
  }
}
ReportItem.propTypes = {
  data: React.PropTypes.array
};
export default ReportItem;