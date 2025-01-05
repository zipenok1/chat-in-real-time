import React, { useEffect, useState } from "react";
import io from 'socket.io-client'
import { data, Link, useLocation } from "react-router-dom";
import '../stules/chat.css'
import tit from '../imeges/prank2.gif'
const socket = io.connect("http://localhost:5000")

function Chat() {
  const { search } = useLocation();
  const [params, setParams] = useState({  user:'', room:''  }); 
  const [state, setState] = useState([])
  
  useEffect(()=>{
    const searchParams = Object.fromEntries(new URLSearchParams(search));
    setParams(searchParams);   
    socket.emit("join", searchParams);
  },[search])
 
  useEffect(()=>{
    socket.on('message', ({data})=>{
      setState((_state)=> ([..._state, data]))
    })
  }, [])
  
  
  return (
    <div className="Chat">
      <div className="chat__box">
        <div className="chat__top">
          <h2>{params.room}</h2>
          <p>is in the room</p>
          <Link to={`/`}>
          <button>get out</button>
          </Link>  
        </div>
          <div className="chat__body">
            <div className="body__hui"> 
            {state.map(({message}) =>
                <span className="hi">{message}</span>
              )}
              </div>
            <img src={tit} alt="tit" />
          </div>
            <div className="chat__bot">
              <input type="text" />
              <button>send</button>
            </div>
      </div>
    </div>
  );
}

export default Chat;