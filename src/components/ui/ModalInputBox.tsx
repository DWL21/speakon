import React, { useState } from 'react';

interface ModalInputBoxProps {
  slideNumber: number;
  onScriptChange: (slideNumber: number, script: string) => void;
  initialScript?: string;
}

export const ModalInputBox: React.FC<ModalInputBoxProps> = ({
  slideNumber,
  onScriptChange,
  initialScript = ''
}) => {
  const [script, setScript] = useState(initialScript);
  const [isFocused, setIsFocused] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newScript = e.target.value;
    setScript(newScript);
    onScriptChange(slideNumber, newScript);
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      padding: '0px',
      gap: '12px',
      width: '566px',
      height: '153px'
    }}>
      {/* 제목 영역 */}
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '0px',
        gap: '5px',
        width: '95px',
        height: '21px'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '0px 12px',
          gap: '10px',
          width: '95px',
          height: '21px'
        }}>
          <span style={{
            width: '71px',
            height: '21px',
            fontFamily: 'Pretendard',
            fontStyle: 'normal',
            fontWeight: 500,
            fontSize: '18px',
            lineHeight: '21px',
            display: 'flex',
            alignItems: 'center',
            color: '#3282FF'
          }}>
            슬라이드{slideNumber}
          </span>
        </div>
      </div>

      {/* 입력 박스 */}
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        padding: '20px 27px',
        gap: '10px',
        width: '566px',
        height: '120px',
        background: '#FFFFFF',
        border: '2px solid #3282FF',
        borderRadius: '10px'
      }}>
        <textarea
          value={script}
          onChange={handleInputChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="내용을 입력하세요."
          style={{
            width: '512px',
            height: '80px',
            fontFamily: 'Pretendard',
            fontStyle: 'normal',
            fontWeight: 500,
            fontSize: '14px',
            lineHeight: '17px',
            color: '#171719',
            border: 'none',
            outline: 'none',
            resize: 'none',
            background: 'transparent'
          }}
        />
      </div>
    </div>
  );
}; 