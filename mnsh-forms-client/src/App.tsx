import { Routes, Route } from "react-router-dom"
import Dashboard from "./pages/dashboard/Dashboard"
import Auth from "./pages/auth/Auth"
import Edit from "./pages/editForm/Edit"

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Auth/>} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="/forms/:id/edit" element={<Edit />} />
    </Routes>
  )
}

export default App
