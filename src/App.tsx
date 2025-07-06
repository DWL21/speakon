import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { TopNavBar } from './components/ui/TopNavBar'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'
import { PagePreviewExample } from './pages/PagePreviewExample'
import { ModalPageInputExample } from './pages/ModalPageInputExample'
import { colors } from './theme/colors'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <div 
        className="app" 
        style={{ 
          width: '100vw', 
          minHeight: '100vh', 
          margin: 0, 
          padding: 0,
          backgroundColor: colors.background.normal,
          color: colors.label.normal,
          fontFamily: 'Pretendard, sans-serif',
        }}
      >
        <TopNavBar />
        <main style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          padding: '0 20px',
          width: '100%',
          boxSizing: 'border-box',
          minHeight: 'calc(100vh - 80px)', // TopNavBar 높이 고려
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