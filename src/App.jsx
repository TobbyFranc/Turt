
import { Routes, Route } from "react-router-dom"
import LandingPage from "./components/LandingPage"
// import Login from "./components/Login"
import Login from "./components/Login"
import Signup from "./components/Signup"
import Dashboard from "./components/Dashboard"
import LocationSearch from "./components/LocationSearch"
// import { ThemeProvider } from "./components/ThemeProvider"

function App() {

  return (
    <>
    {/* <ThemeProvider> */}
      {/* <div className="flex bg-white dark:bg-gray-900 text-gray-800 dark:text-white"> */}
        <Routes>
          <Route path="/" element={<LandingPage/>} />
          <Route path="/Login" element={<Login />} />
          <Route path="/SignUp" element={<Signup />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/LocationSearch" element={<LocationSearch />} />
        </Routes>
      {/* </div> */}
      {/* </ThemeProvider> */}
    </>
  )
}

export default App
