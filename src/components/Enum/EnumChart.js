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
class EnumChart extends React.Component {
  componentDidMount() {
    const num = this.refs.num;
    const myChart = echarts.init(num);
    const Xdate = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25,
      26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42];
    const val = ['0', '1', '0', '1', '0', '1', '0', '1', '1', '1', '1', '1', '0', '0', '0', '0', '0', '1', '1', '1',
      '1', '1', '1', '1', '0', '0', '0', '0', '0', '1', '0', '1', '0', '1', '0', '1', '0', '1', '0', '1', '0', '1'];
    const Yitem = ['0', '1'];
    const option = {
      tooltip: {
        trigger: 'axis',
        position: (pt) => ([pt[0], '1%'])
      },
      xAxis: {
        show: false,
        type: 'category',
        boundaryGap: false,
        data: Xdate
      },
      yAxis: {
        show: false,
        type: 'value',
        boundaryGap: [0, '100%'],
        data: Yitem,
        splitNumber: 1
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
          showSymbol: true,
          symbolSize: 10,
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
    const EnumChartStyle = {
      itemEnum: {
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
      <div style={EnumChartStyle.itemEnum}>
        <div ref="num" style={EnumChartStyle.chart}></div>
      </div>
    );
  }
}
EnumChart.propTypes = {
  width: React.PropTypes.string,
  height: React.PropTypes.string
};
export default EnumChart;