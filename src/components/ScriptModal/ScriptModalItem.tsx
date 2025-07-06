import React, { useState, useEffect } from 'react';

interface ScriptModalItemProps {
  slideNumber: number;
  value: string;
  onChange: (value: string) => void;
  onFocus?: (slideNumber: number) => void;
}

export const ScriptModalItem: React.FC<ScriptModalItemProps> = ({
  slideNumber,
  value,
  onChange,
  onFocus
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [localValue, setLocalValue] = useState(value);

  // props.value가 변경되면 로컬 값 동기화
  useEffect(() => {
    setLocalValue(value);
  }, [value]);



  const handleFocus = () => {
    setIsFocused(true);
    onFocus?.(slideNumber);
  };

  const handleBlur = () => {
    setIsFocused(false);
    // blur 시에만 실제 변경사항을 부모에게 알림
    if (localValue !== value) {
      console.log('📝 blur → 내용 저장', slideNumber, localValue);
      onChange(localValue);
    }
  };

  const handleChange = (newValue: string) => {
    // 입력 중에는 로컬 상태만 업데이트
    setLocalValue(newValue);
  };

  return (
    <div style={itemStyle}>
      <div style={headerStyle}>
        <div style={{
          ...slideNumberStyle,
          color: isFocused ? '#3282ff' : '#171719',
          transition: 'color 0.2s ease'
        }}>
          <span>슬라이드{slideNumber}</span>
        </div>
      </div>
      <div style={{
        ...textareaWrapperStyle,
        background: isFocused ? '#FFF' : '#f1f2f5',
        border: isFocused ? '2px solid #3282ff' : '2px solid transparent',
        transition: 'border-color 0.2s ease, background-color 0.2s ease'
      }}>
        <textarea
          value={localValue}
          onChange={(e) => handleChange(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
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
  boxSizing: 'border-box',
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