import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../redux/todoSlice";

const Header = () => {
  const [newTodo, setNewTodo] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTodo) {
      dispatch(
        addTodo({
          task: newTodo
        })
      );
      setNewTodo("");
    }
  };
  const handleReset = () => {
    setNewTodo("");
  };
  return (
    <form onSubmit={handleSubmit} className="input-group mb-3">
      <input
        type="text"
        value={newTodo}
        className="form-control"
        placeholder="New Task..."
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <div className="input-group-append">
        <button className="btn btn-outline-primary" type="submit">
          Submit
        </button>
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
    </form>
  );
};

export default Header;
