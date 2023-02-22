import axios from "axios";
import React, { useEffect, useState } from "react";
import './index.css'
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');

export default function Header({app}) {
    const API_URL = 'http://localhost:3000'
    const [usersCount, setUsersCount] = useState(0)
    useEffect(()=>{
            axios.get(`${API_URL}/users`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                }
            }).then(res => {
                setUsersCount(res.data.length)
            })

            socket.on('connect', () => {
                console.log('connected');
            })
            socket.on('increaseUsers', () => {
                setUsersCount(usersCount => usersCount + 1);
              });
    }, [])
    return (
        <div className="header">
        <div className="header_title">Header</div>
        <h3>Number of users in db: {usersCount}</h3>
        <button className="logout" onClick={() =>{app.onLogOut()}} style={{width: '250px'}}>Log out</button>
        </div>
    )
}