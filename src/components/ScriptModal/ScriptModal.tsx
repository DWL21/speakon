import React, { useState } from 'react';
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

  const handleSave = () => {
    onSave?.();
  };

  return (
    <ScriptModalOverlay isOpen={isOpen} onClose={onClose}>
      <ScriptModalContainer>
        <ScriptModalContent>
          <ScriptModalPreview
            title={title}
            description={description}
            renderPreviewContent={renderPreviewContent}
          />
          <ScriptModalDivider />
          <ScriptModalForm
            slideCount={slideCount}
            slides={slideInputs}
            onSlideChange={handleSlideChange}
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