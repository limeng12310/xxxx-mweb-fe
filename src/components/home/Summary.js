/**
 * Created by zc on 2016/7/27.
 */
const SummaryStyle = {
  SummaryBox: {
    width: '100%',
    height: '330px',
    border: '1px solid #f00',
    position: 'absolute',
    left: 0,
    top: 0,
    display: 'flex',
    alignItems: 'center'
  },
  SummaryIcon: {
    flex: 1,
    height: '200px',
    border: '1px solid blue',
    textAlign: 'center',
    lineHeight: '200px'
  },
  SummaryKpi: {
    border: '1px solid green',
    flex: 1,
    height: '200px',
    lineHeight: '50px'
  },
  SummaryKpiItem: {
    display: 'flex',
    justifyContent: 'space-around'
  }
};
class Summary extends React.Component {
  render() {
    const { normalCnt, warningCnt, dangerCnt, otherCnt } = this.props.cnt;
    return (
      <dl style={SummaryStyle.SummaryBox}>
        <dt style={SummaryStyle.SummaryIcon}>icon图标</dt>
        <dd style={SummaryStyle.SummaryKpi}>
          <p style={SummaryStyle.SummaryKpiItem}><b>{normalCnt}</b><span>正常指标</span></p>
          <p style={SummaryStyle.SummaryKpiItem}><b>{warningCnt}</b><span>观察指标</span></p>
          <p style={SummaryStyle.SummaryKpiItem}><b>{dangerCnt}</b><span>预警指标</span></p>
          <p style={SummaryStyle.SummaryKpiItem}><b>{otherCnt}</b><span>其他指标</span></p>
        </dd>
      </dl>
    );
  }
}
Summary.propTypes = {
  cnt: React.PropTypes.object
};
export default Summary;