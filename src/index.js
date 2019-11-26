import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// the createStore fucntion initializes a Redux-Store,
// in order to call it we need it imported
import { createStore } from 'redux'

// The Provider Component will make out Redux-Store available to all nested
// Conponents, lets import it, so we can use it
import { Provider } from 'react-redux'

// This is the default State of our Redux-Store,
// we define it as a const in order to gain readability
// we'll use it as the default value for 'state' in createStore
let defaultState = { todo:[] }

// The reduce function manipulates our store
// it is the sole source of truth for the state of our application
let reducer = (state=defaultState,action)=>{
  // state is the current state from redux, it defaults to our defaultState
  // action is the message coming in via dispatch, a plain object
  //   it MUST contain type, other properties are optional
  let {type} = action // destucture type from the action parameter
  let newTodoList     // this will keep a copy of the todo-list
  switch (type){
    case "DEL":
      newTodoList = [...state.todo]      // clone state.todo
      newTodoList.splice(action.index,1) // cut out the item at index
      return {todo:newTodoList};         // update state.todo with newTodoList
    case "ADD":
      newTodoList = state.todo.slice()   // clone state.todo, oldskool syntax
      newTodoList.push({                 // add new item to the copy
        text: action.value,
        status: 'todo'
      })
      return {todo:newTodoList};         // update state.todo with newTodoList
    default: return state;
  }
}

// create a new Redux-Store using our reducer function
let store = createStore( reducer )

ReactDOM.render(
  // Make the redux store available to all child components
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
