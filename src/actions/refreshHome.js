/**
 * Created by zc on 2016/10/10.
 */
export const REFRESH_REPORTLIST = 'REFRESH_REPORTLIST';
export const REFRESH_AGGREGATION = 'REFRESH_AGGREGATION';

export const refreshreportList = (reportList) => ({
  type: REFRESH_REPORTLIST,
  reportList
});

export const refreshAggregation = (aggregation) => ({
  type: REFRESH_AGGREGATION,
  aggregation
});
