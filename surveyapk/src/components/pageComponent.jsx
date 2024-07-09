import React from 'react'

export default function PageComponent({title,button='',children}) {
  return (

    <div>
       <header className="bg-cyan-200 shadow ">
          <div className="mx-auto max-w-7xl flex items-center justify-between px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">{title}</h1>
            {button}
          </div>
        </header>
        <main>
          <div className="  mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
             {children}
            </div>
        </main>
    </div>

  )
}
