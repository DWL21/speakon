import React from 'react'
import { Link } from 'react-router-dom'
import { Logo } from './Logo'
import { ChatButton } from './ChatButton'
import { Typography } from './ui/Typography'

export const TopNavBar: React.FC = () => {
  return (
    <nav style={{
      width: '100vw',
      height: '60px',
      backgroundColor: 'white',
      borderBottom: '1px solid #f1f2f5',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 40px',
      position: 'sticky',
      top: 0,
      left: 0,
      zIndex: 100,
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      boxSizing: 'border-box',
      margin: 0
    }}>
      {/* 왼쪽: 로고 */}
      <Link to="/" style={{ 
        textDecoration: 'none', 
        display: 'flex', 
        alignItems: 'center'
      }}>
        <Logo />
      </Link>
      
      {/* 오른쪽: 텍스트 + 대화 버튼 */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '16px'
      }}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Typography variant="body1" color="black" style={{ cursor: 'pointer' }}>
            홈으로
          </Typography>
        </Link>
        <ChatButton width={64} height={30} />
      </div>
    </nav>
  )
} 