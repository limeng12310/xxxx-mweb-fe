import MessageShow from './MessageShow';
import ReportShow from './ReportShow';
import containerBackground from './img/background1.svg';
// import example from './img/example.jpg';
import Header from './../common/Header';
import config from '../../config';

import {hashHistory} from 'react-router';
class ReportDetailContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleChangeScrollUp = this.handleChangeScrollUp.bind(this);
    this.handleChangeScrollDown = this.handleChangeScrollDown.bind(this);
    this.handleDomMove = this.handleDomMove.bind(this);
    this.handleGoItemReport = this.handleGoItemReport.bind(this);
    this.state = {
      aaStyle: {},
      location: '',
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
    this.setState({
      location: this.props.location.state.location
    });
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
    // $('body').on('touchmove', e => {
    //     console.log(e);
    //     console.log($('#scroll'));
    //     e.preventDefault();
    // })
  }

  fx(fn, begin, end) {
    //  渐出特效
    this.easeOut = (t, b, c, d) => {
      let e = t;
      return -c * (e /= d) * (e - 2) + b;
    };

    const duration = 500;
    const ease = this.easeOut;

    const startTime = new Date().getTime();
    this.respon = () => {
      const timestamp = new Date().getTime() - startTime;
      fn(ease(timestamp, begin, (end - begin), duration), 'step');

      if (duration <= timestamp) {
        fn(end, 'end');
      } else {
        setTimeout(this.respon, 20);
      }
    };
    (() => {
      setTimeout(this.respon, 20);
    })();
  }

  handleChangeScrollUp() {
    $('#scroll').css('margin-top', '-6.58rem');
  }

  handleChangeScrollDown() {
    $('#scroll').css('margin-top', '1.22rem');
  }

  handleDomMove(distent, isCollaps) {
    const marginNow = isCollaps ? -6.58 : 1.22;
    $('#scroll').css('margin-top', `${(marginNow + distent)}rem`);
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
        backgroundSize: 'cover',
        overflowY: 'hidden'
      },
      scrollBox: {
        position: 'absolute',
        width: '100%',
        height: 'calc(100% - 1.22rem + 7.8rem)',
        marginTop: '1.22rem',
        overflowY: 'hidden',
        WebkitOverflowScrolling: 'touch'
      }
    };
    return (
      <div>
        <div style={styles.container}>
          <Header headerType="1" />
          <div style={styles.scrollBox} id="scroll" className="domMoveAnimition">
            <MessageShow
              messages={this.state.message}
              location={this.state.location}
              changeScrollUp={this.handleChangeScrollUp}
              changeScrollDown={this.handleChangeScrollDown}
              handleDomMove={this.handleDomMove}
            />
            <ReportShow
              messages={this.state.message}
              scrollStyle={this.state.aaStyle}
              changeScrollUp={this.handleChangeScrollUp}
              changeScrollDown={this.handleChangeScrollDown}
              handleDomMove={this.handleDomMove}
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