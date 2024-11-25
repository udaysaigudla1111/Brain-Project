import {useState} from 'react'
import { FaTwitter,FaYoutube,FaFile,FaLink,FaTag,FaBars } from 'react-icons/fa'
import pic from '../assets/images/brain.png'

const SideBar = () => {

    const [isSideBarOpen,setIsSideBarOpen] = useState<boolean>(false)

    const array = [{
        icon:FaTwitter,
        title:"Tweets"
    },
    {
        icon:FaYoutube,
        title:"Videos"
    },
    {
        icon:FaFile,
        title:"Documents"
    },
    {
        icon:FaLink,
        title:"Links"
    },
    {
        icon:FaTag,
        title:"Tags"
    }
]

  return (
    <div className=''>
        <div>
            <FaBars className='text-blue-600 size-8 lg:hidden' onClick={()=>{
                setIsSideBarOpen(true)
            }} />
        </div>

    <div className={`w-[16rem] lg:relative fixed top-0 left-0 lg:translate-x-0 z-10 ease-in-out transform duration-300 h-screen bg-white flex flex-col p-4 ${isSideBarOpen?'translate-x-0':'-translate-x-full'} `}>
        <div className='flex items-center gap-3 border-b pb-4 border-b-gray-400' >
        <img src={pic} alt="" className='w-10 ' />
        <div className='text-xl font-semibold'>Second Brain</div>
        </div>
        <div className='ml-5 mt-5 border-gray-400'>
            {array.map((item)=>{
                return <div className='flex items-center mb-5 gap-3'>
                    <div>
                    <item.icon className='size-5 text-gray-700'/>
                    </div>
                    <div className='text-gray-700 text-lg'>
                    {item.title}
                    </div>
                </div>
            })}
        </div>
    </div>
    {
        isSideBarOpen&&<div className='fixed inset-0 bg-black opacity-50' onClick={()=>{
            setIsSideBarOpen(false)
        }}>
        </div>
    }
        </div>
  )
}

export default SideBar