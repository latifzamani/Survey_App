import React from 'react'
import { Link } from 'react-router-dom';

export default function TButton({
  color='',
  to='',
  circle=false,
  href='',
  link=false,
  target="_blank",
  onClick=()=>{},
  children,
  height='32px'
})
 {

 let classes=
 [
  'flex','whitespace-nowrap','text-sm','border','border-2','border-transparent','rounded-md','p-2','items-center'
 ];
 if(link){
  classes=[
    ...classes,'transition-colors','text-white','focus-ring-2','focus:ring-offset-2'
  ]
 }
 if(circle){
  classes=[
    ...classes,'w-8','h-8','item-center','justify-center','rounded-full','text-sm'
  ]
 }
  return (
    <>
    {
      href && (<a style={{backgroundColor:color,height:height}} href={href} className={classes.join(" ")} target={target}>{children}</a>)
    }
    {
      to && (<Link style={{backgroundColor:color,height:height}} to={to} className={classes.join(" ")}>{children}</Link>)
    }
    {
      !to && !href && (<button style={{backgroundColor:color,height:height}} onClick={onClick} className={classes.join(" ")}>{children}</button>)
    }
    </>
  )
}
