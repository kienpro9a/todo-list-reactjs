import React, { useState } from "react";
import {
  Checkbox,
  Button,
  Flex,
  Spacer,
  Center,
  Icon,
  Input,
  Box
} from "@chakra-ui/react";
import { MdDeleteOutline, MdEdit, MdSave } from "react-icons/md";
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
    <Flex bg="gray.100" mb="1" pl="4">
      <Box display="contents">
        <Checkbox onChange={handleCheck} isChecked={todo.completed} mr="4" />
        {!_.isEmpty(edit) && edit.id === todo.id ? (
          <Input
            type="text"
            width="auto"
            value={edit.task}
            onChange={(e) => handleEditOnChange(e.target.value)}
            autoFocus
            _focus={{ bg: "white", borderColor: "blue.100" }}
          />
        ) : (
          <Center
            cursor="pointer"
            onClick={handleCheck}
            as={todo.completed ? "s" : null}
          >
            {todo.task}
          </Center>
        )}
      </Box>
      <Spacer />
      <Box>
        {!_.isEmpty(edit) && edit.id === todo.id ? (
          <Button
            leftIcon={<Icon as={MdSave} />}
            colorScheme="teal"
            variant="outline"
            onClick={handleSaveEdit}
          >
            Save
          </Button>
        ) : (
          <Button
            leftIcon={<Icon as={MdEdit} />}
            colorScheme="blue"
            variant="outline"
            onClick={() => handleEdit(todo)}
          >
            Edit
          </Button>
        )}
        <Button
          leftIcon={<Icon as={MdDeleteOutline} />}
          colorScheme="red"
          variant="outline"
          onClick={handleDelete}
          ml="1"
        >
          Delete
        </Button>
      </Box>
    </Flex>
  );
};

export default TodoItem;