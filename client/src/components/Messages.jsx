import React from "react";
import '../stules/messages.css'

function Messages({messages, name}) {
    return (
        <div className="messages">
            {messages.map(({user, message}, i) =>{
                // const itsMe = user.name.trim().toLowerCase() === name.trim().toLowerCase()   
                // const className = itsMe ? document.body.style.me : document.body.style.user;
                return(
                    <div key={i} className='user'>
                        <p>{user.name}</p>
                        <div className="text">{message}</div>
                    </div>
                )
                })}
        </div>
    )
}
export default Messages;