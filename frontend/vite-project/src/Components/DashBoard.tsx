// import React from 'react'
import { FaShare,FaPlus} from 'react-icons/fa'

import { ModalAtom, ShareModalAtom } from "../store/atoms/ContentModal"
// import ContentCards from "./ContentCards"
import AddContentModal from "./AddContentModal"
import { useSetRecoilState } from "recoil"
import ShareModal from "./ShareModal"
import ContentCards from './ContentCards'

const DashBoard = () => {
    const setModal = useSetRecoilState(ModalAtom)
    const setShareModalAtom = useSetRecoilState(ShareModalAtom); 
  
  return (
    <div className="w-full bg-gray-100 flex gap-7 flex-col px-6 pt-7">
        <div className="flex justify-between">
            <div>
              <h1 className="font-bold text-xl">All Notes</h1>
            </div>
            <div className="flex gap-3">
             <button onClick={()=>{ setShareModalAtom(true) }} className="flex gap-2 items-center text-blue-500 bg-blue-200 hover:bg-blue-300 px-4 py-2 rounded-lg hover:scale-[1.01] active:scale-[0.98] duration-75 ease-in-out transition-all"> <FaShare/> Share Brain </button>
            <button onClick={()=>{setModal(true)}} className="flex gap-2 items-center text-white bg-blue-600 px-4 hover:bg-blue-700 py-2 rounded-lg hover:scale-[1.01] active:scale-[0.98] duration-75 ease-in-out transition-all"> <FaPlus/> Add Content</button> 
            </div>
        </div>
        <div className="grid lg:grid-cols-4 gap-4 md:grid-cols-2 grid-cols-1">
              
        </div>
     <AddContentModal/>
     <ShareModal/>
    </div>
  )
}

export default DashBoard