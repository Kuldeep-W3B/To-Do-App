
import React, { useState } from "react";
import TodoList from "./TodoList";

const App = () =>{
    const [num,setnum] = useState("");
    const [item,setitem] = useState([]);
    const submit = (event) =>{
        setnum(event.target.value);
    };
        const list = () =>{
            setitem((old) =>{
            return [...old,num];
        })
        setnum("");
    };
    const deleteitem = (id) =>{
        console.log("deleted");

        setitem((old) =>{
            return old.filter((arrEle, index) =>{
                return index !== id;
            })
        })

    }
    return(
        <>
        <div className="main_div">
        <div className="center_div">
        <br/>
        <h1>ToDo List</h1>
        <br/>
        <input type="text" placeholder="Add a Items" value={num} onChange={submit} />
        <button onClick={list} >+</button>
        <ol>
        {item.map((itemval, index) =>{
            return <TodoList 
            key={index}
            id={index}
            text={itemval}
            onSelect={deleteitem}
            />
        })}
        </ol>
        </div>
        </div>
        </>
    )
};

export default App;