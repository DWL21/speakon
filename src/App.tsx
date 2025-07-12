import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { TopNavBar } from './components/ui/TopNavBar'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'
import { Practice } from './pages/Practice'
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
        <Routes>
          {/* Practice 페이지는 독립적 레이아웃 */}
          <Route path="/practice" element={<Practice />} />
          
          {/* 다른 페이지들은 기본 레이아웃 */}
          <Route path="/*" element={
            <>
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
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </>
          } />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App 