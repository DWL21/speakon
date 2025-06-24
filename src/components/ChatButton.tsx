import React from 'react'

interface ChatButtonProps {
  width?: number | string
  height?: number | string
  className?: string
  style?: React.CSSProperties
  title?: string
  onClick?: () => void
}

export const ChatButton: React.FC<ChatButtonProps> = ({
  width = 64,
  height = 30,
  className = '',
  style,
  title = '대화',
  onClick
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 64 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ cursor: onClick ? 'pointer' : 'default', ...style }}
      role={onClick ? 'button' : 'img'}
      aria-label={title}
      onClick={onClick}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick()
        }
      } : undefined}
    >
      {title && <title>{title}</title>}
      
      {/* 버튼 배경 */}
      <rect 
        width="64" 
        height="30" 
        rx="8" 
        fill="#3282FF"
      />
      
      {/* "대화" 텍스트 */}
      <path 
        d="M21.4 17.7051V18.7207H10.99V17.7051H15.57V15.7119H12.26V12.0938H18.94V10.4941H12.24V9.50391H20.13V13.0586H13.45V14.7217H20.4V15.7119H16.77V17.7051H21.4ZM31.24 9.85938V11.0781C31.24 12.5508 31.24 14.1504 30.82 16.5752L29.59 16.4609C30.05 14.1885 30.05 12.5127 30.05 11.0781V10.8496H23.34V9.85938H31.24ZM32.6 17.4639V18.4668H22.23V17.4639H32.6ZM42.89 8.71680V16.9814H41.69V8.71680H42.89ZM43.24 18.8604V19.8379H35.46V16.1436H36.67V18.8604H43.24ZM36.72 9.47852C38.44 9.47852 39.75 10.6465 39.75 12.2969C39.75 13.9727 38.44 15.1279 36.72 15.1279C35.01 15.1279 33.69 13.9727 33.69 12.2969C33.69 10.6465 35.01 9.47852 36.72 9.47852ZM36.72 10.5322C35.66 10.5322 34.87 11.2559 34.87 12.2969C34.87 13.3633 35.66 14.0742 36.72 14.0742C37.77 14.0742 38.57 13.3633 38.57 12.2969C38.57 11.2559 37.77 10.5322 36.72 10.5322Z" 
        fill="white"
      />
    </svg>
  )
} 