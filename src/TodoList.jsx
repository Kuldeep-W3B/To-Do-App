import React from "react";


const TodoList = (props) =>{
    return (
        <>
        <div className="todo_style">
        <h1 className="times" onClick={() =>{
            props.onSelect(props.id);
        }}>x</h1>
        <li>{props.text}</li>
        </div>
        </>
    )
};



export default TodoList;