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
    height: '8rem',
    background: `url(${wangGe}) no-repeat`,
    backgroundSize: 'contain'
  },
  cont: {
    width: '100%',
    height: '100%'
  }
};


class HistoryEcharts extends React.Component {
  componentDidMount() {
    const Main = this.refs.main;
    const myChart = echarts.init(Main);
    const date = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
      16, 17, 18, 19, 20, 21, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
      13, 14, 15, 16, 17, 18, 19, 20, 21, 1, 2, 3, 4, 5, 6, 7, 8, 9,
      10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 1, 2, 3, 4, 5,
      6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];
    const val = [1111, 155, 545, 356, 1010, 888, 51, 535, 125, 256,
      465, 356, 546, 959, 585, 356, 56, 99, 121, 265, 356, 356, 155,
      545, 54, 84, 8, 51, 356, 12, 356, 46, 36, 46, 356, 85, 13, 56,
      99, 121, 265, 356, 11, 155, 545, 54, 84, 8, 51, 53, 12, 26, 46,
      36, 46, 99, 85, 13, 56, 1111, 1215, 265, 356, 356, 155, 545, 554,
      84, 508, 51, 553, 12, 526, 46, 36, 456, 599, 855, 135, 565,
      995, 121, 265, 356];
    const option = {
      tooltip: {
        trigger: 'axis',
        position: (pt) => ([pt[0], '10%'])
      },
      title: {
        left: 'center',
        text: '健康大数据检测图'
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
        end: 10
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
          showSymbol: false,
          itemStyle: {
            normal: {
              color: 'rgb(3,3,3)'
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
export default HistoryEcharts;