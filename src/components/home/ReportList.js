/**
 * Created by zc on 2016/7/25.
 */
import ReportIcon1 from './img/ReportIcon1.png';
import DeleteIcon from './img/delete.png';
const ReportItemStyle = {
  reportList: {
    width: '80%',
    height: '4.8rem',
    overflowY: 'auto'
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
                    <b style={ReportItemStyle.day}>{item.day}</b>
                    <span style={ReportItemStyle.diagonal}></span>
                    <b style={ReportItemStyle.month}>{item.month}</b>
                  </div>
                  <span style={ReportItemStyle.hospital}>{item.content}</span>
                </div>
                <div>
                  <img src={DeleteIcon} alt="" style={ReportItemStyle.Delete} />
                </div>
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