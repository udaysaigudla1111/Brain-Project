// import React from 'react'
    interface inputObj{
        label:string,
        placeholder:string
    }

const InputField = (props:inputObj) => {

  return (
    <div className="flex flex-col">
        <div className="mb-2 font-semibold text-sm">{props.label}</div>
        <div className="">
            <input type="text" placeholder={props.placeholder} className="px-3  w-full py-2 border rounded-lg outline-blue-600" />
        </div>
    </div>
  )
}

export default InputField