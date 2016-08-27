import MessageShow from './MessageShow';
import ReportShow from './ReportShow';
import containerBackground from './img/background1.svg';
// import example from './img/example.jpg';
import Header from './../common/Header';
import config from '../../config';

class ReportDetailContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleChangeScroll1 = this.handleChangeScroll1.bind(this);
    this.handleChangeScroll2 = this.handleChangeScroll2.bind(this);
    this.state = {
      aaStyle: {},
      message: {}
    };
    fetch(`${config.apiPrefix}/reports/${321}`) // 321 341 366
    .then(response => {
      if (response.status === 200) {
        return response.json();
      }
      throw new Error;
    })
    .then(json => {
      if (json.retCode === 0) {
        this.setState = {
          message: json.data
        };
      } else {
        alert('请求出错！');
      }
    })
    .catch(error => {
      alert('出错啦！');
      console.log(error);
    });
  }
  componentDidMount() {
    $(() => {
      $('#scroll').scroll(() => {
        const scroH = $('#scroll').scrollTop();
        // console.log(scroH);
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
    const t = $('#scroll').scrollTop();
    $('#scroll').animate({ scrollTop: t - 2 }, 100);
  }
  handleChangeScroll2() {
    $('#scroll').css({
      overflowY: 'hidden'
    });
  }
  render() {
    // const message = {
    //   location: '中日协和医院',
    //   date: '2016-10-20 11:22:45',
    //   normal: 2,
    //   warning: 1,
    //   danger: 0,
    //   image: [example, example, example, example, example, example,
    //   example, example, example, example, example, example, example, example,
    //   example, example, example, example, example, example, example, example,
    //   example, example, example, example, example, example, example, example,
    //   example, example, example, example, example, example, example, example],
    //   values: [
    //     { classify: '血常规', items: [{name: '氨基酸的检查'}, {name: '2氨基酸的检查'}, {name: '3氨基酸的检查'}] },
    //     { classify: '血生化', items: [{name: '红细胞数'}, {name: '淋巴细胞绝对值'}, {name: '1中间细胞绝对值'}] },
    //     { classify: '血免疫', items: [{name: '1红细胞数'}, {name: '4淋巴细胞绝对值'}, {name: '3中间细胞绝对值'}] },
    //     { classify: '尿二项', items: [{name: '2红细胞数'}, {name: '淋4巴细胞绝对值'}, {name: '157中间细胞绝对值'}] },
    //     { classify: '血常规', items: [{name: '3红细胞数'}, {name: '淋44巴细胞绝对值'}, {name: '1456中间细胞绝对值'}] },
    //     { classify: '血生化', items: [{name: '4红细胞数'}, {name: '淋巴4细胞绝对值'}, {name: '1中745间细胞绝对值'}] },
    //     { classify: '血免疫', items: [{name: '5红细胞数'}, {name: '淋巴细5胞绝对值'}, {name: '1中间5细胞绝对值'}] },
    //     { classify: '血常规', items: [{name: '6红细胞数'}, {name: '淋巴细胞65绝对值'}, {name: '1中间54细胞绝对值'}] },
    //     { classify: '血生化', items: [{name: '7红细胞数'}, {name: '淋巴细胞6655绝对值'}, {name: '1中间63细胞绝对值'}] },
    //     { classify: '血免疫', items: [{name: '8红细胞数'}, {name: '淋巴细胞绝6对值'}, {name: '1中间细胞绝342对值'}] },
    //     { classify: '血常规', items: [{name: '9红细胞数'}, {name: '淋巴细胞绝656对值'}, {name: '1中间细胞绝65对值'}] },
    //     { classify: '血生化', items: [{name: '0红细胞数'}, {name: '淋巴细胞6绝对值'}, {name: '1中间细胞绝对值'}] },
    //     { classify: '血免疫', items: [{name: '4红细胞数'}, {name: '淋巴细胞65绝对值'}, {name: '1中间细67胞绝对值'}] },
    //     { classify: '血常规', items: [{name: '3红细胞数'}, {name: '淋巴细胞65绝对值'}, {name: '1中间细胞898绝对值'}] },
    //     { classify: '血生化', items: [{name: '4红细胞数'}, {name: '淋巴细胞653绝对值'}, {name: '1中间细胞6绝对值'}] },
    //     { classify: '血免疫', items: [{name: '34红细胞数'}, {name: '淋巴细胞6绝对值'}, {name: '1中间细76胞绝对值'}] },
    //     { classify: '血常规', items: [{name: '红4细胞数'}, {name: '淋巴细胞绝322对值'}, {name: '1中间细胞67绝对值'}] },
    //     { classify: '血生化', items: [{name: '红4细胞数'}, {name: '淋巴细胞绝643对值'}, {name: '1中间967细胞绝对值'}] },
    //     { classify: '血免疫', items: [{name: '红454细胞数'}, {name: '淋巴细胞绝43对值'}, {name: '1中间897细胞绝对值'}] },
    //     { classify: '血常规', items: [{name: '红5细胞数'}, {name: '淋巴细胞绝对43值'}, {name: '1中间细胞绝87对值'}] },
    //     { classify: '血生化', items: [{name: '红细454胞数'}, {name: '3淋巴细胞绝对值'}, {name: '1中间细胞绝7对值'}] },
    //     { classify: '血免疫', items: [{name: '红细胞55数'}, {name: '6淋巴细胞绝对值'}, {name: '1中间细胞绝66对值'}] }
    //   ]
    // };
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
        overflowY: 'scroll',
        WebkitOverflowScrolling: 'touch'
      }
    };
    return (
      <div>
        <div style={styles.container}>
          <Header headerType="1" />
          <div style={styles.scrollBox} id="scroll">
            <MessageShow messages={this.state.message} />
            <ReportShow
              values={this.state.message.values}
              scrollStyle={this.state.aaStyle}
              image={this.state.message.image}
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