import React from 'react'

interface IInfo{
    title:string,
    redirect:string,
    onClick:()=>void
}

const AuthInfo = (props:IInfo) => {
  return (
    <div className='text-center text-sm'>{`Added on ${props.title}`}<span onClick={props.onClick} >{props.redirect}</span></div>
  )
}

export default AuthInfo