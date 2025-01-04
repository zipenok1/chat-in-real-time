import React, { useState } from "react";
import { Link } from "react-router-dom";
import '../stules/main.css'

const FIELDS = {
    NAME:"name",
    ROOM:"room",
}

function Main() {
    
    const {NAME, ROOM} = FIELDS

    const [values, serValues] = useState({[NAME]:"",[ROOM]:""})

    const handelChang = ({target:{value,name}}) =>{
        serValues({...values,[name]:value})
    }

    const hendelClick = (e) =>{
        const isDiseble = Object.values(values).some((v) => !v);
        if(isDiseble) e.preventDefault()
    }
    
    
  return (
    <div className="Main">
      <div className="containr">
        <h1 className="title">Join</h1>
        <form>
            <input 
            className="field"
            type="text" 
            name="name"
            placeholder="name"
            value={values[NAME]}
            autoComplete="off"
            onChange={handelChang}
            required
            />
            <input
            className="field" 
            type="text" 
            name="room"
            placeholder="room"
            value={values[ROOM]}
            autoComplete="off"
            onChange={handelChang}
            required
            />
            <Link 
            to={`/chat?name=${values[NAME]}&room=${values[ROOM]}`}
            onClick={hendelClick}
            >
                <button className="butt">Login</button>
            </Link>    
        </form>
      </div>
    </div>
  );
}

export default Main;