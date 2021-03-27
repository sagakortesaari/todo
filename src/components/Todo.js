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
                {todo.name}
            </div>
        </>
    )
}
