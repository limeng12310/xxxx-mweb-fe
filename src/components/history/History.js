/**
 * Created by zc on 2016/8/16.
 */
  import Header from '../common/Header';
  import ButtomBar from '../common/ButtomBar';
  import historyBg from './historyBg.png';
  import Category from './Category';
  const HistoryStyle = {
    history: {
      width: '100%',
      height: '100%',
      background: `url(${historyBg}) no-repeat`,
      backgroundSize: '100% 100%',
      overflow: 'hidden',
      position: 'absolute'
    },
    Main: {
      width: '100%',
      position: 'absolute',
      top: '1.2rem',
      left: 0
    },
    Title: {
      width: '100%',
      height: '1rem',
      lineHeight: '1rem',
      textAlign: 'center',
      color: '#fcfcfc',
      fontSize: '0.5rem'
    },
    tuBiao: {
      width: '100%',
      height: '8.6rem',
      background: '#FFF',
      fontSize: '0.5rem'
    },
    Category: {
      width: '100%',
      height: '2rem',
      color: '#fcfcfc',
      background: '#FF5500',
      fontSize: '0.5rem'
    },
    Range: {
      width: '100%',
      height: '3.6rem',
      display: 'flex',
      justifyContent: 'space-around',
      paddingTop: '0.4rem'
    },
    Circle: {
      width: '2rem',
      height: '2rem',
      borderRadius: '50%',
      border: '1px solid #fff',
      lineHeight: '2rem',
      textAlign: 'center',
      color: '#fcfcfc',
      fontSize: '0.8rem'
    },
    MaxMin: {
      textAlign: 'center',
      fontSize: '0.46rem',
      color: '#fcfcfc',
      lineHeight: '0.8rem'
    }
  };
  class History extends React.Component {
    render() {
      const { maxCnt, minCnt } = this.props;
      return (
        <div style={HistoryStyle.history}>
          <Header headerType="0" />
          <div style={HistoryStyle.Main}>
            <div style={HistoryStyle.Title}>白细胞计数</div>
            <div style={HistoryStyle.tuBiao}>echarts折线图组件</div>
            <Category style={HistoryStyle.Category} />
            <div style={HistoryStyle.Range}>
              <dl>
                <dt style={HistoryStyle.Circle}>{maxCnt}</dt>
                <dd style={HistoryStyle.MaxMin}>最高</dd>
              </dl>
              <dl>
                <dt style={HistoryStyle.Circle}>{minCnt}</dt>
                <dd style={HistoryStyle.MaxMin}>最低</dd>
              </dl>
            </div>
          </div>
          <ButtomBar />
        </div>
      );
    }
  }
  History.propTypes = {
    maxCnt: React.PropTypes.number,
    minCnt: React.PropTypes.number
  };
  export default History;