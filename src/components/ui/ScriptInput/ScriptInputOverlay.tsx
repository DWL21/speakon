import React from 'react';

interface ScriptInputOverlayProps {
  children: React.ReactNode;
  onClose?: () => void;
}

export const ScriptInputOverlay: React.FC<ScriptInputOverlayProps> = ({
  children,
  onClose
}) => {
  return (
    <div style={overlayStyle} onClick={onClose}>
      <div onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

const overlayStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
}; 