import React from 'react';
import { PagePreview } from '../PagePreview';
import { colors } from '../../../theme/colors';

export interface ScriptInputPreviewProps {
  totalPages: number;
  currentPage: number;
  onPageChange?: (pageNumber: number) => void;
  title?: string;
  description?: string;
}

export const ScriptInputPreview: React.FC<ScriptInputPreviewProps> = ({
  totalPages,
  currentPage,
  onPageChange,
  title,
  description,
}) => {
  return (
    <div style={{
      padding: '24px',
      backgroundColor: colors.background.normal,
      borderRadius: '12px',
      border: `1px solid ${colors.line.normal}`,
    }}>
      <PagePreview
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={onPageChange}
        title={title}
        description={description}
      />
    </div>
  );
}; 