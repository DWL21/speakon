import React from 'react';
import { colors } from '../../theme/colors';

interface StatusBarProps {
  currentSlide: number;
  totalSlides: number;
}

export const StatusBar: React.FC<StatusBarProps> = ({
  currentSlide,
  totalSlides,
}) => {
  return (
    <div style={statusBarStyle}>
      {/* 왼쪽: 빈 공간 */}
      <div style={leftSectionStyle}>
      </div>
      
      {/* 중앙: 페이지 번호 */}
      <div style={pageIndicatorStyle}>
        <span>{currentSlide}</span>
        <span>/</span>
        <span>{totalSlides}</span>
      </div>
      
      {/* 우측: 빈 공간 */}
      <div style={actionButtonsStyle}>
      </div>
    </div>
  );
};

const statusBarStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0 41px',
  height: '60px',
};

const leftSectionStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
};



const pageIndicatorStyle: React.CSSProperties = {
  display: 'flex',
  gap: '4px',
  fontSize: '14px',
  fontWeight: 500,
  color: colors.label.neutral,
  fontFamily: 'Pretendard, sans-serif',
};

const actionButtonsStyle: React.CSSProperties = {
  display: 'flex',
  gap: '9px',
};


