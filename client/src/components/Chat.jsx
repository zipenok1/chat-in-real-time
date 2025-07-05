import React, { useEffect, useState } from "react";
import io from 'socket.io-client';
import { Link, useLocation } from "react-router-dom";
import '../stules/chat.css'
import Messages from "./Messages";

const socket = io.connect("http://localhost:5000");

function Chat() {
  const { search } = useLocation();
  const [params, setParams] = useState({ user: '', room: '' }); 
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const searchParams = Object.fromEntries(new URLSearchParams(search));
    setParams(searchParams);   
    socket.emit("join", searchParams);
  }, [search]);
 
  useEffect(() => {
    socket.on('message', ({ data }) => {
      setMessages(prevMessages => [...prevMessages, data]);
    });

    return () => {
      socket.off('message');
    };
  }, []);
  
  const handleChange = ({ target: { value } }) => {
    setMessage(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    socket.emit('sendMessage', { message, params });
    setMessage('');
  };

  return (
    <div className="chat-container">
      <div className="chat-window">
        <header className="chat-header">
          <div className="room-info">
            <h2 className="room-name">ZipChat</h2>
            <span className="app-name">room: {params.room}</span>
          </div>
          <Link to="/" className="exit-button">
            Выйти
          </Link>  
        </header>
        
        <main className="chat-messages">
          <Messages messages={messages} name={params.name} />
        </main>
        
        <footer className="chat-input">
          <form onSubmit={handleSubmit} className="message-form">
            <input
              type="text" 
              name="message"
              placeholder="Введите сообщение..."
              value={message}
              autoComplete="off"
              onChange={handleChange}
              required
              className="message-input"
            />
            <button type="submit" className="send-button">
              Отправить
            </button>
          </form>
        </footer>
      </div>
    </div>
  );
}

export default Chat;