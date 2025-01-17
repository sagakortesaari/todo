import React, { useState, useEffect } from 'react'
import TodoList from './TodoList'
import { v1 as uuidv1 } from 'uuid'
import Color from './Color'
import './App.css'
import { Icon, InlineIcon } from '@iconify/react';
import plusCircleSolid from '@iconify/icons-clarity/plus-circle-solid';
//import 'bootstrap/dist/css/bootstrap.min.css';

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
        const newlist = {title: "", color: color, id: id}
        const currstate = [newlist, ...lists]
        setLists(currstate)
    }

    function addTitle(id, title) {
        const lists = JSON.parse(localStorage.getItem('lists'))
        const list = lists.find(list => list.id === id)
        const newlist = list 
        newlist.title = title
        const currstate = [...lists]
        currstate.splice(currstate.indexOf(list), 1, newlist)
        setLists(currstate)
    }

    return (
        <div id="App">
            <div className="sidebar">
                <button onClick={() => setClicked(!clicked)} id="addlist"><Icon id="addicon" icon={plusCircleSolid} /></button>
                <div className="colors">
                    {color.map(color => <Color color={color.color} clicked={clicked} key={color.pos} startingpos={color.pos} handler={addList}/>)}
                </div>
            </div>
            <div className="other">
                <p id="title">time to get shit done</p>
                <div id="todo-lists">
                    {lists.map(list => <TodoList key={list.id} color={list.color} id={list.id} listname={list.title} handler={addTitle}/>)}
                </div>
            </div>
        </div>
    );
}

export default App;
