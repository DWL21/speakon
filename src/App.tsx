import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { FileUploadPage } from './pages/FileUpload'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FileUploadPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/upload" element={<FileUploadPage />} />
        <Route path="*" element={<div>Page not found</div>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App 