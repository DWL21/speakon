import React, { useState } from 'react';
import { ModalPageInput } from '../components/ui';

interface SlideData {
  slideNumber: number;
  pageNumber: number;
  content: string;
}

export function ModalPageInputExample() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [slides, setSlides] = useState<SlideData[]>(() => {
    const initialSlides: SlideData[] = [];
    // 각 페이지(1-10)에 대해 4개씩의 슬라이드 생성
    for (let pageNumber = 1; pageNumber <= 10; pageNumber++) {
      for (let slideNumber = 1; slideNumber <= 4; slideNumber++) {
        initialSlides.push({
          slideNumber,
          pageNumber,
          content: ''
        });
      }
    }
    return initialSlides;
  });

  const handleSlideChange = (slideNumber: number, content: string) => {
    setSlides(prev => 
      prev.map(slide => 
        slide.slideNumber === slideNumber && slide.pageNumber === currentPage
          ? { ...slide, content }
          : slide
      )
    );
  };

  const handleSave = () => {
    console.log('저장된 슬라이드 데이터:', slides);
    setIsModalOpen(false);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // 페이지 콘텐츠 렌더링 함수
  const renderPageContent = (pageNumber: number) => {
    return (
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
          {pageNumber} / 10
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
  };

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
          모달 페이지 입력 컴포넌트 예제
        </h1>
        
        <p style={{
          fontSize: '16px',
          color: '#666',
          marginBottom: '30px',
          lineHeight: '1.6'
        }}>
          페이지 미리보기와 슬라이드 입력을 합친 모달 컴포넌트입니다. 
          버튼을 클릭하여 모달을 열어보세요.
        </p>

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
          모달 페이지 입력 열기
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
          {Array.from({ length: 10 }, (_, pageIndex) => {
            const pageNumber = pageIndex + 1;
            const pageSlides = slides.filter(slide => slide.pageNumber === pageNumber);
            
            return (
              <div key={pageNumber} style={{
                marginBottom: '20px',
                padding: '16px',
                backgroundColor: pageNumber === currentPage ? '#e3f2fd' : 'white',
                borderRadius: '8px',
                border: '1px solid #e9ecef'
              }}>
                <h4 style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  marginBottom: '8px',
                  color: '#171719'
                }}>
                  페이지 {pageNumber} {pageNumber === currentPage ? '(현재)' : ''}
                </h4>
                {pageSlides.map((slide) => (
                  <div key={`${slide.pageNumber}-${slide.slideNumber}`} style={{
                    marginBottom: '8px',
                    padding: '8px',
                    backgroundColor: pageNumber === currentPage ? '#ffffff' : '#f8f9fa',
                    borderRadius: '4px',
                    fontSize: '14px'
                  }}>
                    <strong>슬라이드 {slide.slideNumber}:</strong> {slide.content || '(내용 없음)'}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>

      {/* 모달 */}
      {isModalOpen && (
        <ModalPageInput
          totalPages={10}
          currentPage={currentPage}
          renderPageContent={renderPageContent}
          onPageChange={handlePageChange}
          title="발표 대본"
          description="설명을 입력하세요"
          slides={slides}
          onSlideChange={handleSlideChange}
          onSave={handleSave}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
} 