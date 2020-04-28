import * as actions from './types';

export function uploadCsv(param) {
    return {type: actions.UPLOAD_CSV, payload: param};
}

export function fetchAllData() {
    return {
        type: actions.FETCH_ALL_DATA
    }
}