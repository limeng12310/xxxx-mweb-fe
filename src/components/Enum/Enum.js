/**
 * Created by zc on 2016/8/23.
 */

import Header from './../common/Header';
import NumberTu from './NumberTu';
import enumBg from './enumBg.png';
import EnumChart from './EnumChart';
const EnumStyle = {
  box: {
    width: '100%',
    height: '100%',
    background: `url(${enumBg}) no-repeat`,
    backgroundSize: '100% 100%',
    position: 'absolute',
    overflow: 'auto'
  },
  canBox: {
    width: '5.3rem',
    height: '5.3rem',
    margin: '0 auto',
    marginTop: '1.8rem'
  },
  chart: {
    width: '100%',
    height: '3.4rem'
  },
  intro: {
    width: '73%',
    margin: '0 auto',
    marginBottom: '0.2rem'
  },
  title: {
    width: '100%',
    height: '0.8rem',
    lineHeight: '0.8rem',
    fontSize: '0.5rem',
    color: 'rgb(252,252,252)',
    paddingTop: '0.1rem'
  },
  content: {
    width: '100%',
    fontSize: '0.4rem',
    color: 'rgb(252,252,252)',
    lineHeight: '0.5rem'
  },
  line: {
    margin: '0.3rem 0'
  },
  item: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    overflow: 'auto'
  },
  bt: {
    width: '100%',
    height: '1rem'
  }
};
class Enum extends React.Component {
  render() {
    return (
      <div style={EnumStyle.box}>
        <Header headerType="1" />
        <div style={EnumStyle.item}>
          <div style={EnumStyle.canBox}>
            <NumberTu min={1.5} max={3.5} value={3.5} />
          </div>
          <div style={EnumStyle.bt}></div>
          <div style={EnumStyle.chart}>
            <div className="weightLine"></div>
            <EnumChart width="100%" height="3.4rem" />
            <div className="weightLine"></div>
          </div>
          <div style={EnumStyle.intro}>
            <h2 style={EnumStyle.title}>项目介绍:</h2>
            <p style={EnumStyle.content}>肠道寄生虫分为原虫和蠕虫两类。前者是
              由单细胞构成的具有生命的微生物，他生
              活于人体消化道，部分种类是致病或条件
              致病原虫,生活史中大多不用转换寄生
              肠道寄生虫分为原虫和蠕虫两类。前者是
              由单细胞构成的具有生命的微生物，他生
              活于人体消化道，部分种类是致病或条件
              致病原虫,生活史中大多不用转换寄生
              肠道寄生虫分为原虫和蠕虫两类。前者是
              由单细胞构成的具有生命的微生物，他生
              活于人体消化道，部分种类是致病或条件
              致病原虫,生活史中大多不用转换寄生
              肠道寄生虫分为原虫和蠕虫两类。前者是
              由单细胞构成的具有生命的微生物，他生
              活于人体消化道，部分种类是致病或条件
              致病原虫,生活史中大多不用转换寄生
              肠道寄生虫分为原虫和蠕虫两类。前者是
              由单细胞构成的具有生命的微生物，他生
              活于人体消化道，部分种类是致病或条件
              致病原虫,生活史中大多不用转换寄生
              肠道寄生虫分为原虫和蠕虫两类。前者是
              由单细胞构成的具有生命的微生物，他生
              活于人体消化道，部分种类是致病或条件
              致病原虫,生活史中大多不用转换寄生
              肠道寄生虫分为原虫和蠕虫两类。前者是
              由单细胞构成的具有生命的微生物，他生
              活于人体消化道，部分种类是致病或条件
              致病原虫,生活史中大多不用转换寄生
              肠道寄生虫分为原虫和蠕虫两类。前者是
              由单细胞构成的具有生命的微生物，他生
              活于人体消化道，部分种类是致病或条件
              致病原虫,生活史中大多不用转换寄生
            </p>
          </div>
          <div className="weightLine" style={EnumStyle.line}></div>
        </div>
      </div>
    );
  }
}
export default Enum;