/**
 * Created by zc on 2016/9/1.
 */
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/dataZoom';
import 'echarts/lib/component/grid';
import itemWg from './itemWg.png';
class NumChart extends React.Component {
/*  componentDidMount() {
    const num = this.refs.num;
    const myChart = echarts.init(num);
    if(this.props.itemChartData.length !== 0) {
      const option = {
        tooltip: {
          trigger: 'axis',
          position: (pt) => ([pt[0], '1%'])
        },
        xAxis: {
          show: false,
          type: 'category',
          boundaryGap: false,
          data: this.props.itemChartData.checkTime
        },
        yAxis: {
          show: false,
          type: 'value',
          boundaryGap: [0, '100%']
        },
        dataZoom: [{
          type: 'inside',
          start: 90,
          end: 100
        }],
        grid: {
          top: 30,
          bottom: 30
        },
        series: [
          {
            name: '检测值',
            type: 'line',
            smooth: true,
            showSymbol: false,
            itemStyle: {
              normal: {
                color: '#FFF'
              }
            },
            data: this.props.itemChartData.value
          }
        ]
      };
      myChart.setOption(option);
    }
  }*/
  componentDidUpdate() {
    const num = this.refs.num;
    const myChart = echarts.init(num);
    if (this.props.itemChartData.length !== 0) {
      const newCheckTime = [];
      const newValue = [];
      for (let i = 0; i < this.props.itemChartData.length; i++) {
        newCheckTime.push(this.props.itemChartData[i].checkTime);
        newValue.push(this.props.itemChartData[i].value);
      }
      const option = {
        tooltip: {
          trigger: 'axis',
          position: (pt) => ([pt[0], '1%'])
        },
        xAxis: {
          show: false,
          type: 'category',
          boundaryGap: false,
          data: newCheckTime
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
        }],
        grid: {
          top: 30,
          bottom: 30
        },
        series: [
          {
            name: '检测值',
            type: 'line',
            smooth: true,
            showSymbol: false,
            itemStyle: {
              normal: {
                color: '#FFF'
              }
            },
            data: newValue
          }
        ]
      };
      myChart.setOption(option);
    }
  }
  render() {
    const NumChartStyle = {
      itemNum: {
        width: this.props.width,
        height: this.props.height,
        background: `url(${itemWg}) no-repeat`,
        backgroundSize: 'contain'
      },
      chart: {
        width: '100%',
        height: '100%'
      }
    };
    return (
      <div style={NumChartStyle.itemNum}>
        <div ref="num" style={NumChartStyle.chart}></div>
      </div>
    );
  }
}
NumChart.propTypes = {
  width: React.PropTypes.string,
  height: React.PropTypes.string,
  itemChartData: React.PropTypes.array
};
export default NumChart;