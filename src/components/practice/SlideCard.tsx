import React from 'react';
import { colors } from '../../theme/colors';
import { SimplePdfViewer } from '../ui/SimplePdfViewer';

interface SlideCardProps {
  slideNumber: number;
  isActive: boolean;
  onClick: () => void;
  pdfFile?: File | null;
}

export const SlideCard: React.FC<SlideCardProps> = ({
  slideNumber,
  isActive,
  onClick,
  pdfFile,
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
        {pdfFile ? (
          <SimplePdfViewer
            file={pdfFile}
            currentPage={slideNumber}
          />
        ) : (
          <div style={placeholderStyle}>
            <div style={placeholderIconStyle}>📄</div>
          </div>
        )}
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
  overflow: 'hidden',
  position: 'relative',
};

const placeholderStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: colors.fill.normal,
};

const placeholderIconStyle: React.CSSProperties = {
  fontSize: '32px',
  opacity: 0.5,
};