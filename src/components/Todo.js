import React from 'react'

export default function Todo({ todo, handler }) {
    function handleCheck(id) {
        handler(id)
    }

    return (
        <>
            <div>
                <input type="checkbox" checked={todo.checked} onChange={() => handleCheck(todo.id)}/>
                {todo.name}
            </div>
        </>
    )
}
