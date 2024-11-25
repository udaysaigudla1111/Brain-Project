// import React from 'react'
import { useRecoilState } from "recoil"
import { ModalAtom } from "../store/atoms/ContentModal"
import {FaX} from 'react-icons/fa6'
import InputField from "./InputField";
import CustomDropDown from "./CustomDropDown";


const AddContentModal = () => {

  const [isModal,setIsModal]= useRecoilState(ModalAtom);

  if(!isModal)
  {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black backdrop-blur-sm bg-opacity-25 flex justify-center items-center" onClick={()=>{
      setIsModal(false)
    }}>
        <div className="bg-white h-[470px] w-[500px] shadow-lg rounded-lg p-5 px-6 flex flex-col gap-3" onClick={(e)=>{e.stopPropagation()}}>
          <div className="flex justify-between items-center mb-2">
            <div className="font-semibold text-xl">
          Add New Content
            </div>
            <button className="text-sm rounded-full hover:bg-gray-100 p-2" onClick={(e)=>{
              setIsModal(false)
              e.stopPropagation();
            }}>
              <FaX/>
            </button>
          </div>
          <CustomDropDown/>
          <InputField label={'URL'} placeholder={'https://example.com'}/>
          <InputField label={'Title'} placeholder={'Enter content title'}/>
          <div className="flex justify-end items-center gap-2 mt-6">
            <button className="text-blue-600 bg-blue-200 px-3 py-2 rounded-md font-semibold hover:scale-[1.01] active:scale-[0.98] hover:bg-blue-300 duration-75 ease-in-out">Cancel</button>
            <button className="text-white bg-blue-600 px-3 py-2 rounded-md font-semibold hover:scale-[1.01] active:scale-[0.98] hover:bg-blue-700 duration-75 ease-in-out">Add Content</button>
          </div>
        </div>
      </div>
  )
}

export default AddContentModal