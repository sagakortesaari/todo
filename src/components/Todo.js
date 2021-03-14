import React from 'react'
import './Todo.css'

export default function Todo({ todo, handler }) {
    function handleCheck(id) {
        handler(id)
    }

    return (
        <>
            <div className="test">
                <input type="checkbox" checked={todo.checked} onChange={() => handleCheck(todo.id)}/>
                {todo.name}
            </div>
        </>
    )
}
