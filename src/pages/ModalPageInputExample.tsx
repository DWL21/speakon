import React, { useState } from 'react';
import { ScriptModal, SlideInput } from '../components/ScriptModal';
import { colors } from '../theme/colors';

export function ModalPageInputExample() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  
  // 새로운 ScriptInputModal 상태
  const [isScriptModalOpen, setIsScriptModalOpen] = useState(false);
  const slideCount = 5;
  const [slides, setSlides] = useState<SlideInput[]>([
    { slideNumber: 1, pageNumber: 1, content: '' },
    { slideNumber: 2, pageNumber: 1, content: '' },
    { slideNumber: 3, pageNumber: 1, content: '' },
    { slideNumber: 4, pageNumber: 1, content: '' },
    { slideNumber: 5, pageNumber: 1, content: '' },
  ]);



  // 새로운 ScriptInputModal 핸들러들
  const handleSlideChange = (slideNumber: number, content: string) => {
    console.log(`슬라이드 ${slideNumber} 내용 변경:`, content);
    setSlides(prev => 
      prev.map(slide => 
        slide.slideNumber === slideNumber 
          ? { ...slide, content }
          : slide
      )
    );
  };

  const handleSlidesSave = () => {
    console.log('저장된 슬라이드 내용:', slides);
    alert('슬라이드가 저장되었습니다!');
    setIsScriptModalOpen(false);
  };

  const renderPreviewContent = () => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
      <div style={{ 
        width: '80%', 
        height: '80%', 
        backgroundColor: '#ffffff', 
        borderRadius: '8px', 
        border: '1px solid #ddd',
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        fontSize: '14px',
        color: '#666'
      }}>
        PDF 미리보기 영역
      </div>
    </div>
  );



  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        <h1 style={titleStyle}>스크립트 입력 폼 예시</h1>
        
        <p style={descriptionStyle}>
          피그마 디자인을 기반으로 구현된 발표 대본 입력 폼입니다. 
          다양한 타이틀과 스크립트를 입력할 수 있습니다.
        </p>

        <div style={buttonContainerStyle}>
          <button
            onClick={() => setIsModalOpen(true)}
            style={openButtonStyle}
          >
            스크립트 입력 폼 열기
          </button>
          <button
            onClick={() => setIsScriptModalOpen(true)}
            style={{...openButtonStyle, backgroundColor: colors.primary.strong, marginLeft: '16px'}}
          >
            새 스크립트 모달 열기
          </button>
        </div>



        {/* 새로운 ScriptInputModal */}
        <ScriptModal
          isOpen={isScriptModalOpen}
          onClose={() => setIsScriptModalOpen(false)}
          title="발표 대본"
          description="피그마 디자인 기반 모달"
          slideCount={slideCount}
          slides={slides}
          onSlideChange={handleSlideChange}
          onSave={handleSlidesSave}
          renderPreviewContent={renderPreviewContent}
        />

        {/* 기존 모달 */}
        {isModalOpen && (
          <div style={modalOverlayStyle}>
            <div style={modalContainerStyle}>
              <div style={modalHeaderStyle}>
                <h2 style={modalTitleStyle}>스크립트 입력</h2>
                <button 
                  style={closeButtonStyle}
                  onClick={() => setIsModalOpen(false)}
                >
                  ×
                </button>
              </div>
              
              <div style={modalContentStyle}>
                <div style={{ padding: '24px', textAlign: 'center' }}>
                  <p>기존 ScriptInputForm이 제거되었습니다.</p>
                  <p>새로운 ScriptModal을 사용해 주세요.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div style={codeExampleStyle}>
          <h3 style={codeHeadingStyle}>사용 예시 코드:</h3>
          <pre style={codeStyle}>
{`import { ScriptModal, SlideInput } from '../components/ScriptModal';

const [isScriptModalOpen, setIsScriptModalOpen] = useState(false);
const [slides, setSlides] = useState<SlideInput[]>([
  { slideNumber: 1, pageNumber: 1, content: '' },
  // ... more slides
]);

const handleSlideChange = (slideNumber: number, content: string) => {
  setSlides(prev => 
    prev.map(slide => 
      slide.slideNumber === slideNumber 
        ? { ...slide, content }
        : slide
    )
  );
};

<ScriptModal
  isOpen={isScriptModalOpen}
  onClose={() => setIsScriptModalOpen(false)}
  title="발표 대본"
  description="피그마 디자인 기반 모달"
  slideCount={5}
  slides={slides}
  onSlideChange={handleSlideChange}
  onSave={handleSlidesSave}
  renderPreviewContent={renderPreviewContent}
/>`}
          </pre>
        </div>
      </div>
    </div>
  );
}

// 스타일 정의
const containerStyle: React.CSSProperties = {
  padding: '40px 20px',
  fontFamily: 'Pretendard, sans-serif',
  backgroundColor: colors.background.alternative,
  minHeight: '100vh',
};

const contentStyle: React.CSSProperties = {
  maxWidth: '1200px',
  margin: '0 auto',
  backgroundColor: colors.background.normal,
  borderRadius: '16px',
  padding: '40px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
};

const titleStyle: React.CSSProperties = {
  fontSize: '32px',
  fontWeight: 600,
  marginBottom: '20px',
  color: colors.label.normal,
  textAlign: 'center',
};

const descriptionStyle: React.CSSProperties = {
  fontSize: '16px',
  color: colors.label.alternative,
  marginBottom: '30px',
  lineHeight: '1.6',
  textAlign: 'center',
};

const buttonContainerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  marginBottom: '40px',
};

const openButtonStyle: React.CSSProperties = {
  padding: '16px 32px',
  fontSize: '16px',
  fontWeight: 500,
  backgroundColor: colors.primary.normal,
  color: colors.static.white,
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  boxShadow: '0 2px 8px rgba(50, 130, 255, 0.3)',
  transition: 'background-color 0.2s ease',
};

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
  backgroundColor: colors.background.normal,
  borderRadius: '16px',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
  maxWidth: '500px',
  width: '90%',
  maxHeight: '90vh',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
};

const modalHeaderStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '20px 24px',
  borderBottom: `1px solid ${colors.line.normal}`,
};

const modalTitleStyle: React.CSSProperties = {
  fontSize: '20px',
  fontWeight: 600,
  color: colors.label.normal,
  margin: 0,
};

const closeButtonStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '32px',
  height: '32px',
  backgroundColor: 'transparent',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontSize: '20px',
  color: colors.label.assistive,
  transition: 'background-color 0.2s ease',
};

const modalContentStyle: React.CSSProperties = {
  padding: '0',
  flex: 1,
  overflow: 'auto',
};



const codeExampleStyle: React.CSSProperties = {
  backgroundColor: colors.fill.normal,
  padding: '24px',
  borderRadius: '12px',
};

const codeHeadingStyle: React.CSSProperties = {
  fontSize: '20px',
  fontWeight: 600,
  color: colors.label.normal,
  marginBottom: '16px',
};

const codeStyle: React.CSSProperties = {
  backgroundColor: colors.background.normal,
  padding: '20px',
  borderRadius: '8px',
  fontSize: '14px',
  color: colors.label.normal,
  fontFamily: 'monospace',
  overflow: 'auto',
  lineHeight: '1.5',
  margin: 0,
}; 