import React, { useState, useRef, useEffect } from 'react'
import { v1 as uuidv1 } from 'uuid'
import Todo from './Todo'
import './TodoList.css'
import {AnimatePresence, motion} from 'framer-motion'
import { Icon, InlineIcon } from '@iconify/react';
import penIcon from '@iconify/icons-fa-solid/pen';

export default function TodoList({color, id, handler, listname}) {
    const [todos, setTodos] = useState([])
    const todoRef = useRef()

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem(id))
        if (items != null) {
            setTodos(items)
        }
    }, []) 

    useEffect(() => {
        localStorage.setItem(id, JSON.stringify(todos))
    }, [todos]) 

    function handleKeyPress(e) {
        if (e.charCode === 13) {
            addTodo()
        }
    }

    function checkTodo(id) {
        console.log("button clicked");
        const currstate = [...todos]
        const todo = currstate.find(todo => todo.id === id)
        todo.checked = !todo.checked
        setTodos(currstate)
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

    function checkStorage() {
        const data = localStorage.getItem(id)
        if (data != null) {
            return true 
        }
        return false 
    }

    const transition = {
        type: "spring",
        stiffness: 260,
        damping: 20
    }

    return (
        <>
            <AnimatePresence initial={checkStorage() ? false : true}>
                <motion.div initial={{scale: 0}} animate={{rotate: 360, scale: 1}} transition={transition} className="list" style={{backgroundColor: color}}>
                    <input className="listname" placeholder="Enter list name.." onChange={(e) => handler(id, e.target.value)} value={listname}/>
                    {todos.map(todo => <Todo key={todo.id} todo={todo} handler={checkTodo}/>)}
                    <div className="editList">
                        <input id="todoAdd" ref={todoRef} type="text" onKeyPress={handleKeyPress}/>
                        <button className="editbutton" onClick={addTodo}>Add</button>
                        <button className="editbutton">Clear done</button>
                    </div>
                    <Icon className="pen" icon={penIcon} />
                </motion.div>
            </AnimatePresence>
        </>
    )
}
