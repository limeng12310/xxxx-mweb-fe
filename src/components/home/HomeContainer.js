/**
 * Created by zc on 2016/7/26.
 */
import ButtomBar from './ButtomBar';
import Upload from './Upload';
import ReportList from './ReportList';
import Summary from './Summary';
const HomeContainerStyle = {

  ReportListBox: {
    width: '100%',
    display: 'flex',
    position: 'absolute',
    left: 0,
    bottom: '98px'

  }

};
class HomeContainer extends React.Component {
  render() {
    const cnt = {
      normalCnt: 9,
      warningCnt: 3,
      dangerCnt: 1,
      otherCnt: 5
    };
    const data = [
      {
        date: '星期一,7月21日',
        icon: '',
        time: '10:30',
        okCut: 3,
        warningCnt: 5,
        errorCut: 9
      }, {
        date: '星期二,7月22日',
        icon: '',
        time: '10:30',
        okCut: 4,
        warningCnt: 5,
        errorCut: 6
      }, {
        date: '星期二,7月22日',
        icon: '',
        time: '10:30',
        okCut: 4,
        warningCnt: 5,
        errorCut: 6
      }
    ];
    return (
      <div>
        <Summary cnt={cnt} />
        <div style={HomeContainerStyle.ReportListBox}>
          <ReportList data={data} />
          <Upload />
        </div>
        <ButtomBar />
      </div>
    );
  }
}

export default HomeContainer;
