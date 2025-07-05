import React from 'react';
import { colors } from '../../theme/colors';

interface PageNavigatorProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  canGoPrevious: boolean;
  canGoNext: boolean;
  onPreviousPage: () => void;
  onNextPage: () => void;
}

export function PageNavigator({
  currentPage,
  totalPages,
  onPageChange: _onPageChange,
  canGoPrevious,
  canGoNext,
  onPreviousPage,
  onNextPage,
}: PageNavigatorProps) {
  return (
    <div style={navigationStyle}>
      <button
        style={{
          ...navButtonStyle,
          ...(canGoPrevious ? {} : disabledButtonStyle),
        }}
        onClick={onPreviousPage}
        disabled={!canGoPrevious}
      >
        ‹
      </button>
      
      <div style={pageInfoStyle}>
        <span style={currentPageStyle}>{currentPage}</span>
        <span style={separatorStyle}>/</span>
        <span style={totalPagesStyle}>{totalPages}</span>
      </div>

      <button
        style={{
          ...navButtonStyle,
          ...(canGoNext ? {} : disabledButtonStyle),
        }}
        onClick={onNextPage}
        disabled={!canGoNext}
      >
        ›
      </button>
    </div>
  );
}

// 스타일 정의
const navigationStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  width: '100%',
  justifyContent: 'center',
  marginTop: '20px',
};

const navButtonStyle: React.CSSProperties = {
  width: '32px',
  height: '32px',
  borderRadius: '6px',
  border: `1px solid ${colors.neutral.gray100}`,
  backgroundColor: colors.neutral.white,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  fontSize: '18px',
  fontWeight: 'bold',
  color: colors.neutral.gray900,
  transition: 'all 0.2s ease',
  outline: 'none',
};

const disabledButtonStyle: React.CSSProperties = {
  backgroundColor: colors.neutral.gray50,
  color: colors.neutral.gray300,
  cursor: 'not-allowed',
};

const pageInfoStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  fontFamily: 'Pretendard, sans-serif',
  fontSize: '14px',
  fontWeight: 500,
};

const currentPageStyle: React.CSSProperties = {
  color: colors.neutral.gray900,
  fontWeight: 600,
};

const separatorStyle: React.CSSProperties = {
  color: colors.neutral.gray300,
  margin: '0 2px',
};

const totalPagesStyle: React.CSSProperties = {
  color: colors.neutral.gray500,
}; 