import React, { cache, useEffect, useState } from "react";
import './stules/LongPul.css'
import axios from "axios"

function LongPul() {

    const[meseg,setMeseg] = useState([])
    const[value,setVelue]= useState()

    useEffect(()=>{
        subscript()
    },[])

    const subscript= async ()=>{
        try{
          const {data} =  await axios.get('http://localhost:5000/get-message')
          setMeseg(prev => [data, ...prev])
          await subscript()
        } catch (e) {
            setTimeout(()=>{
                subscript()
            },500)
        }
    }

    const sendMes = async () =>{
        await axios.post('http://localhost:5000/new-message', {
            massega: value,
            id: Date.now()
        })
    }

    return (
      <div className="longPul">
        <div className="logBox"> 
            <div className="form">
                <input value={value} onChange={e => setVelue(e.target.value)} type="text"/>
                <button onClick={sendMes}>отправить</button>
            </div>

            <div>
                {meseg.map(mess => 
                    <div className="mas" key={mess.id}>
                        {mess.massega}
                    </div>
                )}
            </div>
        </div>
      </div>
    );
}

export default LongPul;