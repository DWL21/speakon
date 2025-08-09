import React from 'react'
import { colors } from '../../theme/colors'

interface ProgressProps {
  value: number
  className?: string
}

export const Progress: React.FC<ProgressProps> = ({ value, className = '' }) => {
  const clampedValue = Math.min(Math.max(value, 0), 100)
  
  return (
    <div 
      className={`relative h-1 w-full overflow-hidden rounded-full ${className}`}
      style={{ backgroundColor: `${colors.primary.normal}33` }}
    >
      <div
        className="h-full transition-all duration-300 ease-in-out rounded-full"
        style={{
          backgroundColor: colors.primary.normal,
          width: `${clampedValue}%`,
        }}
      />
    </div>
  )
} 