import React from 'react';

interface ScriptInputFooterProps {
  onSave?: () => void;
}

export const ScriptInputFooter: React.FC<ScriptInputFooterProps> = ({
  onSave
}) => {
  return (
    <div style={bottomSectionStyle}>
      <div style={horizontalDividerStyle} />
      <div style={buttonSectionStyle}>
        <button
          onClick={onSave}
          style={saveButtonStyle}
        >
          저장
        </button>
      </div>
    </div>
  );
};

const bottomSectionStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  padding: '0px',
  gap: '4px',
  width: '1050px',
  height: '72px',
  flex: 'none',
  order: 1,
  alignSelf: 'stretch',
  flexGrow: 0,
};

const horizontalDividerStyle: React.CSSProperties = {
  width: '1050px',
  height: '0px',
  border: '1px solid #EEEEEE',
  transform: 'rotate(-0.11deg)',
  flex: 'none',
  order: 0,
  alignSelf: 'stretch',
  flexGrow: 0,
};

const buttonSectionStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-end',
  alignItems: 'center',
  padding: '16px 52px',
  gap: '24px',
  width: '1050px',
  height: '68px',
  flex: 'none',
  order: 2,
  alignSelf: 'stretch',
  flexGrow: 0,
};

const saveButtonStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '10px 20px',
  gap: '20px',
  width: '110px',
  height: '36px',
  background: '#3282FF',
  borderRadius: '8px',
  border: 'none',
  cursor: 'pointer',
  fontFamily: 'Pretendard',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '13px',
  lineHeight: '16px',
  color: '#FFFFFF',
  flex: 'none',
  order: 0,
  flexGrow: 0,
}; 