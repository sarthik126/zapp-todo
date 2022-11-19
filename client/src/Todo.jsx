import React, { useRef } from "react";
import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { addTodo, removeTodo, updateTodo, clearTodo } from "./store/store";

export default function Todo() {
  const [data, setData] = useState("");
  const headerRef = useRef()
  const todos = useSelector((state) => state.todo.value);
  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(addTodo({ value: data, done: false }));
    setData("")
  }

  return (
    <div>
      <header ref={headerRef}>
        <h2>Zapp Todo</h2>
        <button onClick={() => dispatch(clearTodo())}>Clear Todos ({todos.length})</button>
      </header>

      <form onSubmit={handleSubmit}>
        <input placeholder="Enter Todo..." required value={data} type="text" onChange={(e) => setData(e.target.value)} />
        <button>Add Todo</button>
      </form>
      <ul>
        {todos.length ?
        todos.map((item, index) => (
          <li key={index}>
            {!item.done ? <div onClick={()=>dispatch(updateTodo(index))} className="todo-value">{`${index+1}. ${item.value}`}</div> : <strike onClick={()=>dispatch(updateTodo(index))}>{`${index+1}. ${item.value}`}</strike>}
            <button onClick={() => dispatch(removeTodo(index))}>Delete</button>
          </li>
        ))
        : <div className="no-todos">No Todos...</div>}
      </ul>

      {todos.length ? <div className="top"><button onClick={()=> headerRef.current.scrollIntoView({behavior:"smooth"})}>Move to Top</button></div> : ""}
    </div>
  );
}
