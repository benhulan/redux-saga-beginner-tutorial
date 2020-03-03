import test from 'tape';

import { put, call } from 'redux-saga/effects'
import { incrementAsync, delay, helloSaga } from './sagas'

test('incrementAsync Saga test', (assert) => {
  const gen = incrementAsync()

  assert.deepEqual(
    gen.next().value,
    call(delay, 1000),
    'incrementAsync Saga must call delay(1000)'
  )

  assert.deepEqual(
    gen.next().value,
    put({type: 'INCREMENT'}),
    'incrementAsync Saga must dispatch an INCREMENT action'
  )

  assert.deepEqual(
    gen.next(),
    { done: true, value: undefined },
    'incrementAsync Saga must be done'
  )

  assert.end()
});

test('helloSaga Saga test', (assert) => {
  const gen = helloSaga()

  assert.deepEqual(
    gen.next().value,
    'Please give me a value for x',
    'helloSaga Saga needs a value for x. Passing 4'
  )

  assert.deepEqual(
    gen.next(4).value,
    'Please give me a value for y',
    'helloSaga Saga needs a value for y. Passing 5'
  )

  assert.deepEqual(
    gen.next(5).value,
    'Please give me a value for z',
    'helloSaga Saga needs a value for z. Passing 6'
  )

  assert.deepEqual(
    gen.next(6),
    { done: true, value: 15 },
    'helloSaga final value will be 4 + 5 + 6 = 15'
  )

  assert.end()
});