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

  const handleScriptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
      gap: '0px',
      width: '597px',
      height: '141px'
    }}>
      {/* 제목 영역 */}
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '0px',
        gap: '5px',
        width: 'auto',
        height: '21px'
      }}>
        <div style={{
          minWidth: '90px',
          height: '21px',
          fontFamily: 'Pretendard',
          fontStyle: 'normal',
          fontWeight: 500,
          fontSize: '18px',
          lineHeight: '21px',
          display: 'flex',
          padding: '0px 10px',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '10px',
          color: '#171719',
          whiteSpace: 'nowrap'
        }}>
          슬라이드{slideNumber}
        </div>
      </div>

      {/* 입력 박스 */}
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        padding: '20px 27px',
        gap: '10px',
        width: '597px',
        height: '120px',
        background: '#F1F2F5',
        borderRadius: '10px'
      }}>
        <textarea
          value={script}
          onChange={handleScriptChange}
          placeholder="내용을 입력하세요."
          style={{
            width: '543px',
            height: '80px',
            fontFamily: 'Pretendard',
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: '13px',
            lineHeight: 'normal',
            color: '#171719',
            background: 'transparent',
            border: 'none',
            outline: 'none',
            resize: 'none',
            padding: '0px'
          }}
        />
      </div>
    </div>
  );
}; 