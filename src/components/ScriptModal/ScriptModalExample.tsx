import React, { useState } from 'react';
import { ScriptModal, SlideInput } from './ScriptModal';

const ScriptInputModalExample: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [slideCount, setSlideCount] = useState(5);
  const [slides, setSlides] = useState<SlideInput[]>([
    { slideNumber: 1, pageNumber: 1, content: '' },
    { slideNumber: 2, pageNumber: 1, content: '' },
    { slideNumber: 3, pageNumber: 1, content: '' },
    { slideNumber: 4, pageNumber: 1, content: '' },
    { slideNumber: 5, pageNumber: 1, content: '' },
  ]);

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

  const handleSave = () => {
    console.log('저장된 슬라이드 내용:', slides);
    alert('저장되었습니다!');
  };

  const handleSlideCountChange = (newCount: number) => {
    setSlideCount(newCount);
    
    // 슬라이드 개수가 변경되면 slides 배열도 업데이트
    const newSlides = Array.from({ length: newCount }, (_, index) => {
      const slideNumber = index + 1;
      const existingSlide = slides.find(s => s.slideNumber === slideNumber);
      return existingSlide || { slideNumber, pageNumber: 1, content: '' };
    });
    setSlides(newSlides);
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
    <div style={{ padding: '20px' }}>
      <h1>ScriptInputModal 예시</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>
          슬라이드 개수:
        </label>
        <input
          type="number"
          min="1"
          max="10"
          value={slideCount}
          onChange={(e) => handleSlideCountChange(parseInt(e.target.value) || 1)}
          style={{ 
            padding: '8px', 
            borderRadius: '4px', 
            border: '1px solid #ddd',
            width: '80px'
          }}
        />
      </div>

      <button 
        onClick={() => setIsModalOpen(true)}
        style={{
          backgroundColor: '#3282ff',
          color: 'white',
          border: 'none',
          padding: '12px 24px',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '16px'
        }}
      >
        스크립트 입력 모달 열기
      </button>

      <ScriptModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="발표 대본"
        description="설명을 입력하세요"
        slideCount={slideCount}
        slides={slides}
        onSlideChange={handleSlideChange}
        onSave={handleSave}
        renderPreviewContent={renderPreviewContent}
      />
    </div>
  );
};

export default ScriptInputModalExample; 