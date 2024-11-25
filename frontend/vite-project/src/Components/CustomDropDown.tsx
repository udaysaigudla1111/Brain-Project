// import React from 'react'
import { FaAngleDown,FaAngleUp } from "react-icons/fa"
import { useState } from "react"
const CustomDropDown = () => {
  const [showDropDown,setShowDropDown] = useState<boolean>(false);
  const dropdownarray = ["Entertainment","Politics","Twitter","Stocks","Study"];
  const [dropDownElement,setDropDownElement] = useState<string>("link");
  return (
    <div className="flex flex-col relative">
      <h1 className="mb-2 text-sm font-semibold">Content Type</h1>
       <button className="border px-3 rounded-lg focus:ring-2 focus:ring-blue-600 py-2 cursor-pointer flex justify-between items-center hover:bg-gray-100 outline-none" onClick={()=>{
        setShowDropDown((prev)=>{
          return !prev
        })
       }} >
        <div>{dropDownElement}</div>
       {showDropDown?<FaAngleDown className="text-gray-500"/>:<FaAngleUp className="text-gray-500" /> }
       </button>
        {showDropDown && <div className="border absolute py-1 shadow-md top-[74px] w-full rounded-md bg-white">
            {
              dropdownarray.map((item,index)=>{
                return <div key={index} className="hover:bg-gray-100 px-3 py-2" onClick={()=>{
                  setDropDownElement(item);
                  setShowDropDown(false)
                }} >  
                    <h1>{item}</h1>
                </div>
              })
            }
       </div>
        }
    </div>
  )
}

export default CustomDropDown