import React from 'react'
import { useStateContext } from '../context/contextProvider'

export default function Toast() {
  const {toast}=useStateContext();
  return (
    <>
    {
    toast.show && (<div className=' w-[300px] text-center py-2 px-3 text-white rounded  bg-green-600 shadow-md fixed  right-4 bottom-4 z-50 animate-fade-in-down'>
      {toast.message}</div>)

    }

    </>

  )
}
