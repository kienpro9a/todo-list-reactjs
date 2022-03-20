import React, { useState } from "react";
import _ from "lodash";
import { useSelector } from "react-redux";
import TodoItem from "./todoItem";
import { Input, Stack, Checkbox, CheckboxGroup, Box } from "@chakra-ui/react";

const Section = () => {
  const todo = useSelector((state) => state.todos);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState([]);
  const options = [
    { id: 1, label: "Completed" },
    { id: 2, label: "Not-complete" }
  ];
  const [checkAll, setCheckAll] = useState(false);
  const onChangeCheck = (value) => {
    setFilter(value);
    if (value.length === 2) {
      setCheckAll(true);
    } else {
      setCheckAll(false);
    }
  };
  const onChangeCheckAll = (e) => {
    if (e.target.checked) {
      setCheckAll(true);
      setFilter(options.map((option) => option.label));
    } else {
      setCheckAll(false);
      setFilter([]);
    }
  };
  const todoMap = todo.filter((s) => s.task.toLowerCase().indexOf(search) > -1);
  return (
    <Box>
      <Input
        mb="4"
        placeholder="Search"
        onChange={(e) => setSearch(e.target.value)}
        _focus={{ bg: "white", borderColor: "blue.100" }}
      />
      <Stack mb="4" spacing={[1, 5]} direction={["column", "row"]}>
        <Checkbox onChange={onChangeCheckAll} isChecked={checkAll}>
          All
        </Checkbox>
        <CheckboxGroup onChange={onChangeCheck} value={filter}>
          {options.map((option) => (
            <Checkbox key={option.id} value={option.label}>
              {option.label}
            </Checkbox>
          ))}
        </CheckboxGroup>
      </Stack>
      {todoMap.length ? (
        <Box>
          {todoMap.map((todo) => {
            if (
              (todo.completed && _.includes(filter, options[0].label)) ||
              (!todo.completed && _.includes(filter, options[1].label)) ||
              _.isEmpty(filter)
            )
              return <TodoItem key={todo.id} todo={todo} />;
            return null;
          })}
        </Box>
      ) : (
        <Box bg="yellow.100" p="4">
          There are no tasks, please add a new one
        </Box>
      )}
    </Box>
  );
};

export default Section;