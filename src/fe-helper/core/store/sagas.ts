import { all } from "redux-saga/effects";

/* eslint @typescript-eslint/no-var-requires: "off" */
// <--- Do not delete cause ignore eslint
export default function* rootSaga(): Generator<any, any, any> {
  let mainModuleSaga;
  try {
    const mainModuleSagaImport = require("../../../store/saga");
    mainModuleSaga = mainModuleSagaImport && mainModuleSagaImport.default;
  } catch (error) {
    // error when have no config saga
  }
  yield all([
    mainModuleSaga && mainModuleSaga(),
    // more sagas...
  ]);
}
