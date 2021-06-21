import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';

import axios from 'axios';

type Operation = 'LOAD' | 'ADD_ASYNC'

type AppState = {
  value: number;
}

type UIState = {
  operationInProgress: Partial<Record<Operation,boolean>>;
}

type ConfigState = {
  backendApiUrl?: string;
  backendApiSuffix?: string;
}

type CounterState = AppState & UIState & ConfigState;

const initialState: CounterState = {
  value: 0,
  operationInProgress: {
  }
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: state => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    decrement: state => {
      state.value -= 1;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
    setValue: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
    startOperation: (state, action: PayloadAction<Operation>) => {
      state.operationInProgress[action.payload] = true;
    },
    endOperation: (state, action: PayloadAction<Operation>) => {
      state.operationInProgress[action.payload] = false;
    },
    configureBackend: (state, action: PayloadAction<{url: string, suffix: string}>) => {
      state.backendApiUrl = action.payload.url;
      state.backendApiSuffix = action.payload.suffix;
    },
  },
});

export const { increment, decrement, incrementByAmount, setValue, startOperation, endOperation, configureBackend } = counterSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const incrementAsync = (amount: number): AppThunk => async dispatch => {
  dispatch(startOperation('ADD_ASYNC'));
  await new Promise((resolve) => setTimeout(resolve, 1000));
  dispatch(incrementByAmount(amount));
  dispatch(endOperation('ADD_ASYNC'));
};

export const loadBackendConfig = (): AppThunk => async dispatch => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log(process.env.PUBLIC_URL)
  // dispatch(configureBackend({
  //   url: process.env.PUBLIC_URL +'/mockapi/',
  //   suffix: '.json'
  // }));

  // start server and 
  // add 
  // "proxy": "http://localhost:7000",
  // to package.json
  dispatch(configureBackend({
    url: '/api/',
    suffix: ''
  }));
};

// composed async action creator
export const initFromBackend = (): AppThunk => async (dispatch, getState) => {
  if (!selectIsConfigured(getState())) {
    await dispatch(loadBackendConfig());
  }
  // makes tests indeterministic, so we deactivate the second call for now
  await Promise.all([
    dispatch(loadFromServer()),
    // dispatch(loadFromServer('users2'))
  ])
  console.log('all initialized')
}

export const loadFromServer = (endpoint: string = 'users' ): AppThunk => async (dispatch, getState) => {
  const baseUrl = getState().counter.backendApiUrl;
  const apiSuffix = getState().counter.backendApiSuffix;
  if (!baseUrl) {
    throw new Error('backend not not configured');
  }
  const url = baseUrl + endpoint + apiSuffix;

  console.log(`loading from ${url}`)

  const promise = dispatch(loadFromServerFetch(url));
  // const promise = dispatch(loadFromServerAxios(url));
  console.log(promise)
  const result = await promise;
  console.log(promise)
  console.log(result)
}

export const loadFromServerFetch = (url: string): AppThunk => async dispatch => {
  dispatch(startOperation('LOAD'));
  try {
    const response = await fetch(url, {headers: {'Accept' : 'application/json'}});
    const json = await response.json();
    dispatch(setValue(json.count));
    return json.count;
  } catch (error) {
    console.error("Fetch failed", error);
  } finally {
    dispatch(endOperation('LOAD'));
  }
};

type BackendCountResponse = {
  count: number,
  nada: string // does not exist in response
}

export const loadFromServerAxios = (url: string): AppThunk => async dispatch => {
  dispatch(startOperation('LOAD'));
  try {
    const {data} = await axios.get<BackendCountResponse>(url)
    dispatch(setValue(data.count));
    // this is not checked at runtime
    console.log(data.nada)
  } catch (error) {
    console.error("Fetch failed", error);
  } finally {
    dispatch(endOperation('LOAD'));
  }

}


// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectCount = (state: RootState) => state.counter.value;
export const selectInProgress = (state: RootState) => state.counter.operationInProgress;
export const selectIsConfigured = (state: RootState) => state.counter.backendApiUrl !== undefined;

export default counterSlice.reducer;
