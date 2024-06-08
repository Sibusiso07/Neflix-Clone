"use client"

import { useState, useContext } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { AuthContext } from './Context/AuthCont'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  // Hook auth context
  const { setUser } = useContext(AuthContext)

  const handleLogin = async () => {
    // Setting the user on the auth context
    setUser({ username })

    router.push('/Home')
    
    // // Send data to backend to verify the user
    // try {
    //   const response = await axios.post('', {
    //     user: username,
    //     password: password
    //   });
    //   if (response.status === 200) {
    //     // Setting the user on the auth context
    //     setUser({ username });

    //     router.push('/Home');
    //   } else {
    //     alert('Login failed');
    //   }
    // } catch (err) {
    //   console.error('Unable to sign in: ', err);
    // }
  }

  return (
    <div className="relative h-full bg-[url('/netflix-bg.jpg')] bg-fixed bg-cover bg-no-repeat">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <img src="/logo.png" alt="Logo" className="h-20"/>
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-screen-md rounded-md w-full">
            <h2 className="text-white text-4xl mb-6 font-semibold text-center">Sign in</h2>
            <div className="flex flex-col gap-4">
              <input 
                placeholder="Email or Number"
                value={username}
                onChange={(e) => setUsername(e.target.value)} 
                className="block bg-neutral-700 text-white rounded-md px-6 py-2 w-full focus:ring-0 focus:outline-none"
              />
              <input 
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block bg-neutral-700 text-white rounded-md px-6 py-2 w-full focus:ring-0 focus:outline-none"
              />
            </div>
            <button 
              onClick={handleLogin}
              className="block bg-red-700 text-center text-white rounded-md mt-10 px-6 py-2 w-full focus:ring-0 focus:outline-none"
            >
              Sign in
            </button>
            <div className="mt-6 text-white text-xl">
              <h2>Don't have an account! </h2> 
              <Link href="/Register" className="text-red-600 mt-2">Click Here</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
