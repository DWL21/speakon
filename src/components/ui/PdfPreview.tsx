import React from 'react';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';

interface PdfPreviewProps {
  /** 현재 페이지 이미지 URL */
  currentPageImageUrl: string | null;
  /** 현재 페이지 번호 */
  currentPage: number;
  /** 전체 페이지 수 */
  totalPages: number;
  /** 로딩 상태 */
  isLoading?: boolean;
  /** 에러 메시지 */
  error?: string | null;
}

export const PdfPreview: React.FC<PdfPreviewProps> = ({
  currentPageImageUrl,
  currentPage,
  totalPages,
  isLoading = false,
  error = null,
}) => {
  const renderContent = () => {
    if (error) {
      return (
        <div style={errorStyle}>
          <div style={errorIconStyle}>⚠️</div>
          <div style={errorTextStyle}>{error}</div>
        </div>
      );
    }

    if (isLoading) {
      return (
        <div style={loadingStyle}>
          <div style={loadingSpinnerStyle}></div>
          <div style={loadingTextStyle}>PDF 로딩 중...</div>
        </div>
      );
    }

    if (!currentPageImageUrl) {
      return (
        <div style={placeholderStyle}>
          <div style={placeholderIconStyle}>📄</div>
          <div style={placeholderTextStyle}>
            페이지 {currentPage} 로딩 중
          </div>
        </div>
      );
    }

    return (
      <div style={imageContainerStyle}>
        <img
          src={currentPageImageUrl}
          alt={`PDF Page ${currentPage}`}
          style={imageStyle}
          onLoad={() => console.log(`Page ${currentPage} loaded`)}
          onError={() => console.error(`Error loading page ${currentPage}`)}
        />
        <div style={pageInfoStyle}>
          {currentPage} / {totalPages}
        </div>
      </div>
    );
  };

  return (
    <div style={containerStyle}>
      {renderContent()}
    </div>
  );
};

const containerStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: colors.background.normal,
  borderRadius: '8px',
  overflow: 'hidden',
  position: 'relative',
};

const imageContainerStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
};

const imageStyle: React.CSSProperties = {
  maxWidth: '100%',
  maxHeight: '100%',
  objectFit: 'contain',
  borderRadius: '4px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
};

const pageInfoStyle: React.CSSProperties = {
  position: 'absolute',
  bottom: '8px',
  right: '8px',
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  color: colors.static.white,
  padding: '4px 8px',
  borderRadius: '4px',
  fontSize: '12px',
  fontWeight: 500,
};

const loadingStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '12px',
};

const loadingSpinnerStyle: React.CSSProperties = {
  width: '32px',
  height: '32px',
  border: `3px solid ${colors.line.normal}`,
  borderTop: `3px solid ${colors.primary.normal}`,
  borderRadius: '50%',
  animation: 'spin 1s linear infinite',
};

const loadingTextStyle: React.CSSProperties = {
  ...typography.body.normal,
  color: colors.label.alternative,
};

const errorStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '8px',
  padding: '20px',
  textAlign: 'center',
};

const errorIconStyle: React.CSSProperties = {
  fontSize: '32px',
};

const errorTextStyle: React.CSSProperties = {
  ...typography.body.normal,
  color: colors.semantic.warning,
};

const placeholderStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '8px',
};

const placeholderIconStyle: React.CSSProperties = {
  fontSize: '48px',
  opacity: 0.5,
};

const placeholderTextStyle: React.CSSProperties = {
  ...typography.body.normal,
  color: colors.label.alternative,
}; 