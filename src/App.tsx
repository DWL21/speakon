import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { TopNavBar } from './components/ui/TopNavBar'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'
import { PagePreviewExample } from './pages/PagePreviewExample'
import { ModalPageInputExample } from './pages/ModalPageInputExample'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <div className="app" style={{ width: '100vw', minHeight: '100vh', margin: 0, padding: 0 }}>
        <TopNavBar />
        <main style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          padding: '32px 40px',
          width: '100%',
          boxSizing: 'border-box'
        }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/page-preview" element={<PagePreviewExample />} />
            <Route path="/modal-page-input" element={<ModalPageInputExample />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App 