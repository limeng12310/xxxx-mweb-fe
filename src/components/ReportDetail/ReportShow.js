import bottomBackground from './img/background2.2.svg';
import config from '../../config';

class ReportShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isChoosen: 0,
      imgsNew: []
    };
    this.clickChange = this.clickChange.bind(this);
    this.setTab1 = this.setTab1.bind(this);
    this.setTab2 = this.setTab2.bind(this);
    this.clickPreview = this.clickPreview.bind(this);
    this.goItemReport = this.goItemReport.bind(this);
  }

  componentDidMount() {
    let touchStartTop = 0;
    let isCollaps = false;
    // TAB标签事件监听
    $('#scrollBox').on('touchstart', e => {
      $('#scroll').removeClass('domMoveAnimition');
      isCollaps = !(parseFloat($('#scroll').css('transform').slice(11).slice(0, -4)) >= 1.22);
      touchStartTop = e.changedTouches[0].screenY;
    });
    $('#scrollBox').on('touchmove', e => {
      e.preventDefault();
      const touchNowDis = e.changedTouches[0].screenY - touchStartTop;
      const moveDistence = lib.flexible.px2rem(touchNowDis);
      const marginTopNow = parseFloat($('#scroll').css('transform').slice(11).slice(0, -4));
      if (marginTopNow >= 1.22 && touchNowDis > 0) {
        touchStartTop = e.changedTouches[0].screenY;
        return;
      }
      if (marginTopNow <= -6.58 && touchNowDis < 0) {
        touchStartTop = e.changedTouches[0].screenY;
        return;
      }
      this.props.handleDomMove(moveDistence, isCollaps);
    });
    $('#scrollBox').on('touchend', e => {
      $('#scroll').addClass('domMoveAnimition');
      const touchNowDis = e.changedTouches[0].screenY - touchStartTop;
      if (touchNowDis > 0) {
        this.props.changeScrollDown();
      } else if (touchNowDis < 0) {
        this.props.changeScrollUp();
      }
    });
  }

  componentDidUpdate() {
    const leftSelectContent = this.refs.leftSelectContent;
    const rightSelectContent = this.refs.rightSelectContent;
    const leftSelectOffsetArr = [];
    const rightSelectOffsetArr = [];
    let isCollaps = false;
    let touchStartTop = 0;
    const leftSelectEles = $(leftSelectContent).find('li');
    const rightSelectEles = $('.categoryContent');
    for (let i = 0; i < leftSelectEles.length; i++) {
      leftSelectOffsetArr.push(leftSelectEles[i].offsetTop - lib.flexible.rem * 1);
    }
    const contentHeight = $(window).height() - lib.flexible.rem * 2.2;
    for (let i = 0; i < rightSelectEles.length; i++) {
      rightSelectOffsetArr.push(rightSelectEles[i].offsetTop - lib.flexible.rem * 1);
    }
    console.log(rightSelectOffsetArr);
    $(leftSelectContent).find('li').eq(0).addClass('leftSelect');
    $(rightSelectContent).scroll(() => {
      const top = $(rightSelectContent).scrollTop();
      for (let i = 1; i <= rightSelectOffsetArr.length; i++) {
        if (top >= rightSelectOffsetArr[i - 1] && top < rightSelectOffsetArr[i]) {
          $(leftSelectContent).find('li').removeClass('leftSelect');
          $(leftSelectContent).find('li').eq(i - 1).addClass('leftSelect');
          if ($('#rightSelectContent').hasClass('stopScrollMove')) {
            return;
          }
          if ($(leftSelectContent).scrollTop() > leftSelectOffsetArr[i - 1]) {
            const end = leftSelectOffsetArr[i - 1];
            const start = $(leftSelectContent).scrollTop();
            this.fx(now => {
              $(leftSelectContent).scrollTop(now);
            }, start, end);
          } else if (leftSelectOffsetArr[i - 1] - $(leftSelectContent).scrollTop() > contentHeight -
            lib.flexible.rem * 2) {
            const end = $(leftSelectContent).scrollTop() + lib.flexible.rem * 3;
            const start = $(leftSelectContent).scrollTop();
            this.fx(now => {
              $(leftSelectContent).scrollTop(now);
            }, start, end);
          }
          return;
        }
      }
    });

    // 文字报告事件监听
    // 左侧
    $(leftSelectContent).on('touchstart', e => {
      $('#scroll').removeClass('domMoveAnimition');
      isCollaps = !(parseFloat($('#scroll').css('transform').slice(11).slice(0, -4)) >= 1.22);
      touchStartTop = e.changedTouches[0].screenY;
    });
    $(leftSelectContent).on('touchmove', e => {
      const touchNowDis = e.changedTouches[0].screenY - touchStartTop;
      if (isCollaps === true && $(leftSelectContent).scrollTop() <= 0) {
        if (touchNowDis > 0) {
          e.preventDefault();
          const moveDistence = lib.flexible.px2rem(touchNowDis);
          const marginTopNow = parseFloat($('#scroll').css('transform').slice(11).slice(0, -4));
          if (marginTopNow >= 1.22 && touchNowDis > 0) {
            touchStartTop = e.changedTouches[0].screenY;
            return;
          }
          if (marginTopNow <= -6.58 && touchNowDis < 0) {
            touchStartTop = e.changedTouches[0].screenY;
            return;
          }
          this.props.handleDomMove(moveDistence, isCollaps);
        }
        return;
      } else if (touchNowDis < 0 && isCollaps === false) {
        e.preventDefault();
        const moveDistence = lib.flexible.px2rem(touchNowDis);
        const marginTopNow = parseFloat($('#scroll').css('transform').slice(11).slice(0, -4));
        if (marginTopNow >= 1.22 && touchNowDis > 0) {
          touchStartTop = e.changedTouches[0].screenY;
          return;
        }
        if (marginTopNow <= -6.58 && touchNowDis < 0) {
          touchStartTop = e.changedTouches[0].screenY;
          return;
        }
        this.props.handleDomMove(moveDistence, isCollaps);
      }
    });
    $(leftSelectContent).on('touchend', e => {
      $('#scroll').addClass('domMoveAnimition');
      if (isCollaps === true && $(leftSelectContent).scrollTop() > 0) {
        return;
      }
      const touchNowDis = e.changedTouches[0].screenY - touchStartTop;
      if (touchNowDis > 0) {
        this.props.changeScrollDown();
      } else if (touchNowDis < 0) {
        this.props.changeScrollUp();
      }
    });

    // 右侧
    $(rightSelectContent).on('touchstart', e => {
      if ($('#rightSelectContent').hasClass('stopScrollMove')) {
        $('#rightSelectContent').removeClass('stopScrollMove');
      }
      $('#scroll').removeClass('domMoveAnimition');
      isCollaps = !(parseFloat($('#scroll').css('transform').slice(11).slice(0, -4)) >= 1.22);
      touchStartTop = e.changedTouches[0].screenY;
    });
    $(rightSelectContent).on('touchmove', e => {
      const touchNowDis = e.changedTouches[0].screenY - touchStartTop;
      if (isCollaps === true && $(rightSelectContent).scrollTop() <= 0) {
        if (touchNowDis > 0) {
          e.preventDefault();
          const moveDistence = lib.flexible.px2rem(touchNowDis);
          const marginTopNow = parseFloat($('#scroll').css('transform').slice(11).slice(0, -4));
          if (marginTopNow >= 1.22 && touchNowDis > 0) {
            touchStartTop = e.changedTouches[0].screenY;
            return;
          }
          if (marginTopNow <= -6.58 && touchNowDis < 0) {
            touchStartTop = e.changedTouches[0].screenY;
            return;
          }
          this.props.handleDomMove(moveDistence, isCollaps);
        }
        return;
      } else if (touchNowDis < 0 && isCollaps === false) {
        e.preventDefault();
        const moveDistence = lib.flexible.px2rem(touchNowDis);
        const marginTopNow = parseFloat($('#scroll').css('transform').slice(11).slice(0, -4));
        if (marginTopNow >= 1.22 && touchNowDis > 0) {
          touchStartTop = e.changedTouches[0].screenY;
          return;
        }
        if (marginTopNow <= -6.58 && touchNowDis < 0) {
          touchStartTop = e.changedTouches[0].screenY;
          return;
        }
        this.props.handleDomMove(moveDistence, isCollaps);
      }
    });
    $(rightSelectContent).on('touchend', e => {
      $('#scroll').addClass('domMoveAnimition');
      if (isCollaps === true && $(rightSelectContent).scrollTop() > 0) {
        return;
      }
      const touchNowDis = e.changedTouches[0].screenY - touchStartTop;
      if (touchNowDis > 0) {
        this.props.changeScrollDown();
      } else if (touchNowDis < 0) {
        this.props.changeScrollUp();
      }
    });

    // 图片报告事件监听
    $('#imageScroll').on('touchstart', e => {
      $('#scroll').removeClass('domMoveAnimition');
      isCollaps = !(parseFloat($('#scroll').css('transform').slice(11).slice(0, -4)) >= 1.22);
      touchStartTop = e.changedTouches[0].screenY;
    });
    $('#imageScroll').on('touchmove', e => {
      const touchNowDis = e.changedTouches[0].screenY - touchStartTop;
      if (isCollaps === true && $('#imageScroll').scrollTop() <= 0) {
        if (touchNowDis > 0) {
          e.preventDefault();
          const moveDistence = lib.flexible.px2rem(touchNowDis);
          const marginTopNow = parseFloat($('#scroll').css('transform').slice(11).slice(0, -4));
          if (marginTopNow >= 1.22 && touchNowDis > 0) {
            touchStartTop = e.changedTouches[0].screenY;
            return;
          }
          if (marginTopNow <= -6.58 && touchNowDis < 0) {
            touchStartTop = e.changedTouches[0].screenY;
            return;
          }
          this.props.handleDomMove(moveDistence, isCollaps);
        }
        return;
      } else if (touchNowDis < 0 && isCollaps === false) {
        e.preventDefault();
        const moveDistence = lib.flexible.px2rem(touchNowDis);
        const marginTopNow = parseFloat($('#scroll').css('transform').slice(11).slice(0, -4));
        if (marginTopNow >= 1.22 && touchNowDis > 0) {
          touchStartTop = e.changedTouches[0].screenY;
          return;
        }
        if (marginTopNow <= -6.58 && touchNowDis < 0) {
          touchStartTop = e.changedTouches[0].screenY;
          return;
        }
        this.props.handleDomMove(moveDistence, isCollaps);
      }
    });
    $('#imageScroll').on('touchend', e => {
      $('#scroll').addClass('domMoveAnimition');
      if (isCollaps === true && $('#imageScroll').scrollTop() > 0) {
        return;
      }
      const touchNowDis = e.changedTouches[0].screenY - touchStartTop;
      if (touchNowDis > 0) {
        this.props.changeScrollDown();
      } else if (touchNowDis < 0) {
        this.props.changeScrollUp();
      }
    });
  }

  setTab1() {
    $('#report').css({
      width: '100%'
    });
    $('#image').css({
      width: 0
    });
    $('#tabName1').css({
      filter: 'alpha(opacity=100)',
      MozOpacity: 1,
      opacity: 1
    });
    $('#tabName2').css({
      filter: 'alpha(opacity=60)',
      MozOpacity: 0.6,
      opacity: 0.6
    });
  }

  setTab2() {
    $('#image').css({
      width: '100%'
    });
    $('#report').css({
      width: 0
    });
    $('#tabName1').css({
      filter: 'alpha(opacity=60)',
      MozOpacity: 0.6,
      opacity: 0.6
    });
    $('#tabName2').css({
      filter: 'alpha(opacity=100)',
      MozOpacity: 1,
      opacity: 1
    });
  }

  fx(fn, begin, end) {
    //  渐出特效
    this.easeOut = (t, b, c, d) => {
      let e = t;
      return -c * (e /= d) * (e - 2) + b;
    };
    const duration = 400;
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

  clickChange(e) {
    const rightSelectOffsetArr = [];
    const rightSelectEles = $('.categoryContent');
    for (let i = 0; i < rightSelectEles.length; i++) {
      rightSelectOffsetArr.push(rightSelectEles[i].offsetTop - lib.flexible.rem * 1);
    }
    const end = rightSelectOffsetArr[e.target.getAttribute('data-index') - 0] + 10;
    const start = $('#rightSelectContent').scrollTop();
    $('#rightSelectContent').addClass('stopScrollMove');
    this.fx(now => {
      $('#rightSelectContent').scrollTop(now);
    }, start, end);
  }

  clickPreview(e) {
    if (CORDOVA_ENV === 'false') {
      wx.previewImage({
        current: e.target.getAttribute('data-url'), // 当前显示图片的http链接
        urls: this.props.messages.imgs.map(img => `${config.cdnPrefix}/${img}`) // 需要预览的图片http链接列表
      });
    } else {
      const dataUrl = e.target.getAttribute('data-url');
      // const base64 = dataUrl.split(',')[1];
      // const type = dataUrl.split(';')[0].split('/')[1];
      FullScreenImage.showImageURL(dataUrl);
    }
  }

  goItemReport(e) {
    this.props.handleGoItemReport(parseInt(e.target.getAttribute('data-leftIndex'), 10),
      parseInt(e.target.getAttribute('data-rightIndex'), 10));
  }

  render() {
    const styles = {
      nav: {
        display: 'flex',
        fontSize: '0.533333rem',
        height: '0.94rem',
        paddingTop: '0.1rem'
      },
      activeMenu: {
        fontSize: '0.666667rem',
        color: '#fff',
        width: '50%',
        textAlign: 'center'
      },
      inactiveMenu: {
        fontSize: '0.666667rem',
        color: '#fff',
        filter: 'alpha(opacity=60)',
        MozOpacity: 0.6,
        opacity: 0.6,
        width: '50%',
        textAlign: 'center'
      },
      boxOut1: {
        width: '100%',
        backgroundImage: `url(${bottomBackground})`,
        minHeight: 'calc(100% - 7.8rem - 0.94rem)',
        // 图片自适应屏幕大小
        position: 'absolute',
        backgroundSize: 'cover',
        display: 'flex',
        justifyContent: 'center',
        backgroundRepeat: 'no-repeat',
        overflowY: 'hidden',
        WebkitOverflowScrolling: 'touch',
        height: 'calc(100% - 0.92rem)'
      },
      boxOut2: {
        width: 0,
        backgroundImage: `url(${bottomBackground})`,
        minHeight: 'calc(100% - 7.8rem - 0.94rem)',
        // 图片自适应屏幕大小
        position: 'absolute',
        backgroundSize: 'cover',
        display: 'flex',
        justifyContent: 'center',
        backgroundRepeat: 'no-repeat',
        overflowY: 'hidden',
        WebkitOverflowScrolling: 'touch',
        height: 'calc(100% - 0.92rem)'
      },
      box: {
        width: '100%',
        minHeight: 'calc(100% - 7.8rem - 0.94rem)',
        paddingTop: '1rem',
        display: 'flex',
        justifyContent: 'center',
        overflowY: 'hidden',
        WebkitOverflowScrolling: 'touch',
        height: 'calc(100% - 8.1rem)'
      },
      imgBox: {
        width: '100%',
        minHeight: 'calc(100% - 7.8rem - 0.94rem)',
        paddingTop: '1rem',
        display: 'flex',
        justifyContent: 'center',
        overflowY: 'auto',
        WebkitOverflowScrolling: 'touch',
        height: 'calc(100% - 8.1rem)'
      },
      leftBox: {
        width: '30%',
        marginLeft: '1.2rem',
        fontSize: '0.533333rem',
        color: '#9C9C9C',
        listStyle: 'none',
        overflowY: 'auto',
        height: '100%'
      },
      rightBox: {
        width: '70%',
        fontSize: '0.533333rem',
        color: '#9C9C9C',
        listStyle: 'none',
        marginLeft: '0.8rem',
        overflowY: 'auto',
        height: '100%'
      },
      leftList: {
        marginBottom: '0.8rem'
      },
      rightList: {
        marginBottom: '0.7rem'
      },
      allImage: {
        minHeight: '6.40625rem',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'between',
        alignContent: 'flex-start',
        margin: '0 1.4rem'
      },
      img: {
        position: 'relative',
        margin: '0.2rem 0.4rem',
        width: '1.573333rem',
        height: '1.573333rem',
        borderWidth: '0.03125rem',
        borderStyle: 'solid',
        borderColor: '#D7D7D7',
        borderRadius: '0.178125rem',
        backgroundPosition: 'center',
        backgroundSize: 'cover'
      }
    };
    let reportScrollBox;
    let imageScrollBox;
    if (this.props.messages.values.length !== 0) {
      reportScrollBox = (
        <div style={Object.assign({}, styles.box, this.props.scrollStyle)} id="reportScroll">
          <ul style={styles.leftBox} ref="leftSelectContent" id="leftSelectContent">
            {
              this.props.messages.values.map((item, i) => {
                const circleBorder = {};
                // if (this.state.isChoosen === i) {
                //  circleBorder = {
                //    borderWidth: '0.026667rem',
                //    borderStyle: 'solid',
                //    borderRadius: '0.266667rem',
                //    display: 'table'
                //  };
                // }
                return (
                  <li
                    key={i}
                    data-index={i}
                    style={Object.assign({}, styles.leftList, circleBorder)}
                    onTouchTap={this.clickChange}
                  >
                    {item.classify}
                  </li>
                );
              })
            }
          </ul>
          <ul style={styles.rightBox} ref="rightSelectContent" id="rightSelectContent">
            {
              this.props.messages.values.map((firstItem, i) => {
                return (
                  <div className="categoryContent">
                    {
                      this.props.messages.values[i].items.map((item, j) => (
                        <li
                          data-rightIndex={j}
                          data-leftIndex={i}
                          key={j}
                          style={styles.rightList}
                          onTouchTap={this.goItemReport}
                        >{item.name}</li>
                      ))
                    }
                    <div className="weightLineBlack"></div>
                  </div>
                );
              })

            }
            <div className="categoryContent" style={{height: 'calc(100% - 1.3rem)'}}>
            </div>
          </ul>
        </div>
      );
    } else {
      reportScrollBox = (
        <div style={Object.assign({}, styles.box, this.props.scrollStyle)} id="reportScroll">
          <ul style={styles.leftBox} ref="leftSelectContent"></ul>
          <ul style={styles.rightBox} ref="rightSelectContent"></ul>
        </div>
      );
    }
    imageScrollBox = (          // eslint-disable-line
      <div style={Object.assign({}, styles.imgBox, this.props.scrollStyle)} id="imageScroll">
        <div style={styles.allImage}>
          {
            this.props.messages.imgs.map((imgId, i) => {
              const background = {
                backgroundImage: `url(${config.cdnPrefix}/${imgId})`
              };
              return (
                <div
                  data-url={`${config.cdnPrefix}/${imgId}`}
                  key={i}
                  style={Object.assign({}, styles.img, background)}
                  onTouchTap={this.clickPreview}
                >
                </div>
              );
            })
          }
        </div>
      </div>
    );
    return (
      <div>
        <div style={styles.nav} id="scrollBox">
          <div style={styles.activeMenu} onTouchTap={this.setTab1} id="tabName1">看报告</div>
          <div style={styles.inactiveMenu} onTouchTap={this.setTab2} id="tabName2">看图片</div>
        </div>
        <div style={styles.boxOut1} id="report">
          {reportScrollBox}
        </div>
        <div style={styles.boxOut2} id="image">
          {imageScrollBox}
        </div>
      </div>
    );
  }
}

ReportShow.propTypes = {
  messages: React.PropTypes.object,
  scrollStyle: React.PropTypes.object,
  changeScrollUp: React.PropTypes.func.isRequired,
  changeScrollDown: React.PropTypes.func.isRequired,
  handleDomMove: React.PropTypes.func.isRequired,
  handleGoItemReport: React.PropTypes.func
};

export default ReportShow;