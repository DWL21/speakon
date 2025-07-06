import React, { useState, useEffect } from 'react';
import { ScriptModalOverlay } from './ScriptModalOverlay';
import { ScriptModalContainer } from './ScriptModalContainer';
import { ScriptModalContent } from './ScriptModalContent';
import { ScriptModalPreview } from './ScriptModalPreview';
import { ScriptModalDivider } from './ScriptModalDivider';
import { ScriptModalForm } from './ScriptModalForm';
import { ScriptModalFooter } from './ScriptModalFooter';
import { SlideInput } from './ScriptModalForm';

export interface ScriptModalProps {
  /** 모달 열림 상태 */
  isOpen: boolean;
  /** 모달 닫기 콜백 */
  onClose: () => void;
  /** PDF 파일 */
  pdfFile?: File | null;
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

export const ScriptModal: React.FC<ScriptModalProps> = ({
  isOpen,
  onClose,
  pdfFile = null,
  title = "발표 대본",
  description = "설명을 입력하세요",
  slideCount = 5,
  slides,
  onSlideChange,
  onSave,
  renderPreviewContent,
}) => {
  const [slideInputs, setSlideInputs] = useState<SlideInput[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // 초기 슬라이드 설정 (props의 slides 사용)
  useEffect(() => {
    if (slides.length > 0) {
      setSlideInputs(slides);
    } else {
      // props에서 slides가 없으면 기본 slideCount만큼 생성
      const defaultSlides: SlideInput[] = Array.from({ length: slideCount }, (_, index) => ({
        slideNumber: index + 1,
        pageNumber: index + 1,
        content: ''
      }));
      setSlideInputs(defaultSlides);
    }
  }, [slides, slideCount]);

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

  const handleFocus = (slideNumber: number) => {
    console.log('🎯 포커스 → 페이지', slideNumber);
    setCurrentPage(slideNumber);
  };

  const handleSave = () => {
    console.log('💾 저장 요청');
    onSave?.();
  };

  // 실제 슬라이드 수 사용
  const actualSlideCount = slideInputs.length;

  return (
    <ScriptModalOverlay isOpen={isOpen} onClose={onClose}>
      <ScriptModalContainer>
        <ScriptModalContent>
          <ScriptModalPreview
            title={title}
            description={description}
            pdfFile={pdfFile}
            currentPage={currentPage}
            totalPages={actualSlideCount}
            renderPreviewContent={renderPreviewContent}
          />
          <ScriptModalDivider />
          <ScriptModalForm
            slideCount={actualSlideCount}
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

// 호환성을 위한 타입 export
export type { SlideInput }; 