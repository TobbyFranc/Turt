import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Dashboard from "./components/Dashboard";
import AuthPage from "./components/AuthPage";
import LocationSearch from "./components/LocationSearch";
import { ThemeProvider } from "./components/ThemeProvider";
import { LanguageProvider } from "./components/LanguageProvider";

function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/locationsearch" element={<LocationSearch />} />
        </Routes>
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;
