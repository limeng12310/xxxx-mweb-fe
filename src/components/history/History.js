/**
 * Created by zc on 2016/8/16.
 */
  import { connect } from 'react-redux';
  import { refreshCheckClassifies, refreshCheckItems, refreshCheckItemValues, refreshMoment }
    from '../../actions/reportHistory';
  // import Header from '../common/Header';
  import moment from 'moment';
  import ButtomBar from '../common/ButtomBar';
  import historyBg from './historyBg.png';
  import Category from './Category';
  import HistoryEcharts from './HistoryEcharts';
  import ProcessIndicator from '../common/ProcessIndicator';
  import Alert from '../common/Alert';
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
      this.fetchClassifies = this.fetchClassifies.bind(this);
      this.fetchItems = this.fetchItems.bind(this);
      this.fetchItemValues = this.fetchItemValues.bind(this);
      this.alertOkHandler = this.alertOkHandler.bind(this);
      this.alertNoReportOkHandler = this.alertNoReportOkHandler.bind(this);
      this.state = {
        processOpen: false,
        processMessage: 'loading...',
        alertOpen: false,
        alertMessage: '',
        alertNoReportOpen: false,
        alertNoReportMessage: ''
      };
    }
    componentWillMount() {
      let dataClassifies = [];
      let dataItems = [];
      let dataItemValues = [];

      const timeDiff = moment().diff(this.props.checkClassifies.lastUpdateTime, 'minutes');
      if (timeDiff < 10) {
        // this.props.disRefreshMoment();
        if (this.props.checkClassifies.dataClassifies && this.props.checkClassifies.dataClassifies.length === 0) {
          this.setState({
            alertNoReportOpen: true,
            alertNoReportMessage: '您还未添加有效的报告!'
          });
          return;
        }
      }
      this.setState({
        processOpen: true,
        processMessage: 'loading...'
      });
      this.fetchClassifies()
        .then(classifies => {
          if (classifies && classifies.length !== 0) {
            dataClassifies = classifies;
            // 获取了所有的分类
            // 获取第一个分类的id
            const classifyId = classifies[0].id;
            return this.fetchItems(classifyId);
          }
          throw new Error('您还未添加有效的报告');
        })
        .then(items => {
          dataItems = items;
          // 获取了第一个分类的所有项
          // 获取第一个分类的id和unit
          const itemId = items[0].id;
          const unit = items[0].unit;
          return this.fetchItemValues(itemId, unit);
        })
        .then(itemValues => {
          dataItemValues = itemValues;
          // 至此，获取了所有需要显示的数据
          // dispatch action
          // this.getMaxAndMin(itemValues);
          this.props.disRefreshCheckClassifies(dataClassifies, dataItems, dataItemValues);
          this.setState({
            processOpen: false
          });
        })
        .catch(error => {
          if (error.message === '您还未添加有效的报告') {
            this.props.disRefreshMoment();
            this.setState({
              processOpen: false,
              alertNoReportOpen: true,
              alertNoReportMessage: '您还未添加有效的报告!'
            });
            // hashHistory.push('/');
          } else {
            // alert('出错了，请稍后重试');
            this.setState({
              processOpen: false,
              alertOpen: true,
              alertMessage: '出错了，请稍后重试!'
            });
          }
          console.log(error);
        });
    }
    fetchClassifies() {
      return fetch(`${config.apiPrefix}/user-check-classifies`, {
        credentials: 'include'
      })
        .then(response => {
          if (response.status === 200) {
            return response.json();
          }
          throw new Error;
        })
        .then(json => {
          if (json.retCode === 0) {
            return json.data;
          }
          // alert('请求出错！');
          // this.setState({
          //   alertOpen: true,
          //   alertMessage: '请求出错!'
          // });
          // return true;
          throw new Error('出错了，请稍后重试!');
        });
        // .catch(error => {
        //   // alert('出错啦！');
        //   this.setState({
        //     alertOpen: true,
        //     alertMessage: '出错了，请稍后重试!'
        //   });
        //   console.log(error);
        // });
    }
    fetchItems(classifyId) {
      return fetch(`${config.apiPrefix}/user-check-classifies/${classifyId}/check-items`, {
        credentials: 'include'
      })
        .then(response => {
          if (response.status === 200) {
            return response.json();
          }
          throw new Error;
        })
        .then(json => {
          if (json.retCode === 0) {
            return json.data;
          }
          // alert('请求出错！');
          // this.setState({
          //   alertOpen: true,
          //   alertMessage: '请求出错！'
          // });
          // return true;
          throw new Error('出错了，请稍后重试!');
        });
        // .catch(error => {
        //   // alert('出错啦！');
        //   this.setState({
        //     alertOpen: true,
        //     alertMessage: '出错了，请稍后重试！'
        //   });
        //   console.log(error);
        // });
    }
    fetchItemValues(itemId, unit) {
      return fetch(`${config.apiPrefix}/user-check-items/${itemId}?unit=${unit}`, {
        credentials: 'include'
      })
        .then(response => {
          if (response.status === 200) {
            return response.json();
          }
          throw new Error;
        })
        .then(json => {
          if (json.retCode === 0) {
            return json.data;
          }
          // alert('请求出错！');
          // this.setState({
          //   alertOpen: true,
          //   alertMessage: '请求出错！'
          // });
          // return true;
          throw new Error('出错了，请稍后重试!');
        });
        // .catch(error => {
        //   // alert('出错啦！');
        //   this.setState({
        //     alertOpen: true,
        //     alertMessage: '出错了，请稍后重试！'
        //   });
        //   console.log(error);
        // });
    }
    // getMaxAndMin(itemValues) {
    //   if (itemValues.length !== 0) {
    //     this.maxValue = itemValues[0].value;
    //     this.minValue = itemValues[0].value;
    //     for (let i = 0; i < itemValues.length; i ++) {
    //       if (itemValues[i].value > this.maxValue) {
    //         this.maxValue = itemValues[i].value;
    //       }
    //       if (itemValues[i].value < this.minValue) {
    //         this.minValue = itemValues[i].value;
    //       }
    //       this.dataX.push(itemValues[i].checkTime.substring(0, 10));
    //       this.dataY.push(itemValues[i].value);
    //     }
    //   }
    // }
    ChangeDataOne(idOne) {
      let dataItems;
      let dataItemValues;
      // 获取该分类的id
      const classifyId = this.props.checkClassifies.dataClassifies[idOne].id;


      const timeDiff = moment().diff(this.props.checkItems[classifyId].lastUpdateTime, 'minutes');
      if (timeDiff < 10) {
        console.log(this.props);
        this.props.disRefreshCheckItems(idOne, classifyId, this.props.checkItems[classifyId].dataItems,
          this.props.checkItemValues[this.props.checkItems[classifyId].dataItems[0].id
          + this.props.checkItems[classifyId].dataItems[0].unit].dataItemValues);
        return;
      }

      this.setState({
        processOpen: true
      });
      this.fetchItems(classifyId)
        .then(items => {
          dataItems = items;
          // 获取了该分类的所有项
          // 获取第一个分类的id和unit
          const itemId = items[0].id;
          const unit = items[0].unit;
          return this.fetchItemValues(itemId, unit);
        })
        .then(itemValues => {
          dataItemValues = itemValues;
          // 至此，获取了所有需要显示的数据
          // dispatch action
          // this.getMaxAndMin(itemValues);
          this.props.disRefreshCheckItems(idOne, classifyId, dataItems, dataItemValues);
          this.setState({
            processOpen: false
          });
        })
        .catch(error => {
          // alert('出错了，请稍后重试');
          this.setState({
            alertOpen: true,
            alertMessage: '出错了，请稍后重试！'
          });
          console.log(error);
        });
    }
    ChangeDataTwo(idTwo) {
      let dataItemValues;
      const itemId = this.props.checkItems[this.props.checkClassifies.
        dataClassifies[this.props.indexIsChoosen.idOne].id].dataItems[idTwo].id;
      const unit = this.props.checkItems[this.props.checkClassifies.
        dataClassifies[this.props.indexIsChoosen.idOne].id].dataItems[idTwo].unit;

      const timeDiff = moment().diff(this.props.checkItemValues[itemId + unit].lastUpdateTime, 'minutes');
      if (timeDiff < 10) {
        this.props.disRefreshCheckItemValues(idTwo, itemId, unit,
          this.props.checkItemValues[itemId + unit].dataItemValues);
        return;
      }
      this.setState({
        processOpen: true
      });
      this.fetchItemValues(itemId, unit)
        .then(itemValues => {
          dataItemValues = itemValues;
          // 至此，获取了所有需要显示的数据
          // dispatch action
          // this.getMaxAndMin(itemValues);
          this.props.disRefreshCheckItemValues(idTwo, itemId, unit, dataItemValues);
          this.setState({
            processOpen: false
          });
        })
        .catch(error => {
          // alert('出错了，请稍后重试');
          this.setState({
            alertOpen: true,
            alertMessage: '出错了，请稍后重试！'
          });
          console.log(error);
        });
    }
    alertOkHandler() {
      this.setState({
        alertOpen: false
      });
    }
    alertNoReportOkHandler() {
      this.setState({
        alertNoReportOpen: false
      });
      hashHistory.push('/');
    }
    render() {
      let dataClassifies = [];
      let dataItems = [];
      let classifyId;
      let itemName = '';
      let itemId;
      let itemUnit;
      const dataX = [];
      const dataY = [];
      let maxValue = '0';
      let minValue = '0';
      let dataItemValues;
      if (this.props.checkClassifies.dataClassifies.length !== 0) {
        dataClassifies = this.props.checkClassifies.dataClassifies;
        classifyId = this.props.checkClassifies.dataClassifies[this.props.indexIsChoosen.idOne].id;
        dataItems = this.props.checkItems[classifyId].dataItems;
        itemName = this.props.checkItems[classifyId].dataItems[this.props.indexIsChoosen.idTwo].name;
        itemId = this.props.checkItems[classifyId].dataItems[this.props.indexIsChoosen.idTwo].id;
        itemUnit = this.props.checkItems[classifyId].dataItems[this.props.indexIsChoosen.idTwo].unit;
        // console.log(this.props.checkItemValues);
        dataItemValues = this.props.checkItemValues[itemId + itemUnit].dataItemValues;
        maxValue = dataItemValues[0].value;
        minValue = dataItemValues[0].value;
        for (let i = 0; i < dataItemValues.length; i ++) {
          if (dataItemValues[i].value > maxValue) {
            maxValue = dataItemValues[i].value;
          }
          if (dataItemValues[i].value < minValue) {
            minValue = dataItemValues[i].value;
          }
          dataX.push(dataItemValues[i].checkTime.substring(0, 10));
          dataY.push(dataItemValues[i].value);
        }
      }
      return (
        <div style={HistoryStyle.history}>
          <div style={HistoryStyle.Main}>
            <div style={HistoryStyle.Title}>{itemName}</div>
            <HistoryEcharts style={HistoryStyle.tuBiao} dataX={dataX} dataY={dataY} />
            <Category
              style={HistoryStyle.Category}
              itemListOne={dataClassifies}
              itemListTwo={dataItems}
              isChoosenOne={this.props.indexIsChoosen.idOne}
              isChoosenTwo={this.props.indexIsChoosen.idTwo}
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
          <ButtomBar bottombarType="1" />
          <ProcessIndicator open={this.state.processOpen} message={this.state.processMessage} />
          <Alert open={this.state.alertOpen} message={this.state.alertMessage} okHandler={this.alertOkHandler} />
          <Alert
            open={this.state.alertNoReportOpen}
            message={this.state.alertNoReportMessage}
            okHandler={this.alertNoReportOkHandler}
          />
        </div>
      );
    }
  }
  History.propTypes = {
    maxCnt: React.PropTypes.number,
    minCnt: React.PropTypes.number,
    checkClassifies: React.PropTypes.object,
    checkItems: React.PropTypes.object,
    checkItemValues: React.PropTypes.object,
    indexIsChoosen: React.PropTypes.object,
    disRefreshCheckClassifies: React.PropTypes.func,
    disRefreshCheckItems: React.PropTypes.func,
    disRefreshCheckItemValues: React.PropTypes.func,
    disRefreshMoment: React.PropTypes.func
  };

  export default connect(
    state => ({
      checkClassifies: state.reportHistory.checkClassifies,
      checkItems: state.reportHistory.checkItems,
      checkItemValues: state.reportHistory.checkItemValues,
      indexIsChoosen: state.reportHistory.indexIsChoosen
    }),
    {
      disRefreshCheckClassifies: refreshCheckClassifies,
      disRefreshCheckItems: refreshCheckItems,
      disRefreshCheckItemValues: refreshCheckItemValues,
      disRefreshMoment: refreshMoment
    }
  )(History);