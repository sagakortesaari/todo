import React,  { useState } from 'react'
import './Todo.css'
import { Icon, InlineIcon } from '@iconify/react';
import crossIcon from '@iconify-icons/akar-icons/cross';

export default function Todo({ todo, handler, deletehandler }) {
    const [hover, setHover] = useState(false)

    function handleCheck(id) {
        handler(id)
    }

    function handleHover() {
        setHover(!hover)
    }

    return (
        <>
            <div className="todo" onMouseOver={handleHover} onMouseOut={handleHover}>
                <input className={todo.checked ? "btn checkedButton" : "btn"} type="button" onClick={() => handleCheck(todo.id)}/>
                <span className={todo.checked ? "todoname animate" : "todoname"}>{todo.name}</span>
                <Icon className={hover ? "visible deletetodo" : "invisible deletetodo"} onClick={() => deletehandler(todo)} icon={crossIcon} />
            </div>
        </>
    )
}
