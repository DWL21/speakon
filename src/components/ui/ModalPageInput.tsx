import React, { useState } from 'react';
import { PagePreview } from './PagePreview';

interface SlideInput {
  slideNumber: number;
  pageNumber: number;
  content: string;
}

interface ModalPageInputProps {
  /** 전체 페이지 수 */
  totalPages: number;
  /** 현재 페이지 번호 */
  currentPage: number;
  /** 미리보기 콘텐츠 렌더링 함수 */
  renderPageContent?: (pageNumber: number) => React.ReactNode;
  /** 페이지 변경 시 호출되는 콜백 */
  onPageChange?: (pageNumber: number) => void;
  /** 페이지 제목 */
  title?: string;
  /** 페이지 설명 */
  description?: string;
  /** 슬라이드 입력 데이터 */
  slides: SlideInput[];
  /** 슬라이드 내용 변경 시 호출되는 콜백 */
  onSlideChange?: (slideNumber: number, content: string) => void;
  /** 저장 버튼 클릭 시 호출되는 콜백 */
  onSave?: () => void;
  /** 모달 닫기 콜백 */
  onClose?: () => void;
}

export const ModalPageInput: React.FC<ModalPageInputProps> = ({
  totalPages,
  currentPage,
  renderPageContent,
  onPageChange,
  title = "발표 대본",
  description = "설명을 입력하세요",
  slides,
  onSlideChange,
  onSave,
  onClose
}) => {
  const [slideInputs, setSlideInputs] = useState<SlideInput[]>(slides);

  const handleSlideChange = (pageNumber: number, slideNumber: number, content: string) => {
    setSlideInputs(prev => 
      prev.map(slide => 
        slide.pageNumber === pageNumber && slide.slideNumber === slideNumber
          ? { ...slide, content }
          : slide
      )
    );
    onSlideChange?.(slideNumber, content);
  };

  const handleSave = () => {
    onSave?.();
  };

  return (
    <div style={modalOverlayStyle}>
      <div style={modalContainerStyle}>
        {/* 메인 콘텐츠 영역 */}
        <div style={mainContentStyle}>
          <div style={contentWrapperStyle}>
            <div style={contentRowStyle}>
              {/* 페이지 미리보기 영역 */}
              <div style={previewSectionStyle}>
                <PagePreview
                  totalPages={totalPages}
                  currentPage={currentPage}
                  renderPageContent={renderPageContent}
                  onPageChange={onPageChange}
                  title={title}
                  description={description}
                />
              </div>

              {/* 세로 구분선 - PagePreview와 ModalInputBox 사이 */}
              <div style={verticalDividerStyle} />

              {/* 슬라이드 입력 영역 */}
              <div style={inputSectionStyle}>
                <div style={inputWrapperStyle}>
                  {/* 현재 페이지에 대한 여러 개의 슬라이드 입력 영역 */}
                  {Array.from({ length: 4 }, (_, index) => {
                    const slideKey = `${currentPage}-${index}`;
                    const slideNumber = index + 1;
                    const currentSlide = slideInputs.find(s => s.pageNumber === currentPage && s.slideNumber === slideNumber) || { 
                      slideNumber: slideNumber, 
                      pageNumber: currentPage, 
                      content: '' 
                    };
                    
                    return (
                      <div key={slideKey} style={{
                        ...slideInputContainerStyle,
                        marginTop: '20px',
                        marginBottom: '25px',
                      }}>
                        {/* 슬라이드 제목 */}
                        <div style={slideTitleWrapperStyle}>
                          <div style={slideTitleStyle}>
                            슬라이드{currentPage}
                          </div>
                        </div>

                        {/* 입력 박스 */}
                        <div style={inputBoxStyle}>
                          <textarea
                            value={currentSlide.content}
                            onChange={(e) => handleSlideChange(currentPage, slideNumber, e.target.value)}
                            placeholder="내용을 입력하세요."
                            style={textareaStyle}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* 스크롤바 */}
                <div style={scrollbarStyle}>
                  <svg width="7" height="143" viewBox="0 0 7 143" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="0.0332031" y="0.688354" width="6.53906" height="142" rx="3" fill="#D9D9D9"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 하단 영역 */}
        <div style={bottomSectionStyle}>
          <div style={horizontalDividerStyle} />
          <div style={buttonSectionStyle}>
            <button
              onClick={handleSave}
              style={saveButtonStyle}
            >
              저장
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// 스타일 정의
const modalOverlayStyle: React.CSSProperties = {
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

const modalContainerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '0px',
  position: 'absolute',
  width: '1050px',
  height: '650px',
  background: '#FFFFFF',
  borderRadius: '32px',
};

const mainContentStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '20px 20px',
  width: '1050px',
  height: '578px',
  flex: 'none',
  order: 0,
  alignSelf: 'stretch',
  flexGrow: 1,
};

const contentWrapperStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '9px 0px',
  gap: '10px',
  width: '1010px',
  height: '100%',
  flex: 'none',
  order: 0,
  alignSelf: 'stretch',
  flexGrow: 1,
};

const contentRowStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '0px',
  gap: '10px',
  width: '1010px',
  height: '100%',
  flex: 'none',
  order: 0,
  flexGrow: 1,
};

const previewSectionStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '0px',
  gap: '10px',
  width: '350px',
  maxWidth: '350px',
  height: '503px',
  flex: 'none',
  order: 0,
  flexGrow: 1,
};

const verticalDividerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0px',
  width: '1px',
  height: '100%',
  background: '#EEEEEE',
  flex: 'none',
  flexShrink: 0,
};

const inputSectionStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'flex-start',
  padding: '0px',
  width: '620px',
  height: '100%',
  flex: 'none',
  order: 2,
  flexGrow: 1,
};

const inputWrapperStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  padding: '0px',
  gap: '0px',
  width: '597px',
  height: '100%',
  flex: 'none',
  order: 0,
  flexGrow: 1,
  overflowY: 'auto',
};

const slideInputContainerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  padding: '0px',
  gap: '0px',
  width: '597px',
  height: '120px',
  flex: 'none',
  alignSelf: 'stretch',
  flexGrow: 0,
};

const slideTitleWrapperStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  padding: '0px',
  gap: '5px',
  width: '95px',
  height: '21px',
  flex: 'none',
  order: 0,
  flexGrow: 0,
};

const slideTitleStyle: React.CSSProperties = {
  width: '71px',
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
  flex: 'none',
  order: 0,
  flexGrow: 0,
};

const inputBoxStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
  padding: '15px 27px',
  gap: '10px',
  width: '597px',
  height: '87px',
  background: '#F1F2F5',
  borderRadius: '10px',
  flex: 'none',
  order: 1,
  alignSelf: 'stretch',
  flexGrow: 0,
};

const textareaStyle: React.CSSProperties = {
  width: '543px',
  height: '57px',
  fontFamily: 'Pretendard',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '13px',
  lineHeight: 'normal',
  color: 'var(--Label-Alternative, #78787B)',
  border: 'none',
  outline: 'none',
  resize: 'none',
  background: 'transparent',
  flex: 'none',
  order: 0,
  alignSelf: 'stretch',
  flexGrow: 1,
};

const scrollbarStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '11px 8px',
  gap: '10px',
  width: '22.54px',
  height: '100%',
  flex: 'none',
  order: 1,
  alignSelf: 'stretch',
  flexGrow: 0,
};



const bottomSectionStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  padding: '0px',
  gap: '4px',
  width: '1050px',
  height: '72px',
  flex: 'none',
  order: 1,
  alignSelf: 'stretch',
  flexGrow: 0,
};

const horizontalDividerStyle: React.CSSProperties = {
  width: '1050px',
  height: '0px',
  border: '1px solid #EEEEEE',
  transform: 'rotate(-0.11deg)',
  flex: 'none',
  order: 0,
  alignSelf: 'stretch',
  flexGrow: 0,
};

const buttonSectionStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-end',
  alignItems: 'center',
  padding: '16px 52px',
  gap: '24px',
  width: '1050px',
  height: '68px',
  flex: 'none',
  order: 2,
  alignSelf: 'stretch',
  flexGrow: 0,
};

const saveButtonStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '10px 20px',
  gap: '20px',
  width: '110px',
  height: '36px',
  background: '#3282FF',
  borderRadius: '8px',
  border: 'none',
  cursor: 'pointer',
  fontFamily: 'Pretendard',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '13px',
  lineHeight: '16px',
  color: '#FFFFFF',
  flex: 'none',
  order: 0,
  flexGrow: 0,
}; 