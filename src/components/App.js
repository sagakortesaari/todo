import React, {useState} from 'react'
import TodoList from './TodoList'
import { v1 as uuidv1 } from 'uuid'
import './App.css'

function App() {
    const [todos, setTodos] = useState([])

  /*
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('todos'))
    if (items.length > 0) {
      setTodos(items)
    }
  }, []) 

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos]) */

    function addList() {
        const id = uuidv1()
        const newlist = {color: '#fff', id: id}
        const currstate = [...todos, newlist]
        setTodos(currstate)
    }

    return (
        <>
            <div><button onClick={addList}>Add list</button></div>
            {todos.map(todo => <TodoList key={todo.id} color={todo.color}/>)}
        </>
    );
}

export default App;
