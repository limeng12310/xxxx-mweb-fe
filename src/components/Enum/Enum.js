/**
 * Created by zc on 2016/8/23.
 */
import Header from './../common/Header';
import NumberTu from './NumberTu';
import EnumTu from './EnumTu';
import enumBg from './enumBg.png';
import historyBT from './historyBT.png';
import NumChart from './NumChart';
import config from '../../config';

class Enum extends React.Component {
  constructor(props) {
    super(props);
    this.itemChart = this.itemChart.bind(this);
    this.state = {
      nameInReport: '氨基酸',
      result: '200',
      warning: '正常',
      unit: 'mg/L',
      intro: '肠道寄生虫分为原虫和蠕虫两类。前者是由单细胞构成的具有生命的微生物',
      dataType: '数值',
      abnormal: '他生活于人体消化道，部分种类是致病或条件致病原虫,生活史中大多不用转换寄生',
      ref: '阴性',
      refLow: 50,
      refHigh: 200,
      width: '6.6',
      itemChartData: []
    };
  }
  componentWillMount() {
    this.itemChart();
  }
  itemChart() {
    return new Promise((resolve, reject) => {
      fetch(`${config.apiPrefix}/user-check-items/3652?unit=U/L`)
        .then(response => {
          if (response.status === 200) {
            return response.json();
          }
          throw new Error;
        })
        .then(json => {
          if (json.retCode === 0) {
            this.setState({
              itemChartData: json.data
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
        width: `${this.state.width}rem`,
        height: `${this.state.width}rem`,
        margin: '0 auto',
        marginTop: '1.8rem',
        position: 'relative'
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
        color: 'rgb(252,252,252)',
        lineHeight: '0.5rem',
        fontSize: '0.4rem'
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
        height: '0.7rem',
        textAlign: 'center'
      },
      itemDetails: {
        width: `${this.state.width}rem`,
        height: `${this.state.width}rem`,
        position: 'absolute',
        top: 0,
        left: 0,
        textAlign: 'center',
        paddingTop: '2.6rem',
        color: '#FFF'
      },
      result: {
        fontSize: '0.8rem'
      },
      nameReport: {
        fontSize: '0.45rem'
      },
      range: {
        fontSize: '0.4rem'
      },
      img: {
        width: '0.75rem'
      }
    };
    let Tu;
    let Chart;
    if (this.state.dataType === '数值') {
      Tu = (
        <NumberTu
          min={this.state.refLow}
          max={this.state.refHigh}
          value={this.state.result}
          width={this.state.width}
        />
        );
      Chart = (
        <NumChart width="100%" height="3.4rem" itemChartData={this.state.itemChartData} />
        );
    } else if (this.state.dataType === '枚举') {
      Tu = (
        <EnumTu value={this.state.ref} width={this.state.width} />
      );
      Chart = (<div></div>);
    } else {
      Tu = (<div></div>);
      Chart = (<div></div>);
    }
    return (
      <div style={EnumStyle.box}>
        <Header headerType="1" />
        <div style={EnumStyle.item}>
          <div style={EnumStyle.canBox}>
            {Tu}
            <div style={EnumStyle.itemDetails}>
              <p style={EnumStyle.result}>{this.state.result}</p>
              <p style={EnumStyle.nameReport}>{this.state.nameInReport}</p>
              <p style={EnumStyle.range}>合理范围:{this.state.refLow}-{this.state.refHigh}</p>
            </div>
          </div>
          <div style={EnumStyle.bt}><img src={historyBT} alt="" style={EnumStyle.img} /></div>
          <div style={EnumStyle.chart}>
            <div className="weightLine"></div>
            {Chart}
            <div className="weightLine"></div>
          </div>
          <div style={EnumStyle.intro}>
            <h2 style={EnumStyle.title}>项目介绍:</h2>
            <p style={EnumStyle.content}>{this.state.intro}</p>
          </div>
          <div className="weightLine"></div>
          <div style={EnumStyle.intro}>
            <h2 style={EnumStyle.title}>临床意义:</h2>
            <p style={EnumStyle.content}>{this.state.abnormal}</p>
          </div>
          <div className="weightLine" style={EnumStyle.line}></div>
        </div>
      </div>

    );
  }
}
export default Enum;