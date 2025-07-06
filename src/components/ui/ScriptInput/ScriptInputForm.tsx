import React from 'react';
import { ModalInputBox } from '../ModalInputBox';

interface SlideInput {
  slideNumber: number;
  pageNumber: number;
  content: string;
}

interface ScriptInputFormProps {
  currentPage: number;
  slides: SlideInput[];
  onSlideChange: (pageNumber: number, slideNumber: number, content: string) => void;
  slideCount?: number;
}

export const ScriptInputForm: React.FC<ScriptInputFormProps> = ({
  currentPage,
  slides,
  onSlideChange,
  slideCount = 5
}) => {
  return (
    <div style={inputSectionStyle}>
      <div style={inputWrapperStyle}>
        {Array.from({ length: slideCount }, (_, index) => {
          const slideKey = `${currentPage}-${index}`;
          const slideNumber = index + 1;
          const currentSlide = slides.find(s => s.pageNumber === currentPage && s.slideNumber === slideNumber) || { 
            slideNumber: slideNumber, 
            pageNumber: currentPage, 
            content: '' 
          };
          
          return (
            <div key={slideKey} style={slideItemStyle}>
              <ModalInputBox
                slideNumber={slideNumber}
                onScriptChange={(slideNum, script) => onSlideChange(currentPage, slideNum, script)}
                initialScript={currentSlide.content}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

const inputSectionStyle: React.CSSProperties = {
  display: 'flex',
  flex: 1,
  minWidth: 0,
  justifyContent: 'center',
  alignItems: 'flex-start',
};

const inputWrapperStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  maxWidth: '597px',
  height: '100%',
  gap: '20px',
  padding: '0px',
  overflowY: 'auto',
};

const slideItemStyle: React.CSSProperties = {
  flex: 'none',
}; 