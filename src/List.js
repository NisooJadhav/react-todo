import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa'

// passing todos prop
// todos = all todo
// removeTodo = to remove particular todo
const List = ({ todos, removeTodo, editTodo }) => {
    return (
        <div className='todo'>
            {todos.map((todo) => {
                const { id, title } = todo
                return <article key={id} className="todo-todo">
                    <p className='title'>{title}</p>

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