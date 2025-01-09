import React from "react";
import '../stules/messages.css'

function Messages({messages}) {
    return (
        <div className="messages">
            {messages.map(({user, message}, i) =>{
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