/**
 * Created by zc on 2016/8/31.
 */
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/dataZoom';

import wangGe from './wangGe.png';
const EchartStyle = {
  box: {
    width: '100%',
    height: 'calc(100% - 9.37rem)',
    background: `url(${wangGe}) no-repeat`,
    backgroundSize: 'contain'
  },
  cont: {
    width: '100%',
    height: '100%'
  }
};

class HistoryEcharts extends React.Component {
  constructor(props) {
    super(props);
    this.echart = this.echart.bind(this);
  }
  componentDidMount() {
    this.echart();
  }
  componentDidUpdate() {
    this.echart();
  }
  echart() {
    const Main = this.refs.main;
    const myChart = echarts.init(Main);
    const date = this.props.dataX;
    const val = this.props.dataY;
    const option = {
      tooltip: {
        trigger: 'axis',
        position: (pt) => ([pt[0], '10%'])
      },
      title: {
        left: 'center'
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: date
      },
      yAxis: {
        show: false,
        type: 'value',
        boundaryGap: [0, '100%']
      },
      dataZoom: [{
        type: 'inside',
        start: 0,
        end: 100
      }, {
        start: 0,
        end: 10,
        handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,' +
        '8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,' +
        '11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
        handleSize: '80%',
        handleStyle: {
          color: '#fff',
          shadowBlur: 3,
          shadowColor: 'rgba(0, 0, 0, 0.6)',
          shadowOffsetX: 2,
          shadowOffsetY: 2
        }
      }],
      series: [
        {
          name: '检测值',
          type: 'line',
          smooth: true,
          showSymbol: true,
          symbolSize: 10,
          itemStyle: {
            normal: {
              color: '#FFF'
            }
          },
          data: val
        }
      ]
    };
    myChart.setOption(option);
  }
  render() {
    return (
      <div style={EchartStyle.box}>
        <div ref="main" style={EchartStyle.cont}></div>
      </div>
    );
  }
}
HistoryEcharts.propTypes = {
  dataX: React.PropTypes.array,
  dataY: React.PropTypes.array
};

export default HistoryEcharts;