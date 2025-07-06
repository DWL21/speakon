import React from 'react';
import { ScriptModalItem } from './ScriptModalItem';

export interface SlideInput {
  slideNumber: number;
  pageNumber: number;
  content: string;
}

interface ScriptModalFormProps {
  slides: SlideInput[];
  onSlideChange: (slideNumber: number, content: string) => void;
  onFocus?: (slideNumber: number) => void;
}

export const ScriptModalForm: React.FC<ScriptModalFormProps> = ({
  slides,
  onSlideChange,
  onFocus
}) => {
  return (
    <div style={formSectionStyle}>
      <div style={inputListStyle}>
        {slides.map((slide) => (
          <ScriptModalItem
            key={slide.slideNumber}
            slideNumber={slide.slideNumber}
            value={slide.content}
            onChange={(content: string) => onSlideChange(slide.slideNumber, content)}
            onFocus={onFocus}
          />
        ))}
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