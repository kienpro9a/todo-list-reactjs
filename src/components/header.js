import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../redux/todoSlice";
import {
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button
} from "@chakra-ui/react";

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
    <form onSubmit={handleSubmit}>
      <FormLabel>Add todo list</FormLabel>
      <InputGroup pb="4">
        <Input
          pr="9rem"
          type="text"
          value={newTodo}
          placeholder="New Task..."
          _focus={{ bg: "white", borderColor: "blue.100" }}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <InputRightElement width="9rem">
          <Button type="submit" colorScheme="blue" size="sm">
            Submit
          </Button>
          <Button colorScheme="blue" size="sm" onClick={handleReset}>
            Clear
          </Button>
        </InputRightElement>
      </InputGroup>
    </form>
  );
};

export default Header;