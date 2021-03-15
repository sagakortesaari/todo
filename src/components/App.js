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

    function addList(color) {
        const id = uuidv1()
        console.log("hiiiiiiii")
        const newlist = {color: color, id: id}
        const currstate = [newlist, ...lists]
        setLists(currstate)
    }

    return (
        <div id="App">
            <div className="sidebar">
                <button onClick={() => setClicked(!clicked)} id="addlist">+</button>
                <div className="colors">
                    {color.map(color => <Color color={color.color} clicked={clicked} startingpos={color.pos} handler={addList}/>)}
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
