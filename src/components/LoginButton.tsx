import React from 'react'
import { colors } from '../theme/colors'
import { typography } from '../theme/typography'
import { spacing, padding } from '../theme/spacing'

interface LoginButtonProps {
  width?: number | string
  height?: number | string
  className?: string
  style?: React.CSSProperties
  onClick?: () => void
}

export const LoginButton: React.FC<LoginButtonProps> = ({
  width,
  height,
  className = '',
  style,
  onClick
}) => {
  return (
    <button
      style={{
        display: 'inline-flex',
        padding: padding.sm, // 7px 15px
        justifyContent: 'center',
        alignItems: 'center',
        gap: spacing.xl, // 20px
        width,
        height,
        backgroundColor: colors.primary.normal,
        color: colors.neutral.white,
        border: 'none',
        borderRadius: '8px',
        cursor: onClick ? 'pointer' : 'default',
        fontFamily: typography.button[2].fontFamily,
        fontWeight: typography.button[2].fontWeight,
        fontSize: typography.button[2].fontSize,
        lineHeight: typography.button[2].lineHeight,
        transition: 'background-color 0.2s ease',
        outline: 'none',
        whiteSpace: 'nowrap',
        ...style
      }}
      className={className}
      onClick={onClick}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = colors.primary.hover
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = colors.primary.normal
      }}
      onMouseDown={(e) => {
        e.currentTarget.style.backgroundColor = colors.primary.pressed
      }}
    >
      로그인
    </button>
  )
} 