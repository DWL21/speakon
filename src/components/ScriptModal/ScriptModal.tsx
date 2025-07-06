import React, { useState, useEffect } from 'react';
import { ScriptModalOverlay } from './ScriptModalOverlay';
import { ScriptModalContainer } from './ScriptModalContainer';
import { ScriptModalContent } from './ScriptModalContent';
import { ScriptModalPreview } from './ScriptModalPreview';
import { ScriptModalDivider } from './ScriptModalDivider';
import { ScriptModalForm } from './ScriptModalForm';
import { ScriptModalFooter } from './ScriptModalFooter';
import { SlideInput } from './ScriptModalForm';
import { getPdfPageCount } from '../../lib/pdfUtils';
import { ErrorModal } from '../ui/ErrorModal';

export interface ScriptModalProps {
  /** 모달 열림 상태 */
  isOpen: boolean;
  /** 모달 닫기 콜백 */
  onClose: () => void;
  /** PDF 파일 (필수) */
  pdfFile: File;
  /** 페이지 제목 */
  title?: string;
  /** 페이지 설명 */
  description?: string;
  /** 슬라이드 입력 데이터 */
  slides?: SlideInput[];
  /** 슬라이드 내용 변경 시 호출되는 콜백 */
  onSlideChange?: (slideNumber: number, content: string) => void;
  /** 저장 버튼 클릭 시 호출되는 콜백 */
  onSave?: () => void;
  /** 미리보기 콘텐츠 렌더링 함수 */
  renderPreviewContent?: () => React.ReactNode;
}

export const ScriptModal: React.FC<ScriptModalProps> = ({
  isOpen,
  onClose,
  pdfFile,
  title = "발표 대본",
  description = "설명을 입력하세요",
  slides = [],
  onSlideChange,
  onSave,
  renderPreviewContent,
}) => {
  const [slideInputs, setSlideInputs] = useState<SlideInput[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoadingPageCount, setIsLoadingPageCount] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // PDF 파일의 페이지 수를 가져와서 슬라이드 생성
  useEffect(() => {
    const loadPdfPageCount = async () => {
      if (!pdfFile) {
        setError('PDF 파일이 필요합니다.');
        return;
      }

      setIsLoadingPageCount(true);
      setError(null);
      
      try {
        // PDF 파일의 실제 페이지 수 가져오기
        const pageCount = await getPdfPageCount(pdfFile);
        console.log('📄 PDF 페이지 수:', pageCount);
        
        // PDF 페이지 수에 맞게 슬라이드 생성
        const pdfSlides = Array.from({ length: pageCount }, (_, index) => {
          const slideNumber = index + 1;
          const existingSlide = slides.find(s => s.slideNumber === slideNumber);
          return existingSlide || {
            slideNumber,
            pageNumber: slideNumber,
            content: ''
          };
        });
        setSlideInputs(pdfSlides);
      } catch (error) {
        console.error('PDF 페이지 수 가져오기 실패:', error);
        const errorMessage = error instanceof Error ? error.message : 'PDF 파일을 읽을 수 없습니다. 올바른 PDF 파일인지 확인해주세요.';
        setError(errorMessage);
        setSlideInputs([]);
      } finally {
        setIsLoadingPageCount(false);
      }
    };

    loadPdfPageCount();
  }, [pdfFile, slides]);

  const handleSlideChange = (slideNumber: number, content: string) => {
    // 현재 슬라이드의 내용과 같다면 아무 작업도 하지 않음
    const currentSlide = slideInputs.find(slide => slide.slideNumber === slideNumber);
    if (currentSlide && currentSlide.content === content) {
      console.log('📝 내용 변경 → 이미 같은 내용', slideNumber, '(상태 업데이트 없음)');
      return;
    }

    console.log('📝 내용 변경 → 상태 업데이트', slideNumber);
    setSlideInputs(prev => 
      prev.map(slide => 
        slide.slideNumber === slideNumber
          ? { ...slide, content }
          : slide
      )
    );
    onSlideChange?.(slideNumber, content);
  };

  const handleFocus = (slideNumber: number) => {
    // 현재 페이지와 같다면 아무 작업도 하지 않음
    if (currentPage === slideNumber) {
      console.log('🎯 포커스 → 이미 같은 페이지', slideNumber, '(변경 없음)');
      return;
    }
    
    console.log('🎯 포커스 → 페이지 변경', currentPage, '→', slideNumber);
    setCurrentPage(slideNumber);
  };

  const handleSave = () => {
    console.log('💾 저장 요청');
    onSave?.();
  };

  // 에러 상태 렌더링
  if (error) {
    return (
      <ScriptModalOverlay isOpen={isOpen} onClose={onClose}>
        <ScriptModalContainer>
          <ErrorModal
            title="PDF 파일 오류"
            message={error}
            onClose={onClose}
          />
        </ScriptModalContainer>
      </ScriptModalOverlay>
    );
  }

  // 로딩 상태 렌더링
  if (isLoadingPageCount) {
    return (
      <ScriptModalOverlay isOpen={isOpen} onClose={onClose}>
        <ScriptModalContainer>
          <div style={loadingContainerStyle}>
            <div style={loadingSpinnerStyle}></div>
            <div style={loadingTextStyle}>PDF 파일을 분석하는 중...</div>
          </div>
        </ScriptModalContainer>
      </ScriptModalOverlay>
    );
  }

  return (
    <ScriptModalOverlay isOpen={isOpen} onClose={onClose}>
      <ScriptModalContainer>
        <ScriptModalContent>
          <ScriptModalPreview
            title={title}
            description={description}
            pdfFile={pdfFile}
            currentPage={currentPage}
            totalPages={slideInputs.length}
            renderPreviewContent={renderPreviewContent}
          />
          <ScriptModalDivider />
          <ScriptModalForm
            slides={slideInputs}
            onSlideChange={handleSlideChange}
            onFocus={handleFocus}
          />
        </ScriptModalContent>
        <ScriptModalFooter
          onClose={onClose}
          onSave={handleSave}
        />
      </ScriptModalContainer>
    </ScriptModalOverlay>
  );
};



const loadingContainerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '40px',
  gap: '20px',
  minHeight: '300px',
};

const loadingSpinnerStyle: React.CSSProperties = {
  width: '40px',
  height: '40px',
  border: '4px solid #f0f0f0',
  borderTop: '4px solid #3282ff',
  borderRadius: '50%',
  animation: 'spin 1s linear infinite',
};

const loadingTextStyle: React.CSSProperties = {
  fontSize: '16px',
  color: '#666',
  fontFamily: 'Pretendard',
};

// 호환성을 위한 타입 export
export type { SlideInput }; 