import React from 'react';
import { colors } from '../../theme/colors';

interface SlideCardProps {
  slideNumber: number;
  isActive: boolean;
  onClick: () => void;
}

export const SlideCard: React.FC<SlideCardProps> = ({
  slideNumber,
  isActive,
  onClick,
}) => {
  return (
    <div 
      style={{
        ...slideCardStyle,
        backgroundColor: isActive ? colors.primary.normal : colors.background.normal,
        color: isActive ? colors.static.white : colors.label.alternative,
      }}
      onClick={onClick}
    >
      <div style={slideNumberStyle}>
        {slideNumber}
      </div>
      <div style={slidePreviewStyle}>
        {/* 슬라이드 미리보기 썸네일 */}
      </div>
    </div>
  );
};

const slideCardStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  padding: '12px 20px',
  gap: '4px',
  cursor: 'pointer',
  transition: 'background-color 0.2s',
  borderBottom: `1px solid ${colors.line.normal}`,
  boxSizing: 'border-box',
};

const slideNumberStyle: React.CSSProperties = {
  fontSize: '13px',
  fontWeight: 400,
  minWidth: '20px',
  fontFamily: 'Pretendard, sans-serif',
  lineHeight: 1,
};

const slidePreviewStyle: React.CSSProperties = {
  flex: 1,
  height: '135px',
  backgroundColor: colors.fill.normal,
  borderRadius: '12px',
  border: `1px solid ${colors.line.normal}`,
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1' preserveAspectRatio='none' width='100%25' height='100%25'%3E%3Crect width='1' height='1' fill='%23EEE' /%3E%3C/svg%3E")`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
};