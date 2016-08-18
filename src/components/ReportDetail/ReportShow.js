import bottomBackground from './img/background2.2.svg';

class ReportShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isChoosen: 0
    };
    this.clickChange = this.clickChange.bind(this);
  }
  clickChange(e) {
    this.setState({
      isChoosen: parseInt(e.target.getAttribute('data-index'), 10)
    });
  }
  render() {
    const styles = {
      nav: {
        // position: 'absolute',position: 'fixed',
        display: 'flex',
        fontSize: 40,
        height: 70
      },
      report: {
        fontSize: 50,
        color: '#fff',
        width: '70%',
        textAlign: 'center'
      },
      result: {
        fontSize: 50,
        color: '#fff',
        width: '30%',
        textAlign: 'center'
      },
      box: {
        // height: '100%',
        width: '100%',
        backgroundImage: `url(${bottomBackground})`,
        minHeight: '45%',
        // 图片自适应屏幕大小
        position: 'absolute',
        // backgroundPosition: 'center',
        backgroundSize: 'cover',
        display: 'flex',
        justifyContent: 'center'
      },
      leftBox: {
        width: '30%',
        marginTop: 100,
        marginLeft: 80,
        fontSize: 45,
        color: '#9C9C9C',
        listStyle: 'none'
      },
      rightBox: {
        width: '50%',
        marginTop: 100,
        fontSize: 45,
        color: '#9C9C9C',
        listStyle: 'none'
      },
      leftList: {
        marginBottom: 100
        // borderWidth: 2,
        // borderStyle: 'solid',
        // borderRadius: 20,
        // display: 'table'
      },
      rightList: {
        marginBottom: 70
      }
    };
    return (
      <div>
        <div style={styles.nav}>
          <div style={styles.report}>看报告</div>
          <div style={styles.result}>查结果</div>
        </div>
        <div style={styles.box}>
          <ul style={styles.leftBox}>
            {
              this.props.report.map((item, i) => {
                let circleBorder = {};
                if (this.state.isChoosen === i) {
                  circleBorder = {
                    borderWidth: 2,
                    borderStyle: 'solid',
                    borderRadius: 20,
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
  }
}

ReportShow.propTypes = {
  report: React.PropTypes.array
};

export default ReportShow;