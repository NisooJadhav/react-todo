import React, { useState, useEffect } from 'react';
import './index.css';
import List from './List';
import Alert from './Alert';
import './Randombg'
import { FaEdit } from 'react-icons/fa'

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
  const [toast, setToast] = useState({ show: false, msg: '' });

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!name) {
      showAlert(true, 'danger', 'please enter proper todo')
    }
    else if (name && isEditing) {
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
      const newTodo = { id: new Date().getTime().toString(), title: name, completed: false }
      setList([...list, newTodo])
      setName('')
    }
  }

  const toggleComplete = (id) => {
    setList(list.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed }
      }
      return todo
    }))
  }

  const showAlert = (show = false, type = '', msg = "") => {
    setAlert({ show, type, msg })
  }

  const clearList = () => {
    setList([])
    setToast({ show: true, msg: 'Todo list cleared' })
    setTimeout(() => setToast({ show: false, msg: '' }), 3000)
  }

  const removeTodo = (id) => {
    setList(list.filter((todo) => todo.id !== id))
    setToast({ show: true, msg: 'Todo removed' })
    setTimeout(() => setToast({ show: false, msg: '' }), 3000)
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

  },[list])

  return (
    <div className="App">
      <section className="section-center">
        {toast.show && <div className="toast">{toast.msg}</div>}
        <form action="" className='todo-form' onSubmit={handleSubmit}>
          {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
          <h3>To Do App</h3>
          <div className='form-control'>
            <input type="text" className='todo' placeholder='e.g. wash clothes' value={name} onChange={(e) => setName(e.target.value)} />
            <button type='submit' className='submit-btn'>
              {
                isEditing ? <FaEdit /> : '✔️'
              }
            </button>
          </div>
        </form>

        {list.length > 0 && (
          <div className='todo-container'>
              <List todos={list} removeTodo={removeTodo} editTodo={editTodo} toggleComplete={toggleComplete} />
            <button className='clear-btn' onClick={clearList}>clear todo list</button>
          </div>
        )}
      </section>
    </div>
  );
}
