import { call, put, takeLatest, all, fork } from 'redux-saga/effects'
import * as actions from '../actions/types'
import urls from '../../utils/urls';
import { createUrl, isEmpty } from '../../utils/common'
import axios from '../../utils/axios'

//##############Upload Csv ####################################

function uploadCsv(param) {
    const url = createUrl(urls.BASE_URL + urls.UPLOAD + urls.CSV);
    return axios.request({
    method: 'post',
    url,
    headers: {
        'Content-Type': 'multipart/form-data'
    },
    data: param
    })
}

export function * uploadCsvEffect (params) {
    const { payload } = params
  
    console.log('payload is ---->', payload)
    try {
      const { data } = yield call(uploadCsv, payload)
  
      if (!isEmpty(data)) {
        yield put({
            type : actions.UPLOAD_CSV_SUCCESS,
            data: data.data
        })
      } else {
          yield put( {
              type: actions.UPLOAD_CSV_SUCCESS,
              data: {}
          })
      }
    } catch (e) {
        yield put({
            type: actions.UPLOAD_CSV_FAILURE,
            error: e
        })
    }
  }

export function * uploadCsvWatcher () {
    yield takeLatest(actions.UPLOAD_CSV, uploadCsvEffect);
  }

  // ############# get all data #####################################

  function fetchAllData() {
    const url = createUrl(urls.BASE_URL + urls.ALL);
    return axios.request({
    method: 'get',
    url
    })
}

export function * fetchAllDataEffect () {
  
    try {
      const { data } = yield call(fetchAllData)
  
      if (!isEmpty(data)) {
        yield put({
            type : actions.FETCH_ALL_DATA_SUCCESS,
            data: data.data
        })
      } else {
          yield put( {
              type: actions.FETCH_ALL_DATA_FAILURE,
              data: {}
          })
      }
    } catch (e) {
        yield put({
            type: actions.FETCH_ALL_DATA_FAILURE,
            error: e
        })
    }
  }

  export function * getAllData () {
      yield takeLatest(actions.FETCH_ALL_DATA, fetchAllDataEffect)
  }


  export default function* rootSagas() {
    yield all([
        fork(uploadCsvWatcher),
        fork(getAllData)
    ])
}

