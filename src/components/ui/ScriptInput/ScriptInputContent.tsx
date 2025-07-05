import React from 'react';

interface ScriptInputContentProps {
  children: React.ReactNode;
}

export const ScriptInputContent: React.FC<ScriptInputContentProps> = ({
  children
}) => {
  return (
    <div style={mainContentStyle}>
      <div style={contentWrapperStyle}>
        <div style={contentRowStyle}>
          {children}
        </div>
      </div>
    </div>
  );
};

const mainContentStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '20px 20px',
  width: '1050px',
  height: '578px',
  flex: 'none',
  order: 0,
  alignSelf: 'stretch',
  flexGrow: 1,
};

const contentWrapperStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '9px 0px',
  gap: '10px',
  width: '1010px',
  height: '100%',
  flex: 'none',
  order: 0,
  alignSelf: 'stretch',
  flexGrow: 1,
};

const contentRowStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '0px',
  gap: '10px',
  width: '1010px',
  height: '100%',
  flex: 'none',
  order: 0,
  flexGrow: 1,
}; 