import React, { useState, useRef, useEffect } from 'react'
import TodoList from './TodoList'
import { v1 as uuidv1 } from 'uuid'
import './App.css'

function App() {
    const [lists,setLists] = useState([])

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
        const newlist = {color: '#000', id: id}
        const currstate = [...lists, newlist]
        setLists(currstate)
    }

    return (
        <div id="App">
            <div className="sidebar">
                <button onClick={addList} id="addlist">+</button>
                <button className="color" style={{backgroundColor:'#FF8F8F'}}></button>
                <button className="color" style={{backgroundColor:'#C0ADF5'}}></button>
                <button className="color" style={{backgroundColor:'#3E98EC'}}></button>
                <button className="color" style={{backgroundColor:'#A6E29D'}}></button>
                <button className="color" style={{backgroundColor:'#FFDE88'}}></button>
            </div>
            <div className="other">
                <p id="title">To-do</p>
                <div id="todo-lists">
                    {lists.map(list => <TodoList key={list.id} color={list.color} id={list.id}/>)}
                </div>
            </div>
        </div>
    );
}

export default App;
