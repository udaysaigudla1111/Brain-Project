// import React from 'react'
import { useRecoilState } from "recoil"
import { ShareModalAtom } from "../store/atoms/ContentModal"
import { FaX,FaCopy } from "react-icons/fa6"
const ShareModal = () => {
    const [shareModal,setShareModal] = useRecoilState(ShareModalAtom)
    if(!shareModal)
    {
        return null;
    }
  return (
    <div className="fixed inset-0 bg-opacity-50 bg-black backdrop-blur-sm flex justify-center items-center" onClick={()=>{setShareModal(false)}}>
        <div className="w-[450px] h-80 bg-white rounded-lg flex flex-col p-6 " onClick={(e)=>{e.stopPropagation()}}>
        <div className="flex justify-end"><div onClick={()=>{setShareModal(false)}} className="rounded-full hover:bg-gray-300 p-1"><FaX className="size-4" /></div></div>
        <div className="ml-5 mr-5 flex flex-col gap-6">
        <h1 className="font-semibold text-xl">Share Your Second Brain</h1>
        <div className="text-sm text-gray-500">
        <h1>Share your entire collection of notes, documents,</h1>
        <h1>tweets, and videos with others. They'll be able to</h1>
        <h1>import your content into their own Second Brain.</h1>
        </div>
        <button className="flex justify-center items-center rounded-md gap-2 font-semibold text-sm w-full py-2 text-white bg-blue-600"><FaCopy className="text-blue-300"/> Share Brain </button>
        </div>
      
        </div>
    </div>
  )
}

export default ShareModal