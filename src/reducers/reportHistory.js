import { REFRESH_CHECK_CLASSIFIES, REFRESH_CHECK_ITEMS, REFRESH_CHECK_ITEM_VALUES, REFRESH_MOMENT }
  from '../actions/reportHistory';
import moment from 'moment';

const initState = {
  checkClassifies: {
    dataClassifies: [],
    lastUpdateTime: moment().subtract(1, 'days')
  },
  checkItems: {
    // '1': {
    //   dataItems: [],
    //   lastUpdateTime: moment().subtract(1, 'days')
    // },
    //
    // '2': {
    //   dataItems: [],
    //   lastUpdateTime: moment().subtract(1, 'days')
    // }
  },
  checkItemValues: {
    // '1unit': {
    //   dataItemValues: [],
    //   maxValue: '0',
    //   minValue: '0',
    //   dataX: [],
    //   dataY: [],
    //   lastUpdateTime: moment().subtract(1, 'days')
    // },
    //
    // '2unit': {
    //   dataItemValues: [],
    //   maxValue: '0',
    //   minValue: '0',
    //   dataX: [],
    //   dataY: [],
    //   lastUpdateTime: moment().subtract(1, 'days')
    // }
  },
  indexIsChoosen: {
    idOne: 0,
    idTwo: 0
  }
};


export default (state = initState, action) => {
  switch (action.type) {
    case REFRESH_CHECK_CLASSIFIES: {
      const { dataClassifies, dataItems, dataItemValues } = action;
      return Object.assign({}, state, {
        checkClassifies: Object.assign({}, state.checkClassifies, {
          dataClassifies,
          lastUpdateTime: moment()
        }),
        checkItems: Object.assign({}, state.checkItems, {
          [dataClassifies[0].id]: {
            dataItems,
            lastUpdateTime: moment()
          }
        }),
        checkItemValues: Object.assign({}, state.checkItemValues, {
          [dataItems[0].id + dataItems[0].unit]: {
            dataItemValues,
            lastUpdateTime: moment()
          }
        }),
        indexIsChoosen: Object.assign({}, state.indexIsChoosen, {
          idOne: 0,
          idTwo: 0
        })
      });
    }
    case REFRESH_CHECK_ITEMS: {
      const { idOne, classifyId, dataItems, dataItemValues } = action;
      return Object.assign({}, state, {
        checkItems: Object.assign({}, state.checkItems, {
          [classifyId]: {
            dataItems,
            lastUpdateTime: moment()
          }
        }),
        checkItemValues: Object.assign({}, state.checkItemValues, {
          [dataItems[0].id + dataItems[0].unit]: {
            dataItemValues,
            lastUpdateTime: moment()
          }
        }),
        indexIsChoosen: Object.assign({}, state.indexIsChoosen, {
          idOne,
          idTwo: 0
        })
      });
    }
    case REFRESH_CHECK_ITEM_VALUES: {
      const { idTwo, itemId, unit, dataItemValues } = action;
      return Object.assign({}, state, {
        checkItemValues: Object.assign({}, state.checkItemValues, {
          [itemId + unit]: {
            dataItemValues,
            lastUpdateTime: moment()
          }
        }),
        indexIsChoosen: Object.assign({}, state.indexIsChoosen, {
          idTwo
        })
      });
    }
    case REFRESH_MOMENT: {
      return Object.assign({}, state, {
        checkClassifies: Object.assign({}, state.checkClassifies, {
          lastUpdateTime: moment()
        })
      });
    }
    default:
      return state;
  }
};