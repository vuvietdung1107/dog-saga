import {takeLatest, call, put} from 'redux-saga/effects'
import axios from 'axios'

// watcher saga: watches for actions dispatched to the store, starts worker saga
export function* watcherSaga() {
    console.log("watcherSaga");
    yield takeLatest("API_CALL_REQUEST", workerSaga);
}
// function that makes the api request and returns a Promise for response
function fetchDog() {
    console.log("function that makes the api request and returns a Promise for response");
    return axios({
        method: "get",
        url: "https://dog.ceo/api/breeds/image/random"
    })
}
// worker saga: makes the api call when watcher saga sees the action
function* workerSaga() {
    try {
        const response = yield call(fetchDog);
        // const dog = response.data.message;
        const dog = "https://loremflickr.com/cache/resized/65535_49816795683_170ee97cd4_n_320_240_nofilter.jpg";

        // dispatch a success action to the store with the new dog
        yield put({type: "API_CALL_SUCCESS", dog})

    }catch (error) {
        // dispatch a failure action to the store with the error
        yield put({type: "API_CALL_FAILURE", error})
    }
}