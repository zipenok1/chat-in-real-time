import React, { useEffect, useState } from "react";
import io from 'socket.io-client'
import { data, Link, useLocation } from "react-router-dom";
import '../stules/chat.css'
import tit from '../imeges/prank2.gif'
import Messages from "./Messages";
const socket = io.connect("http://localhost:5000")

function Chat() {
  const { search } = useLocation();
  const [params, setParams] = useState({  user:'', room:''  }); 
  const [state, setState] = useState([])
  const [message, setMessage] = useState('')

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
  
  const hendlhe = ({target: {value}}) => {
    setMessage(value)
  }
  const hendSomni = (e) => {
    e.preventDefault()
    if(!message) return;

    socket.emit('sendMessage', {message, params})

    setMessage('')
  }
  return (
    <div className="Chat">
      <div className="chat__box">
        <div className="chat__top">
          <h2>{params.room}</h2>
          <p>ZipChat</p>
          <Link to={`/`}>
          <button>Выйти</button>
          </Link>  
        </div>
          <div className="chat__body">
            <div className="body__hui"> 
              <Messages messages={state} name={params.name}/>
            </div>
            {/* <img src={tit} alt="tit" /> */}
          </div>
            <div className="chat__bot">
              <input className="ca"
                type="text" 
                name="message"
                placeholder="Введите сообщение"
                value={message}
                autoComplete="off"
                onChange={hendlhe}
                required
              />
              <form onSubmit={hendSomni}>
              <input className="sumbt"
                type="submit" 
                value='Отправить' 
                onSubmit={hendSomni}/>
              </form>
            </div>
      </div>
    </div>
  );
}

export default Chat;