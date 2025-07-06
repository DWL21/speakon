import React from 'react';
import { Button } from '../ui/Button';

interface ScriptInputModalFooterProps {
  onClose: () => void;
  onSave: () => void;
}

export const ScriptInputModalFooter: React.FC<ScriptInputModalFooterProps> = ({
  onClose,
  onSave
}) => {
  return (
    <div style={footerStyle}>
      <div style={buttonContainerStyle}>
        <Button
          variant="secondary"
          size="medium"
          onClick={onClose}
        >
          닫기
        </Button>
        <Button
          variant="primary"
          size="medium"
          onClick={onSave}
        >
          저장
        </Button>
      </div>
    </div>
  );
};

const footerStyle: React.CSSProperties = {
  borderTop: '1px solid #eeeeee',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  width: '100%',
};

const buttonContainerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: '20px 52px',
  gap: '10px',
};

 