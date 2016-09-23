/**
 * Created by zc on 2016/8/16.
 */
  import Header from '../common/Header';
  import ButtomBar from '../common/ButtomBar';
  import historyBg from './historyBg.png';
  import Category from './Category';
  import HistoryEcharts from './HistoryEcharts';
  import config from '../../config';

  import { hashHistory } from 'react-router';

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
      height: '100%',
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
      height: 'calc(100% - 9.37rem)',
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
    constructor(props) {
      super(props);
      this.ChangeDataOne = this.ChangeDataOne.bind(this);
      this.ChangeDataTwo = this.ChangeDataTwo.bind(this);
      this.dataRequestOne = this.dataRequestOne.bind(this);
      this.dataRequestTwo = this.dataRequestTwo.bind(this);
      this.dataRequestThree = this.dataRequestThree.bind(this);
      this.getMaxAndMin = this.getMaxAndMin.bind(this);
      this.state = {
        dataOne: [],
        dataTwo: [],
        dataThree: [],
        idOne: 0,
        idTwo: 0,
        max: '0',
        min: '0',
        dataX: [],
        dataY: []
      };
    }
    componentWillMount() {
      this.dataRequestOne()
        .then(() => {
          if (this.state.dataOne.length !== 0) {
            this.dataRequestTwo()
              .then(() => {
                if (this.state.dataTwo.length !== 0) {
                  this.dataRequestThree();
                }
              });
          }
        });
    }
    componentDidUpdate() {
      if (this.state.dataOne.length === 0) {
        alert('您还未添加有效的报告!');
        hashHistory.push('/');
      }
    }
    getMaxAndMin() {
      let maxValue = '0';
      let minValue = '0';
      const x = [];
      const y = [];
      if (this.state.dataThree.length !== 0) {
        maxValue = this.state.dataThree[0].value;
        minValue = this.state.dataThree[0].value;
        for (let i = 0; i < this.state.dataThree.length; i ++) {
          if (this.state.dataThree[i].value > maxValue) {
            maxValue = this.state.dataThree[i].value;
          }
          if (this.state.dataThree[i].value < minValue) {
            minValue = this.state.dataThree[i].value;
          }
          x.push(this.state.dataThree[i].checkTime.substring(0, 10));
          y.push(this.state.dataThree[i].value);
        }
      }
      this.setState({
        max: maxValue,
        min: minValue,
        dataX: x,
        dataY: y
      });
    }
    dataRequestOne() {
      return new Promise((resolve, reject) => {
        fetch(`${config.apiPrefix}/user-check-classifies`)
          .then(response => {
            if (response.status === 200) {
              return response.json();
            }
            throw new Error;
          })
          .then(json => {
            if (json.retCode === 0) {
              this.setState({
                dataOne: json.data
              }, () => {
                resolve();
              });
            } else {
              alert('请求出错！');
            }
          })
          .catch(error => {
            alert('出错啦！');
            console.log(error);
            reject(error);
          });
      });
    }
    dataRequestTwo() {
      return new Promise((resolve, reject) => {
        fetch(`${config.apiPrefix}/user-check-classifies/${this.state.dataOne[this.state.idOne].id}/check-items`)
          .then(response => {
            if (response.status === 200) {
              return response.json();
            }
            throw new Error;
          })
          .then(json => {
            if (json.retCode === 0) {
              this.setState({
                dataTwo: json.data
              }, () => {
                resolve();
              });
            } else {
              alert('请求出错！');
            }
          })
          .catch(error => {
            alert('出错啦！');
            console.log(error);
            reject(error);
          });
      });
    }
    dataRequestThree() {
      return new Promise((resolve, reject) => {
        fetch(`${config.apiPrefix}` +
        '/user-check-items' +
        `/${this.state.dataTwo[this.state.idTwo].id}?unit=${this.state.dataTwo[this.state.idTwo].unit}`)
          .then(response => {
            if (response.status === 200) {
              return response.json();
            }
            throw new Error;
          })
          .then(json => {
            if (json.retCode === 0) {
              this.setState({
                dataThree: json.data
              }, () => {
                this.getMaxAndMin();
              });
            } else {
              alert('请求出错！');
            }
          })
          .catch(error => {
            alert('出错啦！');
            console.log(error);
            reject(error);
          });
      });
    }
    ChangeDataOne(idOne) {
      this.setState({
        idOne,
        idTwo: 0
      }, () => {
        if (this.state.dataTwo.length !== 0) {
          this.dataRequestTwo()
            .then(() => {
              if (this.state.dataTwo.length !== 0) {
                this.dataRequestThree();
              }
            });
        }
      });
    }
    ChangeDataTwo(idTwo) {
      this.setState({
        idTwo
      }, () => {
        if (this.state.dataTwo.length !== 0) {
          this.dataRequestThree();
        }
      });
    }
    render() {
      let name;
      if (this.state.dataTwo.length !== 0) {
        name = (
          <div style={HistoryStyle.Title}>{this.state.dataTwo[this.state.idTwo].name}</div>
        );
      } else {
        name = (
          <div style={HistoryStyle.Title}></div>
        );
      }
      return (
        <div style={HistoryStyle.history}>
          <Header headerType="1" />
          <div style={HistoryStyle.Main}>
            <div style={HistoryStyle.Title}>{name}</div>
            <HistoryEcharts style={HistoryStyle.tuBiao} dataX={this.state.dataX} dataY={this.state.dataY} />
            <Category
              style={HistoryStyle.Category}
              itemListOne={this.state.dataOne}
              itemListTwo={this.state.dataTwo}
              handleChangeDataOne={this.ChangeDataOne}
              handleChangeDataTwo={this.ChangeDataTwo}
            />
            <div style={HistoryStyle.Range}>
              <dl>
                <dt style={HistoryStyle.Circle}>{this.state.max}</dt>
                <dd style={HistoryStyle.MaxMin}>最高</dd>
              </dl>
              <dl>
                <dt style={HistoryStyle.Circle}>{this.state.min}</dt>
                <dd style={HistoryStyle.MaxMin}>最低</dd>
              </dl>
            </div>
          </div>
          <ButtomBar bottombarType="1" />
        </div>
      );
    }
  }
  History.propTypes = {
    maxCnt: React.PropTypes.number,
    minCnt: React.PropTypes.number
  };
  export default History;