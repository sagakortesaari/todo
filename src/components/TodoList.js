import React, { useState, useRef, useEffect } from 'react'
import { v1 as uuidv1 } from 'uuid'
import Todo from './Todo'
import './TodoList.css'
import {AnimatePresence, motion} from 'framer-motion'
import { Icon, InlineIcon } from '@iconify/react';
import penIcon from '@iconify/icons-fa-solid/pen';
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";

export default function TodoList({color, id, handler, listname}) {
    const [todos, setTodos] = useState([])
    const [clicked, setClicked] = useState(false)
    const [progress, setProgress] = useState(0)
    const [percentage, setPercentage] = useState(0)
    const todoRef = useRef()

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem(id))
        if (items != null) {
            setTodos(items)
        }
    }, []) 

    useEffect(() => {
        localStorage.setItem(id, JSON.stringify(todos))
        checkProgress()
    }, [todos]) 

    useEffect(() => {
        const len = todos.length
        if (len != 0) {
            setPercentage((progress/len)*100)
        } 
    }, [progress])

    function handleKeyPress(e) {
        if (e.charCode === 13) {
            addTodo()
        }
    }

    function checkTodo(id) {
        const currstate = [...todos]
        const todo = currstate.find(todo => todo.id === id)
        const currval = todo.checked
        todo.checked = !todo.checked
        setTodos(currstate)
        if (currval == 0) {
            setProgress(progress+1) 
        } else {
            setProgress(progress-1)
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

    function checkStorage() {
        const data = localStorage.getItem(id)
        if (data != null) {
            return true 
        }
        return false 
    }

    function clearChecked() {
        const listtodos = localStorage.getItem(id)
        let newtodos = []
        JSON.parse(listtodos).forEach(element => {
            if (!element.checked) {
                newtodos.push(element)
            }
        });
        setTodos(newtodos)
    }

    function checkProgress() {
        let amount = 0
        todos.forEach(todo => {
            if (todo.checked) {
                amount++
            }
        })
        console.log(amount)
        setProgress(amount)
    }

    const transition = {
        type: "spring",
        stiffness: 260,
        damping: 20
    }

    const variants = {
        visible: {opacity: 1},
        hidden: {opacity: 0}
    }

    const theme = {
        default: {
            symbol: '😱',
            color: 'pink',
            trailcolor: 'pink' 
        },

        error: {
            symbol: percentage + '%', 
            color: 'pink',
            trailcolor: 'pink' 
        },

        active: {
            symbol: percentage + '%',
            color: 'pink',
            trailcolor: 'pink' 
        },

        success: {
            symbol: '🌟',
            color: 'pink',
            trailcolor: 'pink' 
        }

    }

    return (
        <>
            <AnimatePresence initial={checkStorage() ? false : true}>
                <motion.div initial={{scale: 0}} animate={{rotate: 360, scale: 1}} transition={transition} className="list" style={{backgroundColor: color}}>
                    <input className="listname" placeholder="Enter list name.." onChange={(e) => handler(id, e.target.value)} value={listname}/>
                    <div id="progress">
                        <Progress className="progressbar" theme={theme} percent={percentage}/>
                    </div>
                    {todos.map(todo => <Todo key={todo.id} todo={todo} handler={checkTodo}/>)}
                    <motion.div animate={clicked ? "visible":"hidden"} initial="visible" variants={variants} className="editList">
                        <input id="todoAdd" ref={todoRef} type="text" onKeyPress={handleKeyPress}/>
                        <button className="editbutton" onClick={addTodo}>Add</button>
                        <button className="editbutton" onClick={clearChecked}>Clear done</button>
                    </motion.div>
                    <Icon onClick={() => setClicked(!clicked)} className="pen" icon={penIcon} />
                </motion.div>
            </AnimatePresence>
        </>
    )
}
