import React from 'react';
import logo from './logo.svg';
import './App.css';

// We need the connect function in order to create COmponents that are
// connected to the Redux-Store, this wil magically add the dispatch prop
// to the resulting components
// connect()(Component) => WrappedComponentWithDispatch
import { connect } from 'react-redux'

// This is a helper function for connect, it will be the first argument
// it's purpose is to transform the state out of redux into props
// for the underlying component. this simple form takes whole state
// and makes it the props object
const mapAllProps = (state)=>{ return state }

// This is and underlying Component it will be wrapped with connect, in order to
// get the dispatch function, so we call it ToDoItem, the wrapped version will
// be called Item
function ToDoItem({item,index,dispatch}){
  // we take item, index and dispatch from props, dispatch is only available
  // because we wrap this Component with connect and then use the wrapped version

  let {text, state} = item // text and state are the actual entries of a todo item

  const click = ()=> {
    // this click handler will dispatch a DEL message towards our reducer
    // index is the actual array-index from our todo list
    dispatch({type:"DEL",index:index})
  }

  return <div>{index} <b>{text}</b> {state} <button onClick={click}>OK</button></div>
}

// Connect our ToDoItem with the Redux-Store and call the result Item
let Item  = connect()(ToDoItem)

// This Component takes our todo-list from th Redux-Store and renders
// and Item for each element in the array, it suppplies the index
// so Item knows which element to remove when the DEL action is dispatched
function ToDoItemList(props){
  return props.todo.map( (item,index)=>{
    return <Item item={item} index={index}/>
  })
}

// Connect our ToDoItemList with the Redux-Store and call the result List
// use the mapAllProps function to get the whole Redux-State into props
let List  = connect( mapAllProps )(ToDoItemList)

// Next we need a Component to add new items, hence the name :)
// this will keep the current value of an input field in state.value
// by updating the value using the onChange handler
// When the USer clicks the Add button an ADD message will be dispatched
class AddToDoItem extends React.Component {
  state = {value:""} // define the default state
  add = (e)=>{
    // dispatch an ADD message using this.state.value
    this.props.dispatch({
      type:"ADD", value:this.state.value
  })}
  change = (e)=> {
    // update state.value using the value from the event's target element
    this.setState({value:e.target.value}) }
  render(){
    return (
      <div>
        <input onChange={this.change} value={this.state.value}/>
        <button onClick={this.add}>Add</button>
      </div>)
}}

// Connect our AddToDoItem with the Redux-Store and call the result Input
let Input = connect()(AddToDoItem)

function App(props) {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" width="50" />
        <Input/>
        <List/>
      </header>
    </div>
  );
}

export default App;
