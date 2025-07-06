import React from 'react';
import { ScriptInputModalItem } from './ScriptInputModalItem';

export interface SlideInput {
  slideNumber: number;
  pageNumber: number;
  content: string;
}

interface ScriptInputModalFormProps {
  slideCount: number;
  slides: SlideInput[];
  onSlideChange: (slideNumber: number, content: string) => void;
}

export const ScriptInputModalForm: React.FC<ScriptInputModalFormProps> = ({
  slideCount,
  slides,
  onSlideChange
}) => {
  return (
    <div style={formSectionStyle}>
      <div style={inputListStyle}>
        {Array.from({ length: slideCount }, (_, index) => {
          const slideNumber = index + 1;
          const currentSlide = slides.find(s => s.slideNumber === slideNumber) || { 
            slideNumber, 
            pageNumber: 1, 
            content: '' 
          };
          
          return (
            <ScriptInputModalItem
              key={slideNumber}
              slideNumber={slideNumber}
              value={currentSlide.content}
              onChange={(content) => onSlideChange(slideNumber, content)}
            />
          );
        })}
      </div>
      <div style={scrollbarStyle} />
    </div>
  );
};

const formSectionStyle: React.CSSProperties = {
  flex: 1,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
  justifyContent: 'center',
  height: '100%',
};

const inputListStyle: React.CSSProperties = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  overflowY: 'auto',
  maxHeight: '598px',
  paddingRight: '10px',
};

const scrollbarStyle: React.CSSProperties = {
  width: '6.539px',
  height: '142px',
  backgroundColor: '#d9d9d9',
  borderRadius: '3px',
  marginLeft: '8px',
  marginTop: '44px',
}; 