import React from 'react'
import './Todo.css'

export default function Todo({ todo, handler }) {
    function handleCheck(id) {
        handler(id)
    }

    return (
        <>
            <div className="todo">
                <input className={todo.checked ? "btn checkedButton" : "btn"} type="button" onClick={() => handleCheck(todo.id)}/>
                <span className={todo.checked ? "todoname animate" : "todoname"}>{todo.name}</span>
            </div>
        </>
    )
}
