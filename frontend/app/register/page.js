"use client"

import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    console.log(`${name}, ${email}, ${number}, ${password}`)
    try {
      const response = await axios.post('http://localhost:3001/register', {
        name: name,
        email: email,
        number: number,
        password: password
      });
      if (response.status === 200) {
        window.location.href = '/'
      } else {
        alert('User Registration Failed');
      }
    } catch (err) {
      console.error('Unable to sign in: ', err);
    }
  }
  
  return (
    <div className="relative h-full bg-[url('/netflix-bg.jpg')] bg-fixed bg-cover bg-no-repeat">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <img src="/logo.png" alt="Logo" className="h-20"/>
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-screen-md rounded-md w-full">
            <h2 className="text-white text-4xl mb-6 font-semibold text-center">Register</h2>
            <div className="flex flex-col gap-4">
              <input 
              placeholder="Name"
              type="name"
              value={name}
              onChange={(e) => setName(e.target.value)} 
              className="block bg-neutral-700 text-white rounded-md px-6 py-2 w-full focus:ring-0 focus:outline-none"/>
              <input 
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
              className="block bg-neutral-700 text-white rounded-md px-6 py-2 w-full focus:ring-0 focus:outline-none"/>
              <input 
              placeholder="Number"
              type="tel"
              value={number}
              onChange={(e) => setNumber(e.target.value)} 
              className="block bg-neutral-700 text-white rounded-md px-6 py-2 w-full focus:ring-0 focus:outline-none"/>
              <input 
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block bg-neutral-700 text-white rounded-md px-6 py-2 w-full focus:ring-0 focus:outline-none"/>
            </div>
            <button 
            onClick={handleRegister}
            className="block bg-red-700 text-center text-white rounded-md mt-10 px-6 py-2 w-full focus:ring-0 focus:outline-none">
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}