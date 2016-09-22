import MessageShow from './MessageShow';
import ReportShow from './ReportShow';
import containerBackground from './img/background1.svg';
// import example from './img/example.jpg';
import Header from './../common/Header';
import config from '../../config';

import { hashHistory } from 'react-router';
class ReportDetailContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleChangeScroll1 = this.handleChangeScroll1.bind(this);
    this.handleChangeScrollUp = this.handleChangeScrollUp.bind(this);
    this.handleChangeScrollDown = this.handleChangeScrollDown.bind(this);
    this.handleChangeScroll2 = this.handleChangeScroll2.bind(this);
    this.handleGoItemReport = this.handleGoItemReport.bind(this);
    this.state = {
      aaStyle: {},
      message: {
        checkTime: '',
        location: '',
        normal: 0,
        warning: 0,
        danger: 0,
        imgs: [],
        values: []
      }
    };
  }
  componentWillMount() {
    const reportId = this.props.location.state.id;
    if (!reportId) {
      return;
    }
    fetch(`${config.apiPrefix}/reports/${reportId}`)
      .then(response => {
        if (response.status === 200) {
          return response.json();
        }
        throw new Error;
      })
      .then(json => {
        if (json.retCode === 0) {
          this.setState({
            message: json.data
          });
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
    // $('#scroll').scroll(() => {
    //   const scroH = $('#scroll').scrollTop();
    //   // console.log(scroH);
    //   if (scroH >= Math.floor(lib.flexible.rem * 7.8)) {
    //     this.setState({
    //       aaStyle: {
    //         overflowY: 'auto',
    //         WebkitOverflowScrolling: 'touch'
    //       }
    //     });
    //   } else if (scroH < Math.floor(lib.flexible.rem * 7.8)) {
    //     this.setState({
    //       aaStyle: {
    //         overflowY: 'hidden'
    //       }
    //     });
    //   }
    // });
  }
  handleChangeScroll1() {
    $('#scroll').css({
      overflowY: 'scroll',
      WebkitOverflowScrolling: 'touch'
    });
    const t = $('#scroll').scrollTop();
    $('#scroll').animate({ scrollTop: t - 2 }, 100);
  }

  fx( fn , begin , end ){

  //  渐出特效
  this.easeOut = (t,b,c,d) =>{
    return -c *(t /= d)*(t-2) + b;
  }

  let options = arguments[3] || {};
  let duration = options.duration || 500;
  let ease = options.ease || this.easeOut;

  let startTime = new Date().getTime();
    this.respon = ()=>{
      let timestamp = new Date().getTime() - startTime;
      fn( ease( timestamp,begin, ( end - begin),duration) , 'step' );

      if(duration <= timestamp){
        fn( end , 'end' );
      }else{
        setTimeout(this.respon,20);
      }
    }
  (() =>{
    setTimeout(this.respon,20)
  })();
}

  handleChangeScrollUp() {
      var start = $('#scroll').scrollTop();
      this.fx( function(now){
        $('#scroll').scrollTop(now);
      },start,lib.flexible.rem * 7.8);
  }
  handleChangeScrollDown() {
    var start = $('#scroll').scrollTop();
    this.fx( function(now){
      $('#scroll').scrollTop(now);
    },start,0);
  }
  handleChangeScroll2() {
    $('#scroll').css({
      overflowY: 'hidden'
    });
  }
  handleGoItemReport(leftIndex, rightIndex) {
    hashHistory.push({
      pathname: '/item-report',
      state: this.state.message.values[leftIndex].items[rightIndex]
    });
  }
  render() {
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
        overflowY: 'auto',
        WebkitOverflowScrolling: 'touch'
      }
    };
    return (
      <div>
        <div style={styles.container}>
          <Header headerType="1" />
          <div style={styles.scrollBox} id="scroll">
            <MessageShow
                messages={this.state.message}
                changeScrollUp={this.handleChangeScrollUp}
                changeScrollDown={this.handleChangeScrollDown}
            />
            <ReportShow
              messages={this.state.message}
              scrollStyle={this.state.aaStyle}
              changeScroll1={this.handleChangeScroll1}
              changeScrollUp={this.handleChangeScrollUp}
              changeScrollDown={this.handleChangeScrollDown}
              changeScroll2={this.handleChangeScroll2}
              handleGoItemReport={this.handleGoItemReport}
            />
          </div>
        </div>
        {this.props.children}
      </div>

    );
  }
}
ReportDetailContainer.propTypes = {
  location: React.PropTypes.object,
  children: React.PropTypes.element
};
export default ReportDetailContainer;