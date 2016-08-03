/**
 * Created by zc on 2016/7/27.
 */
import tree from './img/tree2.png';
const SummaryStyle = {
  SummaryBox: {
    width: '100%',
    height: '230px',
    position: 'absolute',
    left: 0,
    top: '50px',
    display: 'flex',
    alignItems: 'center'
  },
  SummaryIcon: {
    flex: 1,
    height: '200px',
    textAlign: 'center'
  },
  SummaryIconImg: {
    width: '160px',
    marginTop: '20px'
  },
  SummaryKpi: {
    flex: 1,
    height: '200px',
    lineHeight: '50px'
  },
  SummaryKpiItem: {
    textAlign: 'center',
    marginBottom: '20px'
  },
  SummaryKpiItemCut: {
    border: '2px solid #75e6dc',
    borderRadius: '50%',
    width: '50px',
    height: '50px',
    display: 'inline-block',
    marginRight: '10px',
    fontSize: '20px',
    color: '#f6f6ff'
  },
  SummaryKpiItemZi: {
    color: '#fcfcfc'
  }
};
class Summary extends React.Component {
  render() {
    const { normalCnt, warningCnt, dangerCnt } = this.props.cnt;
    return (
      <dl style={SummaryStyle.SummaryBox}>
        <dt style={SummaryStyle.SummaryIcon}>
          <img src={tree} alt="" style={SummaryStyle.SummaryIconImg} />
        </dt>
        <dd style={SummaryStyle.SummaryKpi}>
          <p style={SummaryStyle.SummaryKpiItem}>
            <b style={SummaryStyle.SummaryKpiItemCut}>{normalCnt}</b>
            <span style={SummaryStyle.SummaryKpiItemZi}>正常指标</span>
          </p>
          <p style={SummaryStyle.SummaryKpiItem}>
            <b style={SummaryStyle.SummaryKpiItemCut}>{warningCnt}</b>
            <span style={SummaryStyle.SummaryKpiItemZi}>观察指标</span>
          </p>
          <p style={SummaryStyle.SummaryKpiItem}>
            <b style={SummaryStyle.SummaryKpiItemCut}>{dangerCnt}</b>
            <span style={SummaryStyle.SummaryKpiItemZi}>预警指标</span>
          </p>
        </dd>
      </dl>
    );
  }
}
Summary.propTypes = {
  cnt: React.PropTypes.object
};
export default Summary;