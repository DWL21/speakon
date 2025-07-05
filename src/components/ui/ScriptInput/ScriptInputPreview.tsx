import React from 'react';
import { PagePreview } from '../PagePreview';

interface ScriptInputPreviewProps {
  totalPages: number;
  currentPage: number;
  renderPageContent?: (pageNumber: number) => React.ReactNode;
  onPageChange?: (pageNumber: number) => void;
  title?: string;
  description?: string;
}

export const ScriptInputPreview: React.FC<ScriptInputPreviewProps> = ({
  totalPages,
  currentPage,
  renderPageContent,
  onPageChange,
  title,
  description
}) => {
  return (
    <div style={previewSectionStyle}>
      <PagePreview
        totalPages={totalPages}
        currentPage={currentPage}
        renderPageContent={renderPageContent}
        onPageChange={onPageChange}
        title={title}
        description={description}
      />
    </div>
  );
};

const previewSectionStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '0px',
  gap: '10px',
  width: '350px',
  maxWidth: '350px',
  height: '503px',
  flex: 'none',
  order: 0,
  flexGrow: 1,
}; 