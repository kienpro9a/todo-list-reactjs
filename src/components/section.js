import React, { useEffect, useState } from 'react'
import { Checkbox, Button } from 'antd';
import { DeleteTwoTone, EditTwoTone, SaveTwoTone } from '@ant-design/icons';
import _ from 'lodash'

const Section = ({ todo, setTodo }) => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState([]);
  const [indeterminate, setIndeterminate] = React.useState(false);
  const [checkAll, setCheckAll] = React.useState(false);

  const [edit, setEdit] = useState({})

  const options = [
    { label: 'Completed', value: true },
    { label: 'Not-complete', value: false }
  ]

  const handleCheck = (id) => {
    const list = todo.map(data => data.id === id ? { ...data, completed: !data.completed } : data)
    setTodo(list)
    localStorage.setItem('TodoList', JSON.stringify(list))
  }

  const handleDelete = (id) => {
    const list = todo.filter(data => data.id !== id)
    setTodo(list)
    localStorage.setItem('TodoList', JSON.stringify(list))
  }

  const onCheckChange = list => {
    setFilter(list);
    setIndeterminate(!!list.length && list.length < options.length);
    setCheckAll(list.length === options.length);
  };

  const onCheckAllChange = e => {
    setFilter(e.target.checked ? options.map(x => x.value) : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };

  const handleEdit = list => {
    setEdit(list)
  }

  const handleSaveEdit = list => {
    const listEdit = [...todo]
    const objIndex = listEdit.findIndex(x => x.id === list.id)
    listEdit[objIndex].task = edit.task
    setTodo(listEdit)
    localStorage.setItem('TodoList', JSON.stringify(listEdit))
    setEdit({})
    return
  }

  useEffect(() => {
    console.log(edit)
  }, [edit])

  const handleEditOnChange = value => {
    const list = { ...edit, task: value }
    setEdit(list)
  }

  const todoMap = todo.filter(s => s.task.toLowerCase().indexOf(search) > -1).filter(f => {
    let count = 0
    if (_.includes(filter, f.completed)) {
      count++
    }
    if (_.isEmpty(filter)) return true
    if (count > 0) {
      return true
    } else {
      return false
    }
  })

  return (
    <>
      <div className='form-outline mb-3'>
        <input type='text' placeholder="Search" className="form-control" onChange={e => setSearch(e.target.value)} />
      </div>
      <div className='form-check mb-3'>
        <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>All</Checkbox>
        <Checkbox.Group options={options} onChange={onCheckChange} value={filter} />
      </div>
      {todoMap.length ? (
        <div className='todo-list'>
          {todoMap.map(data => (
            <div className="todo-item" key={data.id}>
              <Checkbox onChange={() => handleCheck(data.id)} checked={data.completed} >
                {!_.isEmpty(edit) && edit.id === data.id ?
                  <>
                    <input value={edit.task} className="form-control" onChange={e => handleEditOnChange(e.target.value)} />
                  </> :
                  <div className={(data.completed ? 'text-decoration-line-through' : null)} >
                    {data.task}
                  </div>
                }
              </Checkbox>
              <div className='float-end'>
                {!_.isEmpty(edit) && edit.id === data.id ?
                  <Button icon={<SaveTwoTone twoToneColor="#6666ff" />} size='large' onClick={() => handleSaveEdit(data)} />
                  :
                  <Button icon={<EditTwoTone twoToneColor="#6666ff" />} size='large' onClick={() => handleEdit(data)} />
                }
                <Button icon={<DeleteTwoTone twoToneColor="#ff0000" />} size='large' onClick={() => handleDelete(data.id)} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="alert alert-warning" role="alert">There are no tasks, please add a new one</div>
      )}
    </>
  )
}

export default Section