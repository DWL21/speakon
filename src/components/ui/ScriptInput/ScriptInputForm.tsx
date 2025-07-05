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
}

export const ScriptInputForm: React.FC<ScriptInputFormProps> = ({
  currentPage,
  slides,
  onSlideChange
}) => {
  return (
    <div style={inputSectionStyle}>
      <div style={inputWrapperStyle}>
        {Array.from({ length: 5 }, (_, index) => {
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
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'flex-start',
  padding: '0px',
  width: '597px',
  minWidth: '597px',
  maxWidth: '597px',
  height: '100%',
  flex: 'none',
  order: 2,
  flexGrow: 1,
};

const inputWrapperStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  padding: '0px',
  gap: '0px',
  width: '597px',
  minWidth: '597px',
  maxWidth: '597px',
  height: '100%',
  flex: 'none',
  order: 0,
  flexGrow: 1,
  overflowY: 'auto',
};

const slideItemStyle: React.CSSProperties = {
  marginTop: '20px',
  marginBottom: '25px',
}; 