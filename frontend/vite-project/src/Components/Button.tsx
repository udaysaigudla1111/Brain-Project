// import React from 'react'

interface IButton{
    title:string
}

const Button = (props:IButton) => {
  return (
    <button className="bg-blue-600 text-white rounded-md px-2 py-2 hover:bg-blue-700 hover:scale-[1.01] active:scale-[0.98] duration-75 ease-in-out transition-all font-semibold    ">{props.title}</button>
  )
}

export default Button