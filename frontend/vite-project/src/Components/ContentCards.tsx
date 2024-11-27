import {FaFileAlt,FaEdit,FaLink } from "react-icons/fa"
import { FaTrashCan } from "react-icons/fa6"

const ContentCards = () => {
  return (
    <div className="border h-64  rounded-lg shadow-lg p-4 flex flex-col gap-1 bg-white">
              <div className="flex justify-between">
                <div className="flex gap-2 items-center">
                <FaFileAlt className="text-gray-600"/>
                <h1 className="text-base font-semibold">Education</h1>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                 <FaLink className=""/>
                <FaEdit/>
                <FaTrashCan/>
                </div>
              </div>
              <div className="overflow-y-auto h-40 mt-2 text-gray-800 rounded-md">
                Lorem ipsum dolor sit amet consectetur,
                 adipisicing elit.
              </div>
             
              <div className="mt-3 text-gray-600 text-sm">
               Added on 
              </div>
            </div>
  )
}

export default ContentCards