import React from 'react';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

export interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'modal' | 'elevated';
  padding?: keyof typeof spacing;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  padding = 'lg',
  className = '',
  style,
  onClick,
}) => {
  const getCardStyles = (): React.CSSProperties => {
    const baseStyles: React.CSSProperties = {
      borderRadius: '12px',
      backgroundColor: colors.neutral.white,
      transition: 'all 0.2s ease',
      cursor: onClick ? 'pointer' : 'default',
    };

    const variantStyles: Record<string, React.CSSProperties> = {
      default: {
        border: `1px solid ${colors.neutral.gray100}`,
        padding: spacing[padding],
      },
      modal: {
        backgroundColor: colors.neutral.gray50,
        padding: '10px',
        maxWidth: '340px',
        border: 'none',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      },
      elevated: {
        border: 'none',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        padding: spacing[padding],
      },
    };

    return {
      ...baseStyles,
      ...variantStyles[variant],
      ...style,
    };
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (onClick) {
      e.currentTarget.style.transform = 'translateY(-2px)';
      e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.15)';
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (onClick) {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = variant === 'elevated' 
        ? '0 2px 8px rgba(0, 0, 0, 0.1)' 
        : variant === 'modal' 
        ? '0 4px 12px rgba(0, 0, 0, 0.1)'
        : 'none';
    }
  };

  return (
    <div
      style={getCardStyles()}
      className={className}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}; 