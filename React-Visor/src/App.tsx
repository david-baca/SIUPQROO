import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
//vistas
import Home from './pages/home'
import About from './pages/about'
import ExportExcel from './pages/ExportExcel'
import "./styles/index.css"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path='/excel' element={<ExportExcel />} />
      </Routes>
    </Router>
  )
}

export default App
