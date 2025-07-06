import React from 'react';
import { Button } from '../Button';

interface ScriptInputFooterProps {
  onSave?: () => void;
  onClose?: () => void;
}

export const ScriptInputFooter: React.FC<ScriptInputFooterProps> = ({
  onSave,
  onClose
}) => {
  return (
    <div style={bottomSectionStyle}>
      <div style={horizontalDividerStyle} />
      <div style={buttonSectionStyle}>
        <Button
          variant="outline"
          size="small"
          onClick={onClose}
        >
          닫기
        </Button>
        <Button
          variant="primary"
          size="small"
          onClick={onSave}
        >
          저장
        </Button>
      </div>
    </div>
  );
};

const bottomSectionStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  flex: 'none',
};

const horizontalDividerStyle: React.CSSProperties = {
  width: '100%',
  height: '1px',
  background: '#EEEEEE',
  border: 'none',
};

const buttonSectionStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-end',
  alignItems: 'center',
  padding: '16px 24px',
  gap: '12px',
}; 