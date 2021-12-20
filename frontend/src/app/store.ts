import { createStore } from 'redux'

// function counterReducer(state = { value: 0 }, action) {
//   switch (action.type) {
//     case 'counter/incremented':
//       return { value: state.value + 1 }
//     case 'counter/decremented':
//       return { value: state.value - 1 }
//     default:
//       return state
//   }
// }
//
export function getExchanges() {
  return fetch('/exchanges', {method: 'GET'}).then(res => res.json());
}

// Create a Redux store holding the state of your app.
// Its API is { subscribe, dispatch, getState }.
let store = createStore(getExchanges);

// You can use subscribe() to update the UI in response to state changes.
// Normally you'd use a view binding library (e.g. React Redux) rather than subscribe() directly.
// There may be additional use cases where it's helpful to subscribe as well.

store.subscribe(() => console.log(store.getState()))

export default store;
