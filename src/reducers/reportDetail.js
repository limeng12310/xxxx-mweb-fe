import { REFRESH_REPORTS } from '../actions/reports';
import moment from 'moment';

const initState = {
  reports: {
    // '1': {
    //   message: {},
    //   lastUpdateTime: moment().subtract(1, 'days')
    // },

    // '2': {
    //   message: {},
    //   lastUpdateTime: moment().subtract(1, 'days')
    // }
  }
};


export default (state = initState, action) => {
  switch (action.type) {
    case REFRESH_REPORTS: {
      const { reportId, reportData } = action;
      return Object.assign({}, state, {
        reports: Object.assign({}, state.reports, {
          [reportId]: {
            reportData,
            lastUpdateTime: moment()
          }
        })
      });
    }
    default:
      return state;
  }
};