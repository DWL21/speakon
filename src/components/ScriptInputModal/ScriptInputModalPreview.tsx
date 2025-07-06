import React from 'react';
import { ScriptInputModalHeader } from './ScriptInputModalHeader';

interface ScriptInputModalPreviewProps {
  title: string;
  description: string;
  renderPreviewContent?: () => React.ReactNode;
}

export const ScriptInputModalPreview: React.FC<ScriptInputModalPreviewProps> = ({
  title,
  description,
  renderPreviewContent
}) => {
  return (
    <div style={previewSectionStyle}>
      <ScriptInputModalHeader title={title} description={description} />
      <div style={previewContentStyle}>
        {renderPreviewContent ? renderPreviewContent() : (
          <div style={previewPlaceholderStyle}>
            <div style={previewImageStyle} />
          </div>
        )}
      </div>
    </div>
  );
};

const previewSectionStyle: React.CSSProperties = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  maxWidth: '350px',
  gap: '20px',
};

const previewContentStyle: React.CSSProperties = {
  backgroundColor: '#f1f2f5',
  height: '459px',
  width: '100%',
  maxWidth: '340px',
  borderRadius: '12px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '10px',
};

const previewPlaceholderStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const previewImageStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
  backgroundColor: '#eeeeee',
  borderRadius: '8px',
}; 