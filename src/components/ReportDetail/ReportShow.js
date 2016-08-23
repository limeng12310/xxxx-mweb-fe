import bottomBackground from './img/background2.2.svg';

class ReportShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isChoosen: 0,
      tabChoosen: 1
    };
    this.clickChange = this.clickChange.bind(this);
    this.setTab1 = this.setTab1.bind(this);
    this.setTab2 = this.setTab2.bind(this);
    this.clickPreview = this.clickPreview.bind(this);
  }
  setTab1() {
    this.setState({
      tabChoosen: 1
    });
  }
  setTab2() {
    this.setState({
      tabChoosen: 2
    });
  }
  clickChange(e) {
    this.setState({
      isChoosen: parseInt(e.target.getAttribute('data-index'), 10)
    });
  }
  clickPreview(e) {
    wx.previewImage({
      current: e.target.getAttribute('data-url'), // 当前显示图片的http链接
      urls: this.props.image // 需要预览的图片http链接列表
    });
  }
  render() {
    const styles = {
      nav: {
        // position: 'absolute',position: 'fixed',
        display: 'flex',
        fontSize: '0.533333rem',
        height: '0.94rem',
        paddingTop: '0.1rem'
      },
      report: {
        fontSize: '0.666667rem',
        color: '#fff',
        width: '67%',
        textAlign: 'center'
      },
      result: {
        fontSize: '0.666667rem',
        color: '#94D7FB',
        width: '33%',
        textAlign: 'center'
      },
      boxOut1: {
        width: '100%',
        backgroundImage: `url(${bottomBackground})`,
        minHeight: 'calc(100% - 7.8rem - 0.94rem)',
        // 图片自适应屏幕大小
        position: 'absolute',
        // backgroundPosition: 'center',
        backgroundSize: 'cover',
        display: 'flex',
        justifyContent: 'center',
        backgroundRepeat: 'no-repeat',
        overflowY: 'hidden',
        maxHeight: 'calc(100% - 0.92rem)'
      },
      box: {
        // height: '100%',
        width: '100%',
        // backgroundImage: `url(${bottomBackground})`,
        minHeight: 'calc(100% - 7.8rem - 0.94rem)',
        marginTop: '1rem',
        // 图片自适应屏幕大小
        // position: 'absolute',
        // backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'center',
        overflowY: 'hidden',
        maxHeight: 'calc(100% - 0.92rem)'
      },
      leftBox: {
        width: '30%',
        // marginTop: '1.333333rem',
        marginLeft: '1.2rem',
        fontSize: '0.533333rem',
        color: '#9C9C9C',
        listStyle: 'none'
      },
      rightBox: {
        width: '70%',
        // marginTop: '1.333333rem',
        fontSize: '0.533333rem',
        color: '#9C9C9C',
        listStyle: 'none'
      },
      leftList: {
        marginBottom: '1.333333rem'
        // borderWidth: 2,
        // borderStyle: 'solid',
        // borderRadius: 20,
        // display: 'table'
      },
      rightList: {
        marginBottom: '0.933333rem'
      },
      allImage: {
        minHeight: '6.40625rem',
        // height: '6.40625rem',
        // overflowY: 'scroll',
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
        // backgroundImage: `url(${backImg})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover'
      }
    };
    let menuLeft;
    let menuRight;
    let tab;
    if (this.state.tabChoosen === 1) {
      menuLeft = (
        <div style={styles.report} onClick={this.setTab1} id="tabName1">看报告</div>
      );
      menuRight = (
        <div style={styles.result} onClick={this.setTab2} id="tabName2">看图片</div>
      );
      tab = (
        <div style={styles.boxOut1}>
          <div style={Object.assign({}, styles.box, this.props.scrollStyle)} id="aa" >
            <ul style={styles.leftBox}>
              {
                this.props.report.map((item, i) => {
                  let circleBorder = {};
                  if (this.state.isChoosen === i) {
                    circleBorder = {
                      borderWidth: '0.026667rem',
                      borderStyle: 'solid',
                      borderRadius: '0.266667rem',
                      display: 'table'
                    };
                  }
                  return (
                    <li
                      key={i}
                      data-index={i}
                      style={Object.assign({}, styles.leftList, circleBorder)}
                      onClick={this.clickChange}
                    >
                      {item.name}
                    </li>
                  );
                })
              }
            </ul>
            <ul style={styles.rightBox}>
              {
                this.props.report[this.state.isChoosen].items.map((item, i) => (
                  <li key={i} style={styles.rightList}>{item}</li>
                ))
              }
            </ul>
          </div>
        </div>
      );
    } else if (this.state.tabChoosen === 2) {
      menuLeft = (
        <div style={styles.result} onClick={this.setTab1}>看报告</div>
      );
      menuRight = (
        <div style={styles.report} onClick={this.setTab2}>看图片</div>
      );
      tab = (
        <div style={styles.boxOut1}>
          <div style={Object.assign({}, styles.box, this.props.scrollStyle)} id="aa" >
            <div style={styles.allImage}>
              {
                this.props.image.map((imgId, i) => {
                  const background = {
                    backgroundImage: `url(${imgId})`
                  };
                  return (
                    <div
                      data-url={imgId}
                      key={i}
                      style={Object.assign({}, styles.img, background)}
                      onClick={this.clickPreview}
                    >
                    </div>
                  );
                })
              }
            </div>
          </div>
        </div>
      );
    }
    return (
      <div>
        <div style={styles.nav} id="scrollBox">
          {menuLeft}
          {menuRight}
        </div>
        {tab}
      </div>
    );
  }
}

ReportShow.propTypes = {
  report: React.PropTypes.array,
  scrollStyle: React.PropTypes.object,
  image: React.PropTypes.array
};

export default ReportShow;