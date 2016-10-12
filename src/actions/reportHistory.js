
export const REFRESH_CHECK_CLASSIFIES = 'REFRESH_CHECK_CLASSIFIES';
export const REFRESH_CHECK_ITEMS = 'REFRESH_CHECK_ITEMS';
export const REFRESH_CHECK_ITEM_VALUES = 'REFRESH_CHECK_ITEM_VALUES';

export const refreshCheckClassifies = (dataClassifies, dataItems, dataItemValues) => ({
  type: REFRESH_CHECK_CLASSIFIES,
  dataClassifies,
  dataItems,
  dataItemValues
});
export const refreshCheckItems = (idOne, classifyId, dataItems, dataItemValues) => ({
  type: REFRESH_CHECK_ITEMS,
  idOne,
  classifyId,
  dataItems,
  dataItemValues
});
export const refreshCheckItemValues = (idTwo, itemId, unit, dataItemValues) => ({
  type: REFRESH_CHECK_ITEM_VALUES,
  idTwo,
  itemId,
  unit,
  dataItemValues
});