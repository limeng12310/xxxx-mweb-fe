/**
 * Created by zc on 2016/7/25.
 */

const ReportItemStyle = {
  reportList: {
    width: '80%',
    height: '240px',
    overflowY: 'auto',
    border: '1px solid blue',
    padding: '0 20px'
  },
  reportContent: {
    width: '100%',
    height: '60px',
    background: '#CCC',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    textAlign: 'center',
    lineHeight: '26px',
    borderRadius: '10px'
  },
  reportContainer: {
    width: '75%',
    display: 'flex',
    justifyContent: 'space-around'
  },
  reportKpi: {
    fontSize: '12px'
  },
  reportValue: {
    fontSize: '14px'
  },
  reportTitle: {
    width: '80%',
    lineHeight: '30px'
  },
  reportItem: {
    marginTop: '20px'
  },
  delete: {
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
              <div style={ReportItemStyle.reportTitle}>{item.date}</div>
              <div style={ReportItemStyle.reportContent}>
                <div>
                  <i style={ReportItemStyle.reportKpi}>{item.icon}</i>
                  <div style={ReportItemStyle.reportValue}>{item.time}</div>
                </div>
                <div style={ReportItemStyle.reportContainer}>
                  <div>
                    <div style={ReportItemStyle.reportKpi}>正常</div>
                    <div style={ReportItemStyle.reportValue}>{item.okCut}</div>
                  </div>
                  <div>
                    <div style={ReportItemStyle.reportKpi}>预警</div>
                    <div style={ReportItemStyle.reportValue}>{item.warningCnt}</div>
                  </div>
                  <div>
                    <div style={ReportItemStyle.reportKpi}>危险</div>
                    <div style={ReportItemStyle.reportValue}>{item.errorCut}</div>
                  </div>
                </div>
                <div style={ReportItemStyle.delete}>删除</div>
              </div>
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