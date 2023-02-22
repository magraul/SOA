import React, { useState, useEffect } from "react";
import axios from "axios";
import './index.css'
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');

export default function Footer() {
    const API_URL = 'http://localhost:3000'
    useEffect(()=>{
        axios.get(`${API_URL}/animals`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            }
        }).then(res => {
            setAnimalsCount(res.data.length)
        })

        socket.on('increaseAnimals', () => {
            setAnimalsCount(animalsCount => animalsCount + 1);
          });
}, [])
    const [animalsCount, setAnimalsCount] = useState(0)

    return (<div className="footer">
        <div>Footer</div>
        <h3>Number of animals in db: {animalsCount}</h3>
        </div>
    )
}