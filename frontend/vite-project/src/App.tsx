// import React from 'react'

import DashBoard from "./Components/DashBoard"
import SideBar from "./Components/SideBar"

const App = () => {
  return (
    <div className="flex h-screen">
      <SideBar/>
      <DashBoard/>
    </div>
  )
}

export default App