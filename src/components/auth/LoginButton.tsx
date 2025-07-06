import React from 'react'
import { colors } from '../../theme/colors'

interface LoginButtonProps {
  width?: number
  height?: number
  className?: string
  style?: React.CSSProperties
  onClick?: () => void
}

export const LoginButton: React.FC<LoginButtonProps> = ({
  width = 64,
  height = 30,
  className = '',
  style,
  onClick
}) => {
  return (
    <button
      className={`login-button ${className}`}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor: colors.primary.normal,
        color: colors.static.white,
        border: 'none',
        borderRadius: '6px',
        fontSize: '13px',
        fontWeight: 500,
        fontFamily: 'Pretendard, sans-serif',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'background-color 0.2s ease',
        outline: 'none',
        ...style
      }}
      onClick={onClick}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = colors.primary.strong
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = colors.primary.normal
      }}
      onMouseDown={(e) => {
        e.currentTarget.style.backgroundColor = colors.primary.strong
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.backgroundColor = colors.primary.normal
      }}
    >
      대화
    </button>
  )
} 