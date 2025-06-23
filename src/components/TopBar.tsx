import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from './ui/Button'
import { colors } from '../theme/colors'
import { typography } from '../theme/typography'

const SpeakOnLogo: React.FC = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
    <span
      style={{
        ...typography.title[1],
        color: colors.neutral.gray900,
        fontWeight: 600,
      }}
    >
      Speak
    </span>
    <span
      style={{
        ...typography.title[1],
        color: colors.primary.normal,
        fontWeight: 600,
      }}
    >
      ON
    </span>
  </div>
)

export function TopBar() {
  return (
    <header 
      className="top-bar"
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '15px 0',
        backgroundColor: colors.neutral.white,
        borderBottom: `1px solid ${colors.neutral.gray100}`,
      }}
    >
      <SpeakOnLogo />
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '17px' }}>
        <Link
          to="/home"
          style={{
            ...typography.button[2],
            color: colors.neutral.gray900,
            textDecoration: 'none',
          }}
        >
          홈으로
        </Link>
        <Button size="small">
          시작하기
        </Button>
      </div>
    </header>
  )
} 