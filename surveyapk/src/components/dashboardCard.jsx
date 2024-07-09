import React from 'react'

export default function DashboardCard({title,style='',children,className=''}) {
  return (
    <div className={' bg-cyan-200 h-auto shadow-md p-3 text-center flex flex-col animate-fade-in-down' + className} style={style}>
    {title && <h3 className=' text-2xl font-semibold'>{title}</h3>}
    {children}

    </div>
  )
}
