import { useState } from "react";
import Button from "/src/components/Button.jsx";
import InputWithLabel from "./InputWithLabel";

export default function AddTodoForm({ onAddTodo }) {
  const [todoTitle, setTodoTitle] = useState("");

  function handleTitleChange(e) {
    setTodoTitle(e.target.value);
  }

  function handleAddTodo(e) {
    e.preventDefault();

    const newTodoTitle = {
      id: Date.now(),
      title: todoTitle,
    };

    if (todoTitle.trim() !== "") {
      onAddTodo(newTodoTitle);
      setTodoTitle("");
    } else {
      alert("Please enter a valid todo title.");
    }
  }

  return (
    <div className="add-todo-list">
      <form onSubmit={handleAddTodo}>
        <InputWithLabel
          todoTitle={todoTitle}
          handleTitleChange={handleTitleChange}
        >
          Title
        </InputWithLabel>
        <Button className="button-33" type="submit">
          Add
        </Button>
      </form>
    </div>
  );
}
