import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";
import { useEffect, useState } from "react";

export default function Todo() {
  const [todoList, setToDoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function addTodoHandler(newTodo) {
    // console.log(newTodo);

    const addedTodo = await fetchDataPost(newTodo);

    if (addedTodo) {
      setToDoList((prevTodoList) => [...prevTodoList, addedTodo]);
    } else {
      console.error("Failed to add todo.");
    }
  }

  function removeTodo(id) {
    setToDoList(todoList.filter((todo) => todo.id !== id));
  }

  async function fetchData() {
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
      },
    };

    const url = `https://api.airtable.com/v0/${
      import.meta.env.VITE_AIRTABLE_BASE_ID
    }/${import.meta.env.VITE_TABLE_NAME}`;

    try {
      setIsLoading(true);
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      console.log("Airtable API response:", data);

      const todos = data.records.map((todo) => ({
        id: todo.id,
        title: todo.fields.Title,
      }));

      setToDoList(todos);

      setIsLoading(false);
    } catch (error) {
      console.error(error.message);
    }
  }

  async function fetchDataPost(data) {
    try {
      const airtableData = {
        fields: {
          Title: data.title,
        },
      };

      // console.log(airtableData);

      const response = await fetch(
        `https://api.airtable.com/v0/${
          import.meta.env.VITE_AIRTABLE_BASE_ID
        }/Default`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
          },
          body: JSON.stringify(airtableData),
        }
      );

      // console.log(response);

      if (!response.ok) {
        const message = `Error has ocurred:
                               ${response.status}`;
        throw new Error(message);
      }

      const dataResponse = await response.json();

      return { id: dataResponse.id, title: dataResponse.fields.Title };
    } catch (error) {
      console.log(error.message);
      return null;
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <AddTodoForm onAddTodo={addTodoHandler} />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
      )}
      <h2>New Todo List</h2>
    </div>
  );
}
