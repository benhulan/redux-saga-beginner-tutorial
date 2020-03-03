import { put, takeEvery, all, call } from 'redux-saga/effects'

export const delay = (ms) => new Promise(res => setTimeout(res, ms))

export function* helloSaga() {
  // interesting example from YouTube: https://www.youtube.com/watch?v=o3A9EvMspig
  let x = yield 'Please give me a value for x'
  console.log(x)

  let y = yield 'Please give me a value for y'
  console.log(y)

  let z = yield 'Please give me a value for z'
  console.log(z)

  return (x + y + z)
}

// worker saga performs the async increment task
export function* incrementAsync() {
  yield call(delay, 1000)
  yield put({ type: 'INCREMENT' })
}

// watcher saga spawns a new incrementAsync task on each INCREMENT_ASYNC
function* watchIncrementAsync() {
  yield takeEvery('INCREMENT_ASYNC', incrementAsync)
}

// single entry point to start all sagas at once
export default function* rootSaga() {
  yield all([
    helloSaga(),
    watchIncrementAsync()
  ])
}