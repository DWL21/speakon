import React, { useState } from 'react';
import { ScriptInputOverlay } from './ScriptInputOverlay';
import { ScriptInputContainer } from './ScriptInputContainer';
import { ScriptInputContent } from './ScriptInputContent';
import { ScriptInputPreview } from './ScriptInputPreview';
import { ScriptInputDivider } from './ScriptInputDivider';
import { ScriptInputForm } from './ScriptInputForm';
import { ScriptInputFooter } from './ScriptInputFooter';

export interface SlideInput {
  slideNumber: number;
  pageNumber: number;
  content: string;
}

export interface ScriptInputProps {
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

export const ScriptInput: React.FC<ScriptInputProps> = ({
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
    <ScriptInputOverlay onClose={onClose}>
      <ScriptInputContainer>
        <ScriptInputContent>
          <ScriptInputPreview
            totalPages={totalPages}
            currentPage={currentPage}
            renderPageContent={renderPageContent}
            onPageChange={onPageChange}
            title={title}
            description={description}
          />
          <ScriptInputDivider />
          <ScriptInputForm
            currentPage={currentPage}
            slides={slideInputs}
            onSlideChange={handleSlideChange}
          />
        </ScriptInputContent>
        <ScriptInputFooter onSave={handleSave} />
      </ScriptInputContainer>
    </ScriptInputOverlay>
  );
}; 