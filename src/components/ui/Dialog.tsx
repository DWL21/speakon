import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { colors } from '../../theme/colors'
import { typography } from '../../theme/typography'
import { Button } from './Button'

interface DialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description?: string
  onConfirm?: () => void
  confirmText?: string
  cancelText?: string
  children?: React.ReactNode
}

export const Dialog: React.FC<DialogProps> = ({
  open,
  onOpenChange,
  title,
  description,
  onConfirm,
  confirmText = '확인',
  cancelText = '취소',
  children,
}) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [open])

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onOpenChange(false)
    }
  }

  if (!open) return null

  return createPortal(
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 50,
        padding: '16px',
      }}
      onClick={handleBackdropClick}
    >
      <div
        style={{
          backgroundColor: colors.neutral.white,
          borderRadius: '12px',
          padding: '24px',
          maxWidth: '400px',
          width: '100%',
          maxHeight: '90vh',
          overflow: 'auto',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '16px' }}>
          <h2
            style={{
              ...typography.title[1],
              color: colors.primary.normal,
              marginBottom: '8px',
            }}
          >
            {title}
          </h2>
          {description && (
            <p
              style={{
                ...typography.body[1],
                color: colors.neutral.gray500,
              }}
            >
              {description}
            </p>
          )}
        </div>
        
        {children && (
          <div style={{ marginBottom: '24px' }}>
            {children}
          </div>
        )}

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          <Button
            variant="primary"
            size="large"
            onClick={() => {
              onConfirm?.()
              onOpenChange(false)
            }}
            style={{ width: '100%' }}
          >
            {confirmText}
          </Button>
          {onConfirm && (
            <Button
              variant="outline"
              size="large"
              onClick={() => onOpenChange(false)}
              style={{ width: '100%' }}
            >
              {cancelText}
            </Button>
          )}
        </div>
      </div>
    </div>,
    document.body
  )
} 