import { UserIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../context/contextProvider'

export default function GuestLayout() {
  const {currentUser,token}=useStateContext();
   if(token){
    return <Navigate to="/"/>
   }
  return (
    <>
      <div className="  flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <UserIcon className='w-10 text-blue-500'/>
        </div>

      <Outlet />
      </div>
    </>
  )
}
