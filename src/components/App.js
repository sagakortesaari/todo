import React, {useState, useRef} from 'react'
import TodoList from './TodoList'
import { v1 as uuidv1 } from 'uuid'

function App() {
  const [todos, setTodos] = useState([])
  const todoRef = useRef()

  function checkTodo(id) {
    const currstate = [...todos]
    const todo = currstate.find(todo => todo.id === id)
    todo.checked = !todo.checked
    setTodos(currstate)
  }

  function addTodo() {
    // Generate a unique ID for each key 
    const id = uuidv1()
    console.log(id)
    const newtodo = {name: todoRef.current.value, id: id, checked: false}
    const newtodos = [...todos, newtodo]
    setTodos(newtodos)
    todoRef.current.value = null
  }

  return (
    <>
      <TodoList todos={todos} handler={checkTodo}/>
      <input ref={todoRef} type="text"/>
      <button onClick={addTodo}>Add</button>
      <button>Clear done</button>
    </>
  );
}

export default App;
