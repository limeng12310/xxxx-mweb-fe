/**
 * Created by zc on 2016/7/26.
 */
import ButtomBar from './ButtomBar';
import Upload from './Upload';
import ReportList from './ReportList';
import Summary from './Summary';
import Header from './Header';
import homeBG from './img/homeBG.png';

const HomeContainerStyle = {
  ReportListBox: {
    width: '100%',
    display: 'flex'
  },
  HomeBox: {
    width: '100%',
    height: '100%',
    background: `url(${homeBG}) no-repeat`,
    backgroundSize: 'cover',
    position: 'absolute'
  },
  Report: {
    width: '100%',
    position: 'absolute',
    left: 0,
    bottom: '100px'
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
        year: 16,
        month: 2,
        day: 14,
        content: '北京大学第一医院'
      }, {
        year: 15,
        month: 3,
        day: 14,
        content: '山西大学第一医院'
      }, {
        year: 14,
        month: 4,
        day: 14,
        content: '东北大学第一医院'
      }, {
        year: 15,
        month: 3,
        day: 14,
        content: '山西大学第一医院'
      }, {
        year: 14,
        month: 4,
        day: 14,
        content: '东北大学第一医院'
      }
    ];
    return (
      <div style={HomeContainerStyle.HomeBox}>
        <Header />
        <Summary cnt={cnt} />
        <div style={HomeContainerStyle.Report}>
          <div className="weightLine"></div>
          <div style={HomeContainerStyle.ReportListBox}>
            <ReportList data={data} />
            <Upload />
          </div>
          <div className="weightLine"></div>
        </div>
        <ButtomBar />
      </div>
    );
  }
}

export default HomeContainer;
