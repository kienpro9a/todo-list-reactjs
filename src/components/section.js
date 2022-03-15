import React, { useState } from "react";
import { Checkbox } from "antd";
import _ from "lodash";
import { useSelector } from "react-redux";
import TodoItem from "./todoItem";

const Section = () => {
  const todo = useSelector((state) => state.todos);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState([]);
  const [indeterminate, setIndeterminate] = useState(false);
  const [checkAll, setCheckAll] = useState(false);
  const options = [
    { label: "Completed", value: true },
    { label: "Not-complete", value: false }
  ];
  const onCheckChange = (list) => {
    setFilter(list);
    setIndeterminate(!!list.length && list.length < options.length);
    setCheckAll(list.length === options.length);
  };
  const onCheckAllChange = (e) => {
    setFilter(e.target.checked ? options.map((x) => x.value) : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };
  const todoMap = todo
    .filter((s) => s.task.toLowerCase().indexOf(search) > -1)
    .filter((f) => {
      let count = 0;
      if (_.includes(filter, f.completed)) {
        count++;
      }
      if (_.isEmpty(filter)) return true;
      if (count > 0) {
        return true;
      } else {
        return false;
      }
    });
  return (
    <>
      <div className="form-outline mb-3">
        <input
          type="text"
          placeholder="Search"
          className="form-control"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="form-check mb-3">
        <Checkbox
          indeterminate={indeterminate}
          onChange={onCheckAllChange}
          checked={checkAll}
        >
          All
        </Checkbox>
        <Checkbox.Group
          options={options}
          onChange={onCheckChange}
          value={filter}
        />
      </div>
      {todoMap.length ? (
        <div className="todo-list">
          {todoMap.map((todo) => (
            <TodoItem todo={todo} key={todo.id} />
          ))}
        </div>
      ) : (
        <div className="alert alert-warning" role="alert">
          There are no tasks, please add a new one
        </div>
      )}
    </>
  );
};

export default Section;
