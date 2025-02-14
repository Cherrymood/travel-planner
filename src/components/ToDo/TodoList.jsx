import TodoListItem from "./TodoListItem";

export default function TodoList({ todoList, onRemoveTodo }) {
  return (
    <ul className="todo-list">
      {todoList.map((task) => {
        console.log(task);
        return (
          <TodoListItem key={task.id} todo={task} onRemoveTodo={onRemoveTodo} />
        );
      })}
    </ul>
  );
}
