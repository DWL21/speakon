import React, { useCallback, useMemo, useRef, useImperativeHandle, forwardRef } from 'react';
import { MemoizedScriptModalItem, ScriptModalItemRef } from './ScriptModalItem';

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

export interface ScriptModalFormRef {
  getAllCurrentValues: () => SlideInput[];
}

const ScriptModalForm = forwardRef<ScriptModalFormRef, ScriptModalFormProps>(({
  slides,
  onSlideChange,
  onFocus
}, ref) => {
  const itemRefs = useRef<Record<number, ScriptModalItemRef | null>>({});

  const handleFocus = useCallback((slideNumber: number) => {
    onFocus?.(slideNumber);
  }, [onFocus]);

  // 각 슬라이드에 대한 개별 콜백들을 메모이제이션 (현재는 사용하지 않음)
  const slideCallbacks = useMemo(() => {
    return slides.reduce((acc, slide) => {
      acc[slide.slideNumber] = (content: string) => {
        // 실시간 업데이트 제거 - 아무것도 하지 않음
      };
      return acc;
    }, {} as Record<number, (content: string) => void>);
  }, [slides]);

  // 외부에서 모든 현재 값들을 가져올 수 있도록 imperative handle 제공
  useImperativeHandle(ref, () => ({
    getAllCurrentValues: () => {
      return slides.map(slide => {
        const itemRef = itemRefs.current[slide.slideNumber];
        const currentValue = itemRef?.getCurrentValue() || slide.content;
        return {
          ...slide,
          content: currentValue
        };
      });
    }
  }), [slides]);

  return (
    <div style={formSectionStyle}>
      <div style={inputListStyle}>
        {slides.map((slide) => (
          <MemoizedScriptModalItem
            key={slide.slideNumber}
            ref={(ref) => {
              itemRefs.current[slide.slideNumber] = ref;
            }}
            slideNumber={slide.slideNumber}
            value={slide.content}
            onChange={slideCallbacks[slide.slideNumber]}
            onFocus={handleFocus}
          />
        ))}
      </div>
    </div>
  );
});

ScriptModalForm.displayName = 'ScriptModalForm';

// 메모이제이션된 컴포넌트로 export
export const MemoizedScriptModalForm = React.memo(ScriptModalForm);

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
}; 