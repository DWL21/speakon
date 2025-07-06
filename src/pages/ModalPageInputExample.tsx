import { useState } from 'react';
import { ScriptInputModal, SlideInput } from '../components/ScriptInputModal';

export function ModalPageInputExample() {
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
    setIsModalOpen(false);
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
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '20px',
      width: '100%',
      height: '100%',
      backgroundColor: '#f5f5f5',
      position: 'relative',
      padding: '20px',
      boxSizing: 'border-box'
    }}>
      {/* 페이지 번호 표시 */}
      <div style={{
        position: 'absolute',
        top: '10px',
        left: '15px',
        fontSize: '12px',
        color: '#999',
        fontFamily: 'Pretendard, sans-serif'
      }}>
        LOGO CONED 기업 홍보자료
      </div>
      
      {/* 페이지 번호 */}
      <div style={{
        position: 'absolute',
        top: '10px',
        right: '15px',
        fontSize: '12px',
        color: '#999',
        fontFamily: 'Pretendard, sans-serif'
      }}>
        1 / 1
      </div>
      
      {/* 메인 콘텐츠 */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '20px',
        textAlign: 'center'
      }}>
        <div style={{
          fontSize: '14px',
          color: '#666',
          fontFamily: 'Pretendard, sans-serif',
          marginBottom: '10px'
        }}>
          기후변화 대응 기업가들의 상품 주문 시판 대응 제품 대응 상품 대응서비스
        </div>
        
        <div style={{
          fontSize: '48px',
          fontWeight: 'bold',
          color: '#000',
          fontFamily: 'Pretendard, sans-serif',
          letterSpacing: '2px'
        }}>
          NEWWW.
        </div>
        
        <div style={{
          fontSize: '12px',
          color: '#666',
          fontFamily: 'Pretendard, sans-serif',
          marginTop: '30px'
        }}>
          2024년 환경 중점 추진 사업
        </div>
      </div>
    </div>
  );

  return (
    <div style={{
      padding: '40px',
      fontFamily: 'Pretendard, sans-serif',
      backgroundColor: '#f5f5f5',
      minHeight: '100vh'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '40px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
      }}>
        <h1 style={{
          fontSize: '32px',
          fontWeight: '600',
          marginBottom: '20px',
          color: '#171719'
        }}>
          ScriptInputModal 컴포넌트 예제
        </h1>
        
        <p style={{
          fontSize: '16px',
          color: '#666',
          marginBottom: '30px',
          lineHeight: '1.6'
        }}>
          피그마 디자인을 기반으로 구현된 발표 대본 입력 모달입니다. 
          슬라이드 개수를 조정하고 모달을 열어보세요.
        </p>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '5px',
            fontSize: '14px',
            color: '#171719',
            fontWeight: '500'
          }}>
            슬라이드 개수:
          </label>
          <input
            type="number"
            min="1"
            max="10"
            value={slideCount}
            onChange={(e) => handleSlideCountChange(parseInt(e.target.value) || 1)}
            style={{ 
              padding: '8px 12px', 
              borderRadius: '4px', 
              border: '1px solid #ddd',
              width: '80px',
              fontSize: '14px'
            }}
          />
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          style={{
            padding: '16px 32px',
            fontSize: '16px',
            fontWeight: '500',
            backgroundColor: '#3282FF',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(50, 130, 255, 0.3)'
          }}
        >
          스크립트 입력 모달 열기
        </button>

        {/* 현재 슬라이드 데이터 표시 */}
        <div style={{
          marginTop: '40px',
          padding: '20px',
          backgroundColor: '#f8f9fa',
          borderRadius: '12px'
        }}>
          <h3 style={{
            fontSize: '20px',
            fontWeight: '600',
            marginBottom: '16px',
            color: '#171719'
          }}>
            현재 슬라이드 데이터
          </h3>
          {slides.map((slide) => (
            <div key={slide.slideNumber} style={{
              marginBottom: '12px',
              padding: '12px',
              backgroundColor: 'white',
              borderRadius: '8px',
              border: '1px solid #e9ecef'
            }}>
              <div style={{
                fontSize: '14px',
                color: '#171719',
                fontWeight: '500',
                marginBottom: '4px'
              }}>
                슬라이드 {slide.slideNumber}
              </div>
              <div style={{
                fontSize: '13px',
                color: '#666',
                padding: '4px 0',
                minHeight: '20px'
              }}>
                {slide.content || '(내용 없음)'}
              </div>
            </div>
          ))}
        </div>
      </div>

      <ScriptInputModal
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
} 