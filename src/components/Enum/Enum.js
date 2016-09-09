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
import identifying from './identifying.png';

class Enum extends React.Component {
  constructor(props) {
    super(props);
    this.itemChart = this.itemChart.bind(this);
    this.state = {
      message: {
        nameInReport: '',
        result: '',
        warning: '',
        unit: '',
        intro: '',
        dataType: '',
        abnormal: '',
        ref: '',
        refLow: 0,
        refHigh: 0
      },
      width: '6.6',
      itemChartData: []
    };
  }
  componentWillMount() {
    this.itemChart();
    this.setState({
      message: this.props.location.state
    });
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
      },
      emptyHeight: {
        height: '1.2rem'
      },
      identifying: {
        marginTop: '0.5rem',
        width: '1.2rem'
      }
    };
    let Tu;
    let Chart;
    let HistoryBt;
    let Warning;
    let LColor;
    let RColor;
    if (this.state.message.warning === '观察' || this.state.message.warning === '危险') {
      Warning = (
        <p><img src={identifying} alt="" style={EnumStyle.identifying} /></p>
      );
    } else {
      Warning = (
        <div></div>
      );
    }
    if (this.state.message.dataType === '数值') {
      Tu = (
        <div style={EnumStyle.canBox}>
          <NumberTu
            min={this.state.message.refLow}
            max={this.state.message.refHigh}
            value={this.state.message.result}
            width={this.state.width}
          />
          <div style={EnumStyle.itemDetails}>
            <p style={EnumStyle.result}>{this.state.message.result}</p>
            <p style={EnumStyle.nameReport}>{this.state.message.nameInReport}</p>
            <p style={EnumStyle.range}>合理范围:{this.state.message.refLow}-{this.state.message.refHigh}</p>
            {Warning}
          </div>
        </div>
        );
      HistoryBt = (
        <div style={EnumStyle.bt}><img src={historyBT} alt="" style={EnumStyle.img} /></div>
      );
      Chart = (
        <div style={EnumStyle.chart}>
          <div className="weightLine"></div>
          <NumChart width="100%" height="3.4rem" itemChartData={this.state.itemChartData} />
          <div className="weightLine"></div>
        </div>
        );
    } else if (this.state.message.dataType === '枚举') {
      if (this.state.message.result === '阳性') {
        LColor = 'rgba(252, 252, 252, 0.5)';
        if (this.state.message.ref === '阴性') {
          RColor = 'rgb(140,136,65)';
        } else if (this.state.message.ref === '阳性') {
          RColor = 'rgb(39, 240, 188)';
        }
      } else if (this.state.message.result === '阴性') {
        RColor = 'rgba(252, 252, 252, 0.5)';
        if (this.state.message.ref === '阴性') {
          LColor = 'rgb(39, 240, 188)';
        } else if (this.state.message.ref === '阳性') {
          LColor = 'rgb(140,136,65)';
        }
      } else {
        LColor = 'rgba(252, 252, 252, 0.5)';
        RColor = 'rgba(252, 252, 252, 0.5)';
      }
      Tu = (
        <div style={EnumStyle.canBox}>
          <EnumTu value={this.state.message.ref} width={this.state.width} leftColor={LColor} rightColor={RColor} />
          <div style={EnumStyle.itemDetails}>
            <p style={EnumStyle.result}>{this.state.message.result}</p>
            <p style={EnumStyle.nameReport}>{this.state.message.nameInReport}</p>
            <p style={EnumStyle.range}>合理范围:{this.state.message.ref}</p>
            {Warning}
          </div>
        </div>
      );
      Chart = (<div></div>);
    } else {
      Tu = (<div></div>);
      Chart = (<div style={EnumStyle.emptyHeight}></div>);
    }
    return (
      <div style={EnumStyle.box}>
        <Header headerType="1" />
        <div style={EnumStyle.item}>
          {Tu}
          {HistoryBt}
          {Chart}
          <div style={EnumStyle.intro}>
            <h2 style={EnumStyle.title}>项目介绍:</h2>
            <p style={EnumStyle.content}>{this.state.message.intro}</p>
          </div>
          <div className="weightLine"></div>
          <div style={EnumStyle.intro}>
            <h2 style={EnumStyle.title}>临床意义:</h2>
            <p style={EnumStyle.content}>{this.state.message.abnormal}</p>
          </div>
          <div className="weightLine" style={EnumStyle.line}></div>
        </div>
      </div>

    );
  }
}
Enum.propTypes = {
  location: React.PropTypes.object
};
export default Enum;