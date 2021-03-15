import React, { useState, useRef, useEffect } from 'react'
import TodoList from './TodoList'
import { v1 as uuidv1 } from 'uuid'
import {useSpring} from 'react-spring'
import {motion} from 'framer-motion'
import Color from './Color'
import './App.css'

function App() {
    const [lists,setLists] = useState([])
    const [clicked, setClicked] = useState(false)
    const color = [{color: '#FF8F8F', pos: 1}, {color:'#C0ADF5', pos: 2}, {color:'#3E98EC', pos:3}, {color:'#A6E29D', pos:4}, {color:'#FFDE88', pos:5}]

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
        setClicked(!clicked)
        //const currstate = [...lists, newlist]
        //setLists(currstate)
    }

    return (
        <div id="App">
            <div className="sidebar">
                <button onClick={addList} id="addlist">+</button>
                <div className="colors">
                    {color.map(color => <Color color={color.color} clicked={clicked} startingpos={color.pos}/>)}
                </div>
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
