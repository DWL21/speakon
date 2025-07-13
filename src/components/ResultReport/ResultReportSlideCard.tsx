import React, { useState } from 'react';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';

export interface ResultReportSlideCardProps {
  slideNumber: number;
  content: string;
  timeText: string;
  percentageText: string;
}

export const ResultReportSlideCard: React.FC<ResultReportSlideCardProps> = ({
  slideNumber,
  content,
  timeText,
  percentageText,
}) => {
  const [showScript, setShowScript] = useState(false);

  const handleCardClick = () => {
    setShowScript(!showScript);
  };

  return (
    <div style={cardContainerStyle}>
      <div style={slideHeaderStyle}>
        <span style={slideNumberStyle}>슬라이드{slideNumber}</span>
      </div>
      
      {showScript ? (
        <button 
          style={scriptButtonStyle}
          onClick={handleCardClick}
        >
          <div style={scriptContentStyle}>
            {content || '내용을 입력하세요.'}
          </div>
        </button>
      ) : (
        <div style={timeCardStyle}>
          <div style={timeContentStyle}>
            <div style={timeMainStyle}>
              {timeText}
            </div>
            <div style={timeSubStyle}>
              {percentageText}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const cardContainerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  width: '100%',
};

const slideHeaderStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  paddingLeft: '12px',
};

const slideNumberStyle: React.CSSProperties = {
  ...typography.title[3],
  color: colors.label.normal,
  fontWeight: 500,
  fontSize: '18px',
};

const timeCardStyle: React.CSSProperties = {
  backgroundColor: '#d9d9d9',
  borderRadius: '10px',
  height: '120px',
  display: 'flex',
  alignItems: 'center',
  width: '100%',
};

const timeContentStyle: React.CSSProperties = {
  padding: '20px 27px',
  display: 'flex',
  flexDirection: 'column',
  gap: '5px',
  width: '100%',
};

const timeMainStyle: React.CSSProperties = {
  ...typography.body.normal,
  color: colors.label.normal,
  fontWeight: 700,
  fontSize: '16px',
};

const timeSubStyle: React.CSSProperties = {
  ...typography.label,
  color: colors.label.normal,
  fontWeight: 400,
  fontSize: '13px',
};

const scriptButtonStyle: React.CSSProperties = {
  backgroundColor: colors.fill.neutral,
  borderRadius: '10px',
  height: '120px',
  border: 'none',
  cursor: 'pointer',
  padding: '20px 27px',
  width: '100%',
  display: 'flex',
  alignItems: 'flex-start',
  textAlign: 'left',
};

const scriptContentStyle: React.CSSProperties = {
  ...typography.body.reading,
  color: colors.label.normal,
  fontWeight: 500,
  fontSize: '14px',
  lineHeight: '1.4',
  width: '100%',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'pre-wrap',
};