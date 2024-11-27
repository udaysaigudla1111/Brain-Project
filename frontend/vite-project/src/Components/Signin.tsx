// import React from 'react'

import AuthInfo from "./AuthInfo"
import Button from "./Button"
import Header from "./Header"
import InputField from "./InputField"
import { useNavigate } from "react-router-dom"

const Signin = () => {
    const navigate = useNavigate();
  return (
    <div className="bg-gray-100 h-screen flex justify-center items-center w-full">

        <div className="w-[450px] flex flex-col gap-9">
             <Header title={"Sign in to your account"} />  
            <div className=""><InputField label={"Username"} placeholder={""} /></div>
            <div className=""><InputField label={"Password"} placeholder={""} /></div>
            <Button title={"Signin"} />
            <AuthInfo onClick={()=>{navigate("/signup")}} title={"Dont have an account"} redirect={"SignUp"} />
        </div>
       
        
        
    </div>
  )
}

export default Signin