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
  componentDidMount() {
    const num = this.refs.num;
    const myChart = echarts.init(num);
    const date = [1, 2, '你好', 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,
      27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42];
    const val = [154, 243, 347, 47, 576, 63, 76, 87, 149, 140, 171, 182, 313, 214, 615, 156, 167, 318, 159, 620, 221,
      154, 243, 347, 47, 576, 63, 76, 87, 149, 140, 171, 182, 313, 214, 615, 156, 167, 318, 159, 620, 221];
    const option = {
      tooltip: {
        trigger: 'axis',
        position: (pt) => ([pt[0], '1%'])
      },
      xAxis: {
        show: false,
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
              color: 'rgb(255,255,255)'
            }
          },
          data: val
        }
      ]
    };
    myChart.setOption(option);
  }
  render() {
    const NumChartStyle = {
      itemNum: {
        width: this.props.Width,
        height: this.props.Height,
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
  Width: React.PropTypes.string,
  Height: React.PropTypes.string
};
export default NumChart;