import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import AxiosClient from '../axios';
import { useStateContext } from '../context/contextProvider';

export default function Login() {
  const {setCurrentUser,setToken}=useStateContext();
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [error,setError]=useState({__html:''});
  const onSubmit=(ev)=>{
    ev.preventDefault();
    setError({__html:''})

    AxiosClient.post('/login',{
      email,
      password,
    }).then(({data})=>{
      setCurrentUser(data.user);
      setToken(data.token);
      console.log(data);
    }).catch((error)=>{
      if(error.response){
        const finalErrors=Object.values(error.response.data.errors).reduce((accu,next)=>[...accu,...next],[])
        setError({__html:finalErrors.join('<br>')})
      }
      console.error(error);
    })
}
  return (
    <div>

      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Sign in to your account
      </h2>
        {/* Errors */}
       {
        error.__html && (<div className=' text-red-500 rounded py-4 my-4 px-3 flex justify-center ' dangerouslySetInnerHTML={error}></div>)
       }
       {/* Errors */}
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={onSubmit} className="space-y-6" action="#" method="POST">
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                required
                placeholder='E-Mail'
                className="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>

            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                required
                placeholder='Password'
                className="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">

          <Link to="/signup" className="font-semibold leading-6 text-blue-500 hover:text-green-500">
            Create A New Account
          </Link>
        </p>
      </div>
    </div>

      )
}
