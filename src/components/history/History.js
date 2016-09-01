/**
 * Created by zc on 2016/8/16.
 */
  import Header from '../common/Header';
  import ButtomBar from '../common/ButtomBar';
  import historyBg from './historyBg.png';
  import Category from './Category';
  import config from '../../config';
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
    constructor(props) {
      super(props);
      this.ChangeDataOne = this.ChangeDataOne.bind(this);
      this.ChangeDataTwo = this.ChangeDataTwo.bind(this);
      this.dataRequestOne = this.dataRequestOne.bind(this);
      this.dataRequestTwo = this.dataRequestTwo.bind(this);
      this.dataRequestThree = this.dataRequestThree.bind(this);
      this.state = {
        dataOne: [],
        dataTwo: [],
        dataTree: [],
        idOne: 0,
        idTwo: 0,
        title: ''
      };
    }
    componentWillMount() {
      this.dataRequestOne();
      if (this.state.dataOne.length !== 0) {
        this.dataRequestTwo();
        if (this.state.dataTwo.length !== 0) {
          this.dataRequestThree();
        }
      }
    }
    dataRequestOne() {
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
    dataRequestTwo() {
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
    dataRequestThree() {
      fetch(`${config.apiPrefix}
      /user-check-classifies
      /${this.state.dataTwo[this.state.idTwo].id}?unit=${this.state.dataTwo[this.state.idTwo].unit}`)
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
    ChangeDataOne(idOne) {
      this.setState({
        idOne,
        idTwo: 0
      }, function () {
        this.dataRequestTwo();
        if (this.state.dataTwo.length !== 0) {
          this.dataRequestThree();
        }
      });
    }
    ChangeDataTwo(idTwo, title) {
      this.setState({
        idTwo,
        title
      }, function () {
        this.dataRequestThree();
      });
    }
    render() {
      // const data1 = [
      //   { id: 1, name: 'adf', iconFontCode: '' },
      //   { id: 2, name: 'sdf', iconFontCode: '' },
      //   { id: 3, name: 'adf', iconFontCode: '' },
      //   { id: 4, name: 'df4', iconFontCode: '' },
      //   { id: 5, name: 'adf', iconFontCode: '' },
      //   { id: 6, name: '6sf', iconFontCode: '' },
      //   { id: 7, name: 'sf7', iconFontCode: '' },
      //   { id: 8, name: 'f8', iconFontCode: '' },
      //   { id: 9, name: 'sd9', iconFontCode: '' }
      // ];
      // const data2 = [
      //   { id: 1, name: 'as', unit: 'mg/L' },
      //   { id: 1, name: 'sdfsaf', unit: 'g/L' },
      //   { id: 2, name: 'dfa', unit: 'g/L' },
      //   { id: 3, name: 'sdf', unit: 'mg/L' },
      //   { id: 4, name: 'sdf', unit: 'g/L' },
      //   { id: 5, name: '0sdf5', unit: 'g/L' },
      //   { id: 6, name: '0adf6', unit: 'mg/L' },
      //   { id: 7, name: 'adf', unit: 'g/L' },
      //   { id: 8, name: 'ad', unit: 'g/L' }
      // ];
      // const data3 = [
      //   { checkTime: '2016/4/29 14:15:00', value: 123.4 },
      //   { checkTime: '2016/4/29 15:15:00', value: 164.4 },
      //   { checkTime: '2016/4/29 19:15:00', value: 135.4 }
      // ];
      let maxValue = 0;
      let minValue = 0;
      if (this.state.dataTree.length !== 0) {
        maxValue = this.state.dataTree[0].value;
        minValue = this.state.dataTree[0].value;
        for (let i = 1; i < this.state.dataTree.length; i ++) {
          if (this.state.dataTree[i].value > maxValue) {
            maxValue = this.state.dataTree[i].value;
          }
          if (this.state.dataTree[i].value < minValue) {
            minValue = this.state.dataTree[i].value;
          }
        }
      }
      return (
        <div style={HistoryStyle.history}>
          <Header headerType="0" />
          <div style={HistoryStyle.Main}>
            <div style={HistoryStyle.Title}>{this.state.title}</div>
            <div style={HistoryStyle.tuBiao}>echarts折线图组件</div>
            <Category
              style={HistoryStyle.Category}
              itemListOne={this.state.dataOne}
              itemListTwo={this.state.dataTwo}
              handleChangeDataOne={this.ChangeDataOne}
              handleChangeDataTwo={this.ChangeDataTwo}
            />
            <div style={HistoryStyle.Range}>
              <dl>
                <dt style={HistoryStyle.Circle}>{maxValue}</dt>
                <dd style={HistoryStyle.MaxMin}>最高</dd>
              </dl>
              <dl>
                <dt style={HistoryStyle.Circle}>{minValue}</dt>
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