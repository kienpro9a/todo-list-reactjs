import React, { useState } from 'react'

const Header = ({ todo, setTodo }) => {
  const [newTodo, setNewTodo] = useState('')
  const addTodo = (task) => {
    const id = todo.length ? todo[todo.length - 1].id + 1 : 1
    const list = [...todo, { id, completed: false, task: task }]
    setTodo(list)
    localStorage.setItem('TodoList', JSON.stringify(list))
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!newTodo) return
    addTodo(newTodo)
    setNewTodo('')
  }
  const handleReset = () => {
    setNewTodo('')
  }
  return (
    <form onSubmit={handleSubmit} className='input-group mb-3'>
      <input value={newTodo} className="form-control" placeholder="New Task..." onChange={(e) => setNewTodo(e.target.value)} />
      <div className='input-group-append'>
        <button className="btn btn-outline-primary" type='submit'>Submit</button>
        <button type="button" className="btn btn-outline-primary" onClick={handleReset}>Reset</button>
      </div>
    </form>

  )
}

export default Header