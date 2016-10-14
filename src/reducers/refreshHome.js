/**
 * Created by zc on 2016/10/10.
 */
import { REFRESH_AGGREGATION, REFRESH_REPORTLIST } from '../actions/refreshHome';
import moment from 'moment';

const initState = {
  updateTime: moment().subtract(1, 'days'),
  aggregation: {},
  reportList: [
    // {}, {}, {}
  ]
};


export default (state = initState, action) => {
  switch (action.type) {
    case REFRESH_REPORTLIST: {
      const { reportList } = action;
      return Object.assign({}, state, {
        reportList,
        updateTime: moment()
      });
    }
    case REFRESH_AGGREGATION: {
      const { aggregation } = action;
      return Object.assign({}, state, {
        aggregation,
        updateTime: moment()
      });
    }
    default:
      return state;
  }
};