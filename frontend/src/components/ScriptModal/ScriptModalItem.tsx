import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import { colors } from '../../theme/colors';

interface ScriptModalItemProps {
  slideNumber: number;
  value: string;
  onChange: (value: string) => void;
  onFocus?: (slideNumber: number) => void;
  onGenerate?: (slideNumber: number) => void;
}

export interface ScriptModalItemRef {
  getCurrentValue: () => string;
  getSlideNumber: () => number;
}

const ScriptModalItem = forwardRef<ScriptModalItemRef, ScriptModalItemProps>(({ 
  slideNumber,
  value,
  onChange: _onChange,
  onFocus,
  onGenerate
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const [localValue, setLocalValue] = useState(value);
  const [magicHovered, setMagicHovered] = useState(false);

  // props.value가 변경되면 로컬 값 동기화
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  // 외부에서 현재 로컬 값을 가져올 수 있도록 imperative handle 제공
  useImperativeHandle(ref, () => ({
    getCurrentValue: () => localValue,
    getSlideNumber: () => slideNumber
  }), [localValue, slideNumber]);

  const handleFocus = () => {
    setIsFocused(true);
    onFocus?.(slideNumber);
  };

  const handleBlur = () => {
    setIsFocused(false);
    // 포커스 해제시 아무런 동작도 하지 않음
  };

  const handleChange = (newValue: string) => {
    // 입력 중에는 로컬 상태만 업데이트
    setLocalValue(newValue);
    // 실시간 상태 업데이트 제거
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
        <button
          type="button"
          onClick={() => onGenerate?.(slideNumber)}
          aria-label="대본 생성"
          title="대본 생성"
          style={{
            ...magicButtonStyle,
            backgroundColor: magicHovered ? '#2a74e6' : colors.primary.normal,
          }}
          onMouseEnter={() => setMagicHovered(true)}
          onMouseLeave={() => setMagicHovered(false)}
        >
          <svg width="14.5" height="14.5" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.35973 2.1087C8.35973 2.22888 8.40747 2.34413 8.49245 2.42911C8.57743 2.51409 8.69268 2.56183 8.81286 2.56183C8.93303 2.56183 9.04829 2.51409 9.13326 2.42911C9.21824 2.34413 9.26598 2.22888 9.26598 2.1087V0.451172C9.26598 0.330996 9.21824 0.215742 9.13326 0.130764C9.04829 0.0457867 8.93303 -0.00195312 8.81286 -0.00195312C8.69268 -0.00195312 8.57743 0.0457867 8.49245 0.130764C8.40747 0.215742 8.35973 0.330996 8.35973 0.451172V2.1087ZM12.4379 2.14042C12.5204 2.05496 12.5661 1.9405 12.565 1.82169C12.564 1.70289 12.5163 1.58924 12.4323 1.50522C12.3483 1.42121 12.2347 1.37356 12.1159 1.37252C11.9971 1.37149 11.8826 1.41716 11.7971 1.4997L10.6254 2.67148C10.5821 2.71328 10.5476 2.76328 10.5238 2.81857C10.5001 2.87385 10.4876 2.93331 10.487 2.99347C10.4865 3.05364 10.498 3.11331 10.5208 3.16899C10.5435 3.22468 10.5772 3.27527 10.6197 3.31782C10.6623 3.36036 10.7129 3.39401 10.7686 3.41679C10.8243 3.43958 10.8839 3.45104 10.9441 3.45052C11.0042 3.45 11.0637 3.4375 11.119 3.41375C11.1743 3.39 11.2243 3.35548 11.2661 3.3122L12.4379 2.14042ZM6.35964 3.3122C6.40144 3.35548 6.45144 3.39 6.50672 3.41375C6.562 3.4375 6.62146 3.45 6.68163 3.45052C6.74179 3.45104 6.80146 3.43958 6.85715 3.41679C6.91284 3.39401 6.96343 3.36036 7.00597 3.31782C7.04852 3.27527 7.08216 3.22468 7.10495 3.16899C7.12773 3.11331 7.1392 3.05364 7.13867 2.99347C7.13815 2.93331 7.12565 2.87385 7.1019 2.81857C7.07815 2.76328 7.04363 2.71328 7.00036 2.67148L5.82857 1.4997C5.74311 1.41716 5.62865 1.37149 5.50985 1.37252C5.39104 1.37356 5.27739 1.42121 5.19338 1.50522C5.10936 1.58924 5.06171 1.70289 5.06068 1.82169C5.05964 1.9405 5.10532 2.05496 5.18786 2.14042L6.35964 3.3122ZM5.79686 5.57783C5.91703 5.57783 6.03229 5.53009 6.11726 5.44511C6.20224 5.36013 6.24998 5.24488 6.24998 5.1247C6.24998 5.00453 6.20224 4.88927 6.11726 4.8043C6.03229 4.71932 5.91703 4.67158 5.79686 4.67158H4.13933C4.01915 4.67158 3.90389 4.71932 3.81892 4.8043C3.73394 4.88927 3.6862 5.00453 3.6862 5.1247C3.6862 5.24488 3.73394 5.36013 3.81892 5.44511C3.90389 5.53009 4.01915 5.57783 4.13933 5.57783H5.79686ZM13.4864 5.57783C13.6066 5.57783 13.7218 5.53009 13.8068 5.44511C13.8918 5.36013 13.9395 5.24488 13.9395 5.1247C13.9395 5.00453 13.8918 4.88927 13.8068 4.8043C13.7218 4.71932 13.6066 4.67158 13.4864 4.67158H11.8289C11.7087 4.67158 11.5934 4.71932 11.5084 4.8043C11.4235 4.88927 11.3757 5.00453 11.3757 5.1247C11.3757 5.24488 11.4235 5.36013 11.5084 5.44511C11.5934 5.53009 11.7087 5.57783 11.8289 5.57783H13.4864ZM11.7971 8.7497C11.8389 8.79298 11.8889 8.8275 11.9442 8.85125C11.9995 8.875 12.059 8.8875 12.1191 8.88802C12.1793 8.88854 12.239 8.87708 12.2946 8.85429C12.3503 8.83151 12.4009 8.79786 12.4435 8.75532C12.486 8.71278 12.5197 8.66218 12.5424 8.60649C12.5652 8.55081 12.5767 8.49114 12.5762 8.43097C12.5756 8.37081 12.5632 8.31135 12.5394 8.25607C12.5157 8.20078 12.4811 8.15078 12.4379 8.10898L11.2661 6.9372C11.2243 6.89393 11.1743 6.85941 11.119 6.83566C11.0637 6.81191 11.0042 6.79941 10.9441 6.79889C10.8839 6.79836 10.8243 6.80983 10.7686 6.83261C10.7129 6.8554 10.6623 6.88904 10.6197 6.93159C10.5772 6.97413 10.5435 7.02472 10.5208 7.08041C10.498 7.1361 10.4865 7.19577 10.487 7.25593C10.4876 7.3161 10.5001 7.37556 10.5238 7.43084C10.5476 7.48612 10.5821 7.53612 10.6254 7.57792L11.7971 8.7497ZM8.35973 9.79823C8.35973 9.91841 8.40747 10.0337 8.49245 10.1186C8.57743 10.2036 8.69268 10.2514 8.81286 10.2514C8.93303 10.2514 9.04829 10.2036 9.13326 10.1186C9.21824 10.0337 9.26598 9.91841 9.26598 9.79823V8.1407C9.26598 8.02053 9.21824 7.90527 9.13326 7.82029C9.04829 7.73532 8.93303 7.68758 8.81286 7.68758C8.69268 7.68758 8.57743 7.73532 8.49245 7.82029C8.40747 7.90527 8.35973 8.02053 8.35973 8.1407V9.79823Z" fill="#FFFFFF"/>
          </svg>
        </button>
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
});

ScriptModalItem.displayName = 'ScriptModalItem';

// 메모이제이션된 컴포넌트로 export
export const MemoizedScriptModalItem = React.memo(ScriptModalItem);

// 기존 export도 유지 (호환성)
export { ScriptModalItem };

const itemStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  width: '100%',
  marginTop: '20px',
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

// 연습 툴바의 마법사 버튼 스타일과 일치
const magicButtonStyle: React.CSSProperties = {
  width: '32px',
  height: '32px',
  borderRadius: '12px',
  border: 'none',
  backgroundColor: colors.primary.normal,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  marginLeft: '8px',
};