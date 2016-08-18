import MessageShow from './MessageShow';
import ReportShow from './ReportShow';
import containerBackground from './img/background1.svg';
import back from './img/back.svg';

class ReportDetailContainer extends React.Component {
  render() {
    const message = {
      location: '中日协和医院',
      date: '2016-10-20',
      description: '挂号难 排队长 不是特别舒服',
      isNormal: '正常'
    };
    const report = [
      { name: '血常规', items: ['红细胞数', '淋巴细胞绝对值', '中间细胞绝对值', '粒细胞绝对值', '淋巴细胞百分比'] },
      { name: '血生化', items: ['fkaldkf', '1淋巴细胞绝对值', '1中间细胞绝对值', '1粒细胞绝对值', '1淋巴细胞百分比'] },
      { name: '血免疫', items: ['2红细胞数', '2淋巴细胞绝对值', '2中间细胞绝对值', '2粒细胞绝对值', '2淋巴细胞百分比'] },
      { name: '尿二项', items: ['3红细胞数', '3淋巴细胞绝对值', '3中间细胞绝对值', '3粒细胞绝对值', '3淋巴细胞百分比'] }
    ];
    // const report = [{ name: '血常规', items: ['红细胞数'] }];
    const styles = {
      container: {
        height: '100%',
        width: '100%',
        backgroundImage: `url(${containerBackground})`,
        position: 'absolute',
        backgroundPosition: 'center',
        backgroundSize: 'cover'
      },
      nav: {
        height: 80,
        paddingTop: 20,
        paddingBottom: 20
      },
      back: {
        left: 35,
        backgroundImage: `url(${back})`,
        position: 'absolute',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        width: 102,
        height: 82,
        zIndex: 2
      },
      line: {
        marginTop: 102,
        height: 5,
        background: 'linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,0.5),rgba(255,255,255,0))',
        borderTopColor: '#fff'
      }
    };
    return (
      <div style={styles.container}>
        <div style={styles.nav}>
          <div><a style={styles.back}></a></div>
          <div style={styles.line}></div>
        </div>
        <MessageShow messages={message} />
        <ReportShow report={report} />
      </div>
    );
  }
}

export default ReportDetailContainer;