import fetchMock from 'fetch-mock'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import counterReducer from './counterSlice';
import {
  decrement,
  increment,
  loadFromServerFetch, 
  selectCount,
  startOperation,
  endOperation,
  setValue
} from './counterSlice';

import { store, RootState } from "../../app/store";

const middlewares = [thunk]
const mockStore = configureMockStore<RootState>(middlewares)

afterEach(() => {
  fetchMock.restore()
});

test('reducer increments', () => {
  const {value} = counterReducer({
    value: 0,
    operationInProgress: {}
  }, increment);
  expect(value).toBe(1);
});

test('reducer decrements', () => {
  const {value} = counterReducer({
    value: 1,
    operationInProgress: {}
  }, decrement);
  expect(value).toBe(0);
});

// https://redux.js.org/recipes/writing-tests
test('loaded data lands in state', async () => {
  const newCount = 1000000; 
  const url = process.env.PUBLIC_URL + "/api/users"

  fetchMock.getOnce(url, {
    body: {
      count: newCount
  },
    headers: { 'content-type': 'application/json' }
  });

  await store.dispatch(loadFromServerFetch(url));
  const actualCount = selectCount(store.getState());
  expect(actualCount).toBe(newCount);
});

test('loading dispatches start and end', async () => {
  const newCount = 1000000; 
  const url = process.env.PUBLIC_URL + "/api/users"
  fetchMock.getOnce(url, {
    body: {
      count: newCount
  },
    headers: { 'content-type': 'application/json' }
  });

  // https://github.com/reduxjs/redux-mock-store
  // mocking to check for actions
  const mockedStore = mockStore(store.getState())
  // type inference unsolved
  // https://stackoverflow.com/questions/66570090/type-casting-dispatch-for-configuremockstore-from-createasyncthunk
  const loadThunk: any = loadFromServerFetch(url);
  await mockedStore.dispatch(loadThunk)

  const expectedActions = [
    { type: startOperation.type, payload: 'LOAD'  },
    { type: setValue.type, payload: newCount },
    { type: endOperation.type, payload: 'LOAD' }
  ]

  // toBe will not work, not same object
  expect(mockedStore.getActions()).toEqual(expectedActions);
});
