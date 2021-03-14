import React, { useState, useEffect } from 'react'
import TodoList from './TodoList'
import { v1 as uuidv1 } from 'uuid'
import './App.css'

function App() {
    const [lists ,setLists] = useState([])

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('lists'))
        if (items != null) {
        setLists(items)
        }
    }, []) 

    useEffect(() => {
        localStorage.setItem('lists', JSON.stringify(lists))
    }, [lists]) 

    function addList() {
        const id = uuidv1()
        const newlist = {color: '#fff', id: id}
        const currstate = [...lists, newlist]
        setLists(currstate)
    }

    return (
        <>
            <div><button onClick={addList}>Add list</button></div>
            {lists.map(list => <TodoList key={list.id} color={list.color} id={list.id}/>)}
        </>
    );
}

export default App;
