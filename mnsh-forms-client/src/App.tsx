import { Routes, Route } from "react-router-dom"
import Dashboard from "./pages/dashboard/Dashboard"
import Auth from "./pages/auth/Auth"

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Auth/>} />
      <Route path="dashboard" element={<Dashboard />} />
    </Routes>
  )
}

export default App
