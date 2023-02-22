import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Header from "home/Header";
import Footer from "home/Footer";

import './index.css'
import Weather from './Weather';


const Home = ({onLogOut}) => {
    const API_URL = 'http://localhost:3000'

    const [users, setUsers] = useState([]);
  const [animals, setAnimals] = useState([]);
  const [userForm, setUserForm] = useState({ name: '', email: '' });
  const [animalForm, setAnimalForm] = useState({ name: '', type: '', age: '' });

  useEffect(() => {
    fetchUsers();
    fetchAnimals();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/users`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setUsers(response.data);
      console.log(response.data.filter(u => u.animalId))
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAnimals = async () => {
    try {
      const response = await axios.get(`${API_URL}/animals`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setAnimals(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addUser = async () => {
    if(!userForm.email || !userForm.name) {
        return;
    }
    try {
      await axios.post(`${API_URL}/add_user`, userForm, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setUserForm({ name: '', email: '' });
      fetchUsers();
    } catch (error) {
      console.log(error);
    }
  };

  const addAnimal = async () => {
    if(!animalForm.age || ! animalForm.name || !animalForm.type) {
        return;
    }
    try {
      await axios.post(`${API_URL}/add_animal`, animalForm, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setAnimalForm({ name: '', type: '', age: '' });
      await fetchAnimals();
      await fetchUsers();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUserFormChange = (e) => {
    setUserForm({ ...userForm, [e.target.name]: e.target.value });
  };

  const handleAnimalFormChange = (e) => {
    setAnimalForm({ ...animalForm, [e.target.name]: e.target.value });
  };

  const resetUsersAnimals = async () => {
    await axios.post(`${API_URL}/reset_animals`, {}, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
    await fetchUsers();
  }

  return (
    <>
    <Header app={{name: 'farm', onLogOut}}/>
      <div className="home-container">
        <div className="row">
          <div className="col-md-6">
            <h2>Employees</h2>
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={userForm.name}
                onChange={handleUserFormChange}
              />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={userForm.email}
                onChange={handleUserFormChange}
              />
            </div>
            <button className="btn btn-primary" onClick={resetUsersAnimals}>Reset animals</button>
            <button className="btn btn-primary empbtn" onClick={addUser}>
              Add Employee
            </button>
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Animal id</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.animalId}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="col-md-6">
            <h2>Animals</h2>
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={animalForm.name}
                onChange={handleAnimalFormChange}
              />
            </div>
            <div className="form-group">
              <label>Type:</label>
              <input
            type="text"
            className="form-control"
            name="type"
            value={animalForm.type}
            onChange={handleAnimalFormChange}
          />
        </div>
        <div className="form-group">
          <label>Age:</label>
          <input
            type="number"
            className="form-control"
            name="age"
            value={animalForm.age}
            onChange={handleAnimalFormChange}
          />
        </div>
        <button className="btn btn-primary" onClick={addAnimal}>
          Add Animal
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Age</th>
            </tr>
          </thead>
          <tbody>
            {animals.map((animal) => (
              <tr key={animal._id}>
                <td>{animal.name}</td>
                <td>{animal.type}</td>
                <td>{animal.age}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>

      <Footer />
      <Weather />
    </>
  );
};

export default Home;