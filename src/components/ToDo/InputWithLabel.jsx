import { useEffect, useRef } from "react";

export default function InputWithLabel({
  todoTitle,
  handleTitleChange,
  children,
}) {
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  });

  return (
    <>
      <label htmlFor="todoTitle">{children} </label>

      <input
        type="text"
        id="todoTitle"
        value={todoTitle} // Controlled component
        onChange={handleTitleChange}
        ref={inputRef}
      />
    </>
  );
}
