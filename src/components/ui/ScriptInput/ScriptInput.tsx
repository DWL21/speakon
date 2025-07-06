import React from 'react';
import { ScriptInputForm } from './ScriptInputForm';
import { ScriptInputPreview } from './ScriptInputPreview';

export interface SlideInput {
  slideNumber: number;
  content: string;
}

export interface ScriptInputProps {
  currentPage: number;
  slides: SlideInput[];
  onSlideChange: (pageNumber: number, slideNumber: number, content: string) => void;
  slideCount: number;
}

export const ScriptInput: React.FC<ScriptInputProps> = ({
  currentPage,
  slideCount,
}) => {
  const handleFormSubmit = (formData: any) => {
    console.log('Form submitted:', formData);
  };

  return (
    <div style={{
      display: 'flex',
      gap: '24px',
      width: '100%',
      height: '600px',
    }}>
      {/* 왼쪽: 입력 폼 */}
      <div style={{ flex: 1 }}>
        <ScriptInputForm onSubmit={handleFormSubmit} />
      </div>
      
      {/* 오른쪽: 미리보기 */}
      <div style={{ flex: 1 }}>
        <ScriptInputPreview
          totalPages={slideCount}
          currentPage={currentPage}
          title="미리보기"
          description="입력한 내용의 미리보기입니다"
        />
      </div>
    </div>
  );
}; 