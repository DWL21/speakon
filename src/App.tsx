import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { TopNavBar } from './components/TopNavBar'
import { Home } from './pages/Home'
import { About } from './pages/About'
import { Contact } from './pages/Contact'

import { NotFound } from './pages/NotFound'
import './App.css'

function App() {
  const handleChatClick = () => {
    console.log('음성 대화 시작!')
    // 여기에 음성 대화 기능 구현
    alert('음성으로 대화를 시작합니다! 🎤')
  }

  return (
    <BrowserRouter>
      <div className="app" style={{ width: '100vw', minHeight: '100vh', margin: 0, padding: 0 }}>
        <TopNavBar onChatClick={handleChatClick} />
        <main style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          padding: '32px 40px',
          width: '100%',
          boxSizing: 'border-box'
        }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App 