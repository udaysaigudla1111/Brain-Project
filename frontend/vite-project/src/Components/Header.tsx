import React from 'react'

interface Iprop{
    title:string
}
const Header = (props:Iprop) => {
  return (
    <div className='text-3xl text-center font-extrabold'>
        {props.title}
    </div>
  )
}

export default Header