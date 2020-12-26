import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import reducer from './reducers';
// в store только getState и dispatch
const logMiddleware = ({ getState }) => (next) => (action) => {
    console.log(action.type, getState());
    return next(action)
}
 // next - dispatch
const stringMiddleware = () => (next) => (action) => {
  if (typeof action === 'string') {
    return next({
      type: action
    })
  }
  return next(action);
}

// applyMiddleware это встроеный в редакс storeEnhancer
const store = createStore(reducer, applyMiddleware(
  thunkMiddleware,stringMiddleware,logMiddleware));


const delayedActionCreator = (timeout) => (dispatch) => {
    setTimeout(() => dispatch({
      type: 'DELAYED_ACTION'
    }), timeout)
}

store.dispatch(delayedActionCreator(3000));

export default store;


// const logEnhancer = (createStore) => (...args) => {
//   const store = createStore(...args);
//   const originalDispatch = store.dispatch;

//   store.dispatch = (action) => {
//     console.log(action.type);
//     return originalDispatch(action)
//   }
//   return store;
// }

// const stringEnhancer = (createStore) => (...args) => {
//   const store = createStore(...args);
//   const originalDispatch = store.dispatch;

//   store.dispatch = (action) => {
//   if (typeof action === 'string') {
//     return originalDispatch({
//       type: action
//     })
//   }

//   return originalDispatch(action)
//   }
//   return store;
// }