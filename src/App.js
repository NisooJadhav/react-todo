import React, { useState, useEffect } from 'react';
import './App.css';
import List from './List';
import Alert from './Alert';

const getLocalStorage = () => {
  let list = localStorage.getItem('list')
  if (list) {
    return JSON.parse(localStorage.getItem('list'))
  }
  else {
    return []
  }
}

export default function App() {
  const [name, setName] = useState('');
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: '', type: '' });

  // will handle submit event
  const handleSubmit = (e) => {
    e.preventDefault()

    if (!name) {
      // display alert
      showAlert(true, 'danger', 'please enter proper todo')
    }
    else if (name && isEditing) {
      // deal with edit
      setList(list.map((todo) => {
        if (todo.id === editId) {
          return { ...todo, title: name }
        }
        return todo
      })
      )
      setName('');
      setEditId(null);
      setIsEditing(false);
      showAlert(true, 'success', 'todo updated')
    }
    else {
      // display alert
      showAlert(true, 'success', 'todo added to list')
      const newTodo = { id: new Date().getTime().toString(), title: name }
      setList([...list, newTodo])
      setName('')
    }
  }

  const showAlert = (show = false, type = '', msg = "") => {
    setAlert({ show, type, msg })
  }

  const clearList = () => {
    showAlert(true, 'danger', 'cleared to do list')
    setList([])
  }

  const removeTodo = (id) => {
    showAlert(true, 'danger', 'todo removed')
    setList(list.filter((todo) => todo.id !== id))
  }

  const editTodo = (id) => {
    const specificTodo = list.find((todo) => todo.id === id)
    setIsEditing(true)
    setEditId(id)
    setName(specificTodo.title)
  }

  // using local storage
  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list))

  },/*every time list change it will use local storage*/[list])

  return (
    <div className="App">
      <section className="section-center">
        <form action="" className='todo-form' onSubmit={handleSubmit}>
          {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
          <h3>To Do App</h3>
          <div className='form-control'>
            <input type="text" className='todo' placeholder='e.g. wash clothes' value={name} onChange={(e) => setName(e.target.value)} />
            <button type='submit' className='submit-btn'>
              {
                isEditing ? 'edit' : 'submit'
              }
            </button>
          </div>
        </form>

        {list.length > 0 && (
          <div className='todo-container'>
            {/* todo prop below */}
            <List todos={list} removeTodo={removeTodo} editTodo={editTodo} />
            <button className='clear-btn' onClick={clearList}>clear todo list</button>
          </div>
        )}
      </section>
    </div>
  );
}