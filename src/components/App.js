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

  function handleKeyPress(e) {
    if (e.charCode === 13) {
      addTodo()
    }
  }

  function addTodo() {
    // Generate a unique ID for each key 
    const id = uuidv1()
    const val = todoRef.current.value 
    if (val && val.trim()) {
      const newtodo = {name: val, id: id, checked: false}
      const newtodos = [...todos, newtodo]
      setTodos(newtodos)
      todoRef.current.value = null
    }
  }

  return (
    <>
      <TodoList todos={todos} handler={checkTodo}/>
      <input ref={todoRef} type="text" onKeyPress={handleKeyPress}/>
      <button onClick={addTodo}>Add</button>
      <button>Clear done</button>
    </>
  );
}

export default App;
