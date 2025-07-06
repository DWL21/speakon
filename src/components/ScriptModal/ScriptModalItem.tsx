import React from 'react';

interface ScriptModalItemProps {
  slideNumber: number;
  value: string;
  onChange: (value: string) => void;
}

export const ScriptModalItem: React.FC<ScriptModalItemProps> = ({
  slideNumber,
  value,
  onChange
}) => {
  return (
    <div style={itemStyle}>
      <div style={headerStyle}>
        <div style={slideNumberStyle}>
          <span>슬라이드{slideNumber}</span>
        </div>
      </div>
      <div style={textareaWrapperStyle}>
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="내용을 입력하세요."
          style={textareaStyle}
        />
      </div>
    </div>
  );
};

const itemStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  width: '100%',
};

const headerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-start',
  gap: '5px',
};

const slideNumberStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0 12px',
  fontFamily: 'Pretendard',
  fontWeight: 500,
  fontSize: '18px',
  color: '#171719',
};

const textareaWrapperStyle: React.CSSProperties = {
  backgroundColor: '#f1f2f5',
  borderRadius: '10px',
  height: '120px',
  width: '100%',
};

const textareaStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
  backgroundColor: 'transparent',
  border: 'none',
  outline: 'none',
  padding: '20px 27px',
  fontFamily: 'Pretendard',
  fontWeight: 500,
  fontSize: '14px',
  color: '#171719',
  resize: 'none',
  borderRadius: '10px',
}; 