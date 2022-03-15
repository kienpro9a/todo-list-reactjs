import React, { useState } from "react";
import { Checkbox, Button } from "antd";
import { DeleteTwoTone, EditTwoTone, SaveTwoTone } from "@ant-design/icons";
import _ from "lodash";
import { checkCompleteTodo, deleteTodo, updateTodo } from "../redux/todoSlice";
import { useDispatch } from "react-redux";

const TodoItem = ({ todo }) => {
  const [edit, setEdit] = useState({});
  const dispatch = useDispatch();
  const handleCheck = () => {
    dispatch(
      checkCompleteTodo({
        id: todo.id,
        completed: !todo.completed
      })
    );
  };
  const handleDelete = () => {
    dispatch(
      deleteTodo({
        id: todo.id
      })
    );
  };
  const handleEdit = (list) => {
    setEdit(list);
  };
  const handleSaveEdit = () => {
    dispatch(
      updateTodo({
        id: todo.id,
        task: edit.task
      })
    );
    setEdit({});
    return;
  };
  const handleEditOnChange = (value) => {
    const list = { ...edit, task: value };
    setEdit(list);
  };
  return (
    <div className="todo-item">
      <Checkbox onChange={handleCheck} checked={todo.completed}>
        {!_.isEmpty(edit) && edit.id === todo.id ? (
          <>
            <input
              value={edit.task}
              className="form-control"
              onChange={(e) => handleEditOnChange(e.target.value)}
            />
          </>
        ) : (
          <div
            className={todo.completed ? "text-decoration-line-through" : null}
          >
            {todo.task}
          </div>
        )}
      </Checkbox>
      <div className="float-end">
        {!_.isEmpty(edit) && edit.id === todo.id ? (
          <Button
            icon={<SaveTwoTone twoToneColor="#6666ff" />}
            size="large"
            onClick={handleSaveEdit}
          />
        ) : (
          <Button
            icon={<EditTwoTone twoToneColor="#6666ff" />}
            size="large"
            onClick={() => handleEdit(todo)}
          />
        )}
        <Button
          icon={<DeleteTwoTone twoToneColor="#ff0000" />}
          size="large"
          onClick={handleDelete}
        />
      </div>
    </div>
  );
};

export default TodoItem;
