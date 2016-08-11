/**
 * Created by zc on 2016/7/26.
 */
import ButtomBar from './../common/ButtomBar';
import Upload from './Upload';
import ReportList from './ReportList';
import Summary from './Summary';
import Header from './../common/Header';
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
    backgroundSize: '100% 100%',
    position: 'absolute',
    overflow: 'hidden'
  },
  Report: {
    width: '100%',
    position: 'absolute',
    left: 0,
    bottom: '1.42rem'
  },
  Center: {
    width: '100%',
    position: 'absolute',
    top: '1.2rem',
    left: '0',
    height: '45%'
  },
  Filter: {
    width: '100%',
    height: '1rem',
    display: 'flex',
    lineHeight: '1rem',
    textAlign: 'center'
  },
  Button: {
    flex: '1',
    fontSize: '0.48rem',
    color: '#fff',
    textDecoration: 'none'
  }
};
class HomeContainer extends React.Component {
  aa = () => {
    alert('点击确认按钮的callback()');
  };
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
        <Header headerType="0" />
        <div style={HomeContainerStyle.Center}>
          <Summary cnt={cnt} />
        </div>
        <div style={HomeContainerStyle.Report}>
          <div style={HomeContainerStyle.Filter}>
            <a href="###" style={HomeContainerStyle.Button}>报告时间</a>
            <a href="###" style={HomeContainerStyle.Button}>上传时间</a>
          </div>
          <div className="weightLine"></div>
          <div style={HomeContainerStyle.ReportListBox}>
            <ReportList data={data} />
            <Upload />
          </div>
        </div>
        <ButtomBar />
      </div>
    );
  }
}

export default HomeContainer;
