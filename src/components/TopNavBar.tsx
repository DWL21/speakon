import React from 'react'
import { Link } from 'react-router-dom'
import { Logo } from './Logo'
import { ChatButton } from './ChatButton'
import { Typography } from './ui/Typography'

interface TopNavBarProps {
  onChatClick?: () => void
}

export const TopNavBar: React.FC<TopNavBarProps> = ({ onChatClick }) => {
  const handleChatClick = () => {
    if (onChatClick) {
      onChatClick()
    } else {
      alert('음성으로 대화를 시작합니다!')
    }
  }

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
        <Logo width={149} height={31} />
      </Link>
      
      {/* 오른쪽: 텍스트 + 대화 버튼 */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '16px'
      }}>
        <Typography variant="body1" color="black">
          음성으로 대화
        </Typography>
        <ChatButton onClick={handleChatClick} width={64} height={30} />
      </div>
    </nav>
  )
} 