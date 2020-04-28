import { all } from 'redux-saga/effects'
import graphSaga from './graphSaga';


export default function * rootSaga () {
    yield all([
        graphSaga()
    ]);
}