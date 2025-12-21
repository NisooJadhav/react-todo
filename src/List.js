import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa'

const List = ({ todos, removeTodo, editTodo, toggleComplete }) => {
    return (
        <div className='todo'>
            {todos.map((todo) => {
                const { id, title, completed } = todo
                return <article key={id} className={`todo-todo ${completed ? 'completed' : ''}`}>
                    <div className="left">
                        <input type="checkbox" className="todo-checkbox" checked={!!completed} onChange={() => toggleComplete(id)} />
                        <p className='title'>{title}</p>
                    </div>

                    <div className='btn-container'>
                        <button type='button' className='edit-btn' onClick={() => editTodo(id)}><FaEdit/></button>
                        <button type='button' className='delete-btn' onClick={() => removeTodo(id)}><FaTrash /> </button>
                    </div>
                </article>
            })}
        </div>
    );
}

export default List;