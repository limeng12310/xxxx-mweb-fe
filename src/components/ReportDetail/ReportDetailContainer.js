import MessageShow from './MessageShow';
import ReportShow from './ReportShow';
import containerBackground from './img/background1.svg';
import example from './img/example.jpg';
import Header from './../common/Header';

class ReportDetailContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleChangeScroll1 = this.handleChangeScroll1.bind(this);
    this.handleChangeScroll2 = this.handleChangeScroll2.bind(this);
    this.state = {
      aaStyle: {}
    };
  }
  componentDidMount() {
    $(() => {
      $('#scroll').scroll(() => {
        const scroH = $('#scroll').scrollTop();
        console.log(scroH);
        if (scroH >= Math.floor(lib.flexible.rem * 7.8)) {
          this.setState({
            aaStyle: {
              overflowY: 'scroll'
            }
          });
        } else if (scroH < Math.floor(lib.flexible.rem * 7.8)) {
          this.setState({
            aaStyle: {
              overflowY: 'hidden'
            }
          });
        }
      });
    });
  }
  handleChangeScroll1() {
    $('#scroll').css({
      overflowY: 'scroll'
    });
  }
  handleChangeScroll2() {
    $('#scroll').css({
      overflowY: 'hidden'
    });
  }
  render() {
    const message = {
      location: '中日协和医院',
      date: '2016-10-20',
      // description: '挂号难 排队长 不是特别舒服',
      isNormal: '正常'
    };
    const report = [
      { name: '血常规', items: ['红细胞数', '淋巴细胞绝对值', '中间细胞绝对值', '粒细胞绝对值', '淋巴细胞百分比'] },
      { name: '血生化', items: ['fkaldkf', '1淋巴细胞绝对值', '1中间细胞绝对值', '1粒细胞绝对值', '1淋巴细胞百分比'] },
      { name: '血免疫', items: ['2红细胞数', '2淋巴细胞绝对值', '2中间细胞绝对值', '2粒细胞绝对值', '2淋巴细胞百分比'] },
      { name: '尿二项', items: ['3红细胞数', '3淋巴细胞绝对值', '3中间细胞绝对值', '3粒细胞绝对值', '3淋巴细胞百分比'] },
      { name: '血常规', items: ['红细胞数', '淋巴细胞绝对值', '中间细胞绝对值', '粒细胞绝对值', '淋巴细胞百分比'] },
      { name: '血生化', items: ['fkaldkf', '1淋巴细胞绝对值', '1中间细胞绝对值', '1粒细胞绝对值', '1淋巴细胞百分比'] },
      { name: '血免疫', items: ['2红细胞数', '2淋巴细胞绝对值', '2中间细胞绝对值', '2粒细胞绝对值', '2淋巴细胞百分比'] },
      { name: '血常规', items: ['红细胞数', '淋巴细胞绝对值', '中间细胞绝对值', '粒细胞绝对值', '淋巴细胞百分比'] },
      { name: '血生化', items: ['fkaldkf', '1淋巴细胞绝对值', '1中间细胞绝对值', '1粒细胞绝对值', '1淋巴细胞百分比'] },
      { name: '血免疫', items: ['2红细胞数', '2淋巴细胞绝对值', '2中间细胞绝对值', '2粒细胞绝对值', '2淋巴细胞百分比'] },
      { name: '血常规', items: ['红细胞数', '淋巴细胞绝对值', '中间细胞绝对值', '粒细胞绝对值', '淋巴细胞百分比'] },
      { name: '血生化', items: ['fkaldkf', '1淋巴细胞绝对值', '1中间细胞绝对值', '1粒细胞绝对值', '1淋巴细胞百分比'] },
      { name: '血免疫', items: ['2红细胞数', '2淋巴细胞绝对值', '2中间细胞绝对值', '2粒细胞绝对值', '2淋巴细胞百分比'] },
      { name: '血常规', items: ['红细胞数', '淋巴细胞绝对值', '中间细胞绝对值', '粒细胞绝对值', '淋巴细胞百分比'] },
      { name: '血生化', items: ['fkaldkf', '1淋巴细胞绝对值', '1中间细胞绝对值', '1粒细胞绝对值', '1淋巴细胞百分比'] },
      { name: '血免疫', items: ['2红细胞数', '2淋巴细胞绝对值', '2中间细胞绝对值', '2粒细胞绝对值', '2淋巴细胞百分比'] },
      { name: '血常规', items: ['红细胞数', '淋巴细胞绝对值', '中间细胞绝对值', '粒细胞绝对值', '淋巴细胞百分比'] },
      { name: '血生化', items: ['fkaldkf', '1淋巴细胞绝对值', '1中间细胞绝对值', '1粒细胞绝对值', '1淋巴细胞百分比'] },
      { name: '血免疫', items: ['2红细胞数', '2淋巴细胞绝对值', '2中间细胞绝对值', '2粒细胞绝对值', '2淋巴细胞百分比'] },
      { name: '血常规', items: ['红细胞数', '淋巴细胞绝对值', '中间细胞绝对值', '粒细胞绝对值', '淋巴细胞百分比'] },
      { name: '血生化', items: ['fkaldkf', '1淋巴细胞绝对值', '1中间细胞绝对值', '1粒细胞绝对值', '1淋巴细胞百分比'] },
      { name: '血免疫', items: ['2红细胞数', '2淋巴细胞绝对值', '2中间细胞绝对值', '2粒细胞绝对值', '2淋巴细胞百分比'] }
    ];
    const image = [example, example, example, example, example, example,
      example, example, example, example, example, example, example, example,
      example, example, example, example, example, example, example, example,
      example, example, example, example, example, example, example, example,
      example, example, example, example, example, example, example, example];
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
      scrollBox: {
        position: 'absolute',
        width: '100%',
        height: 'calc(100% - 1.22rem)',
        marginTop: '1.22rem',
        overflowY: 'scroll'
      }
    };
    return (
      <div>
        <div style={styles.container}>
          <Header headerType="1" />
          <div style={styles.scrollBox} id="scroll">
            <MessageShow messages={message} />
            <ReportShow
              report={report}
              scrollStyle={this.state.aaStyle}
              image={image}
              changeScroll1={this.handleChangeScroll1}
              changeScroll2={this.handleChangeScroll2}
            />
          </div>
        </div>
      </div>

    );
  }
}

export default ReportDetailContainer;