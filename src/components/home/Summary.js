/**
 * Created by zc on 2016/7/27.
 */
import tree from './img/tree1.svg';
import CircleProgress from '../common/CircleProgress';
const x = lib.flexible.rem * 0.67;
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
    height: '2rem',
    textAlign: 'center',
    marginBottom: '1rem',
    position: 'relative'
  },
  SummaryKpiItemCut: {
    fontSize: '0.6rem',
    color: '#f6f6ff',
    width: '1.33rem',
    height: '1.33rem',
    position: 'absolute',
    left: '0.4rem',
    paddingTop: '0.22rem',
    textAlign: 'center',
    lineHeight: '1rem'
  },
  SummaryKpiItemZi: {
    color: '#fcfcfc',
    fontSize: '0.4rem',
    display: 'inline-block',
    float: 'right',
    marginRight: '0.4rem',
    marginTop: '0.5rem'
  },
  SummeryKpiCircle: {
    width: 2 * x,
    height: 2 * x,
    display: 'inline-block'
  }
};
class Summary extends React.Component {
  render() {
    const { normal, warning } = this.props.cnt;
    const sum = normal + warning;
    let normalPercent;
    let warningPercent;
    if (sum === 0) {
      normalPercent = 0;
      warningPercent = 0;
    } else {
      normalPercent = normal / sum;
      warningPercent = warning / sum;
    }
    return (
      <dl style={SummaryStyle.SummaryBox}>
        <dt style={SummaryStyle.SummaryIcon}>
          <img src={tree} alt="" style={SummaryStyle.SummaryIconImg} />
        </dt>
        <dd style={SummaryStyle.SummaryKpi}>
          <p style={SummaryStyle.SummaryKpiItem}>
            <div style={SummaryStyle.SummaryKpiItemCut}>{normal}</div>
            <div style={SummaryStyle.SummeryKpiCircle}>
              <CircleProgress per={normalPercent} x={x} />
            </div>
            <span style={SummaryStyle.SummaryKpiItemZi}>正常指标</span>
          </p>
          <p style={SummaryStyle.SummaryKpiItem}>
            <div style={SummaryStyle.SummaryKpiItemCut}>{warning}</div>
            <div style={SummaryStyle.SummeryKpiCircle}>
              <CircleProgress per={warningPercent} x={x} />
            </div>
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