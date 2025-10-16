
import { Routes, Route } from "react-router-dom"
import LandingPage from "./components/LandingPage"
// import Signup from "./components/Signup"
import Dashboard from "./components/Dashboard"
import AuthPage from './components/AuthPage'
import LocationSearch from "./components/LocationSearch"
// import Login from "./components/Login"
import { ThemeProvider } from "./components/ThemeProvider"
import { LanguageProvider } from "./components/LanguageProvider";


function App() {

  return (
    <>
    <LanguageProvider>
      <ThemeProvider>
          <Routes>
            <Route path="/" element={<LandingPage/>} />
            {/* <Route path="/Login" element={<Login />} /> */}
            {/* <Route path="/SignUp" element={<Signup />} /> */}
            <Route path="/AuthPage" element={<AuthPage />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/LocationSearch" element={<LocationSearch />} />
          </Routes>
        </ThemeProvider>
      </LanguageProvider>
    </>
  )
}

export default App
