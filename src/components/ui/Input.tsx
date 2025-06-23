import React from 'react'
import { colors } from '../../theme/colors'
import { typography } from '../../theme/typography'
import { spacing } from '../../theme/spacing'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  variant?: 'default' | 'filled';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  variant = 'default',
  leftIcon,
  rightIcon,
  className = '',
  style,
  disabled,
  ...props
}) => {
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.sm,
    width: '100%',
  };

  const labelStyle: React.CSSProperties = {
    ...typography.label,
    color: error ? colors.semantic.error : colors.neutral.gray900,
    fontSize: '14px',
    fontWeight: 500,
  };

  const inputWrapperStyle: React.CSSProperties = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: leftIcon || rightIcon ? '10px 40px 10px 15px' : '10px 15px',
    border: `1px solid ${error ? colors.semantic.error : colors.neutral.gray100}`,
    borderRadius: '8px',
    backgroundColor: variant === 'filled' ? colors.neutral.gray50 : colors.neutral.white,
    fontSize: '14px',
    fontFamily: typography.body[2].fontFamily,
    color: colors.neutral.gray900,
    outline: 'none',
    transition: 'all 0.2s ease',
    boxSizing: 'border-box',
    paddingLeft: leftIcon ? '40px' : '15px',
    paddingRight: rightIcon ? '40px' : '15px',
  };

  const iconStyle: React.CSSProperties = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    color: colors.neutral.gray500,
    zIndex: 1,
  };

  const leftIconStyle: React.CSSProperties = {
    ...iconStyle,
    left: '12px',
  };

  const rightIconStyle: React.CSSProperties = {
    ...iconStyle,
    right: '12px',
  };

  const helperStyle: React.CSSProperties = {
    ...typography.caption,
    color: error ? colors.semantic.error : colors.neutral.gray500,
    marginTop: '4px',
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!disabled) {
      e.target.style.borderColor = error ? colors.semantic.error : colors.primary.normal;
      e.target.style.boxShadow = `0 0 0 2px ${error ? colors.semantic.error : colors.primary.normal}20`;
    }
    props.onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.style.borderColor = error ? colors.semantic.error : colors.neutral.gray100;
    e.target.style.boxShadow = 'none';
    props.onBlur?.(e);
  };

  return (
    <div style={containerStyle}>
      {label && <label style={labelStyle}>{label}</label>}
      <div style={inputWrapperStyle}>
        {leftIcon && <div style={leftIconStyle}>{leftIcon}</div>}
        <input
          style={{
            ...inputStyle,
            opacity: disabled ? 0.6 : 1,
            cursor: disabled ? 'not-allowed' : 'text',
            ...style,
          }}
          disabled={disabled}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={className}
          {...props}
        />
        {rightIcon && <div style={rightIconStyle}>{rightIcon}</div>}
      </div>
      {(error || helperText) && (
        <div style={helperStyle}>{error || helperText}</div>
      )}
    </div>
  );
}; 