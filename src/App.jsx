
import { Routes, Route } from "react-router-dom"
import LandingPage from "./components/LandingPage"
import Signup from "./components/Signup"
import Dashboard from "./components/Dashboard"
import LocationSearch from "./components/LocationSearch"
import Login from "./components/Login"
import { ThemeProvider } from "./components/ThemeProvider"


function App() {

  return (
    <>
    <ThemeProvider>
        <Routes>
          <Route path="/" element={<LandingPage/>} />
          <Route path="/Login" element={<Login />} />
          <Route path="/SignUp" element={<Signup />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/LocationSearch" element={<LocationSearch />} />
        </Routes>
      </ThemeProvider>
    </>
  )
}

export default App
