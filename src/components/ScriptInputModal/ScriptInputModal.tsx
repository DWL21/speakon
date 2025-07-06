import React, { useState } from 'react';

export interface SlideInput {
  slideNumber: number;
  pageNumber: number;
  content: string;
}

interface ModalInputProps {
  slideNumber: number;
  value: string;
  onChange: (value: string) => void;
  focused?: boolean;
}

const ModalInput: React.FC<ModalInputProps> = ({ slideNumber, value, onChange, focused }) => {
  return (
    <div style={modalInputStyle}>
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

export interface ScriptInputModalProps {
  /** 모달 열림 상태 */
  isOpen: boolean;
  /** 모달 닫기 콜백 */
  onClose: () => void;
  /** 페이지 제목 */
  title?: string;
  /** 페이지 설명 */
  description?: string;
  /** 슬라이드 개수 */
  slideCount?: number;
  /** 슬라이드 입력 데이터 */
  slides: SlideInput[];
  /** 슬라이드 내용 변경 시 호출되는 콜백 */
  onSlideChange?: (slideNumber: number, content: string) => void;
  /** 저장 버튼 클릭 시 호출되는 콜백 */
  onSave?: () => void;
  /** 미리보기 콘텐츠 렌더링 함수 */
  renderPreviewContent?: () => React.ReactNode;
}

export const ScriptInputModal: React.FC<ScriptInputModalProps> = ({
  isOpen,
  onClose,
  title = "발표 대본",
  description = "설명을 입력하세요",
  slideCount = 5,
  slides,
  onSlideChange,
  onSave,
  renderPreviewContent,
}) => {
  const [slideInputs, setSlideInputs] = useState<SlideInput[]>(slides);

  const handleSlideChange = (slideNumber: number, content: string) => {
    setSlideInputs(prev => 
      prev.map(slide => 
        slide.slideNumber === slideNumber
          ? { ...slide, content }
          : slide
      )
    );
    onSlideChange?.(slideNumber, content);
  };

  if (!isOpen) return null;

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <div style={modalContentStyle}>
          <div style={contentWrapperStyle}>
            <div style={leftSectionStyle}>
              <div style={titleSectionStyle}>
                <h2 style={titleStyle}>{title}</h2>
                <p style={descriptionStyle}>{description}</p>
              </div>
              <div style={previewSectionStyle}>
                {renderPreviewContent ? renderPreviewContent() : (
                  <div style={previewPlaceholderStyle}>
                    <div style={previewImageStyle} />
                  </div>
                )}
              </div>
            </div>
            
            <div style={dividerStyle} />
            
            <div style={rightSectionStyle}>
              <div style={inputListStyle}>
                {Array.from({ length: slideCount }, (_, index) => {
                  const slideNumber = index + 1;
                  const currentSlide = slideInputs.find(s => s.slideNumber === slideNumber) || { 
                    slideNumber, 
                    pageNumber: 1, 
                    content: '' 
                  };
                  
                  return (
                    <ModalInput
                      key={slideNumber}
                      slideNumber={slideNumber}
                      value={currentSlide.content}
                      onChange={(content) => handleSlideChange(slideNumber, content)}
                    />
                  );
                })}
              </div>
              <div style={scrollbarStyle} />
            </div>
          </div>
        </div>
        
        <div style={footerStyle}>
          <button style={cancelButtonStyle} onClick={onClose}>
            닫기
          </button>
          <button style={saveButtonStyle} onClick={onSave}>
            저장
          </button>
        </div>
      </div>
    </div>
  );
};

// 스타일 정의
const overlayStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
};

const modalStyle: React.CSSProperties = {
  backgroundColor: '#ffffff',
  borderRadius: '32px',
  width: '1050px',
  maxWidth: '90vw',
  maxHeight: '90vh',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
};

const modalContentStyle: React.CSSProperties = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
};

const contentWrapperStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '20px',
  width: '100%',
  height: '100%',
  gap: '20px',
};

const leftSectionStyle: React.CSSProperties = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  maxWidth: '350px',
  gap: '20px',
};

const titleSectionStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'end',
  justifyContent: 'flex-start',
  width: '100%',
  gap: '15px',
};

const titleStyle: React.CSSProperties = {
  fontFamily: 'Pretendard',
  fontWeight: 600,
  fontSize: '20px',
  color: '#171719',
  margin: 0,
};

const descriptionStyle: React.CSSProperties = {
  fontFamily: 'Pretendard',
  fontWeight: 400,
  fontSize: '13px',
  color: '#78787b',
  margin: 0,
  alignSelf: 'flex-end',
};

const previewSectionStyle: React.CSSProperties = {
  backgroundColor: '#f1f2f5',
  height: '459px',
  width: '100%',
  maxWidth: '340px',
  borderRadius: '12px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '10px',
};

const previewPlaceholderStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const previewImageStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
  backgroundColor: '#eeeeee',
  borderRadius: '8px',
};

const dividerStyle: React.CSSProperties = {
  width: '1px',
  height: '598px',
  backgroundColor: '#eeeeee',
  margin: '0 5px',
};

const rightSectionStyle: React.CSSProperties = {
  flex: 1,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
  justifyContent: 'center',
  height: '100%',
};

const inputListStyle: React.CSSProperties = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  overflowY: 'auto',
  maxHeight: '598px',
  paddingRight: '10px',
};

const scrollbarStyle: React.CSSProperties = {
  width: '6.539px',
  height: '142px',
  backgroundColor: '#d9d9d9',
  borderRadius: '3px',
  marginLeft: '8px',
  marginTop: '44px',
};

const modalInputStyle: React.CSSProperties = {
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

const footerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: '20px 52px',
  gap: '10px',
  borderTop: '1px solid #eeeeee',
};

const cancelButtonStyle: React.CSSProperties = {
  backgroundColor: '#f1f2f5',
  color: '#7d7e83',
  border: 'none',
  borderRadius: '8px',
  padding: '10px 20px',
  width: '110px',
  fontFamily: 'Pretendard',
  fontWeight: 500,
  fontSize: '13px',
  cursor: 'pointer',
};

const saveButtonStyle: React.CSSProperties = {
  backgroundColor: '#3282ff',
  color: '#ffffff',
  border: 'none',
  borderRadius: '8px',
  padding: '10px 20px',
  width: '110px',
  fontFamily: 'Pretendard',
  fontWeight: 500,
  fontSize: '13px',
  cursor: 'pointer',
}; 