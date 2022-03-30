export type ActionType = {
  SET_ROW_SELECTED_STATE: string;
  SET_COLUMNS_DISPLAY_STATE: string;
  SET_BASE_STATE: string;
};

export type ActionName = {
  setSelectedRowStateNgxTable: any;
  setColumnSettingNgxTable: any;
  setBaseStateNgxTable: any;
};

export interface ActionConfigModel {
  stateName: string;
  action: any;
}
