import Button from "/src/components/Button.jsx";

export default function TodoListItem({ todo, onRemoveTodo }) {
  return (
    <li className="todo-list-item">
      <span>{todo.title}</span>
      <Button onClick={() => onRemoveTodo(todo.id)}>Remove</Button>
    </li>
  );
}
