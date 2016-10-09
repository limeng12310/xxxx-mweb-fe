
export const REFRESH_REPORTS = 'REFRESH_REPORTS';

export const refreshReport = (reportId, reportData) => ({
  type: REFRESH_REPORTS,
  reportId,
  reportData
});