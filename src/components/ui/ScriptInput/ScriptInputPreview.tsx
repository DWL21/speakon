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
  flex: 1,
  minWidth: 0,
  justifyContent: 'center',
  alignItems: 'center',
}; 