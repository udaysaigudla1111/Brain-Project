// import React from 'react'
import { BrowserRouter as Router,Routes,Route } from "react-router-dom"
import DashBoard from "./Components/DashBoard"
import SideBar from "./Components/SideBar"
import Signin from "./Components/Signin"
import Signup from "./Components/Signup"

const App = () => {
  return (
    <div className="flex h-screen">
      {/* <SideBar/>
      
      <DashBoard/> */}
    <Router>
      <Routes>
        <Route path="/signin" element={  <Signin/>} />
        <Route path="/signup" element={  <Signup/> } />
      </Routes>
    </Router>
    
     
    </div>
  )
}

export default App