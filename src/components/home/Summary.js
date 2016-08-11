/**
 * Created by zc on 2016/7/27.
 */
import tree from './img/tree1.svg';
const SummaryStyle = {
  SummaryBox: {
    width: '100%',
    height: '96%',
    display: 'flex'
  },
  SummaryIcon: {
    width: '60%',
    height: '5rem',
    textAlign: 'center',
    paddingTop: '0.4rem'
  },
  SummaryIconImg: {
    width: '100%'
  },
  SummaryKpi: {
    paddingTop: '1.6rem',
    width: '40%'
  },
  SummaryKpiItem: {
    height: '1.4rem',
    textAlign: 'center',
    lineHeight: '1.4rem',
    marginBottom: '1rem'
  },
  SummaryKpiItemCut: {
    border: '2px solid #75e6dc',
    borderRadius: '50%',
    width: '1.4rem',
    height: '1.4rem',
    display: 'inline-block',
    marginRight: '0.3rem',
    fontSize: '0.6rem',
    color: '#f6f6ff'
  },
  SummaryKpiItemZi: {
    color: '#fcfcfc',
    fontSize: '0.4rem'
  }
};
class Summary extends React.Component {
  render() {
    const { normalCnt, warningCnt } = this.props.cnt;
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
        </dd>
      </dl>
    );
  }
}
Summary.propTypes = {
  cnt: React.PropTypes.object
};
export default Summary;