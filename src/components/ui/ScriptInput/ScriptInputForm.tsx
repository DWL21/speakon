import React from 'react';
import { colors } from '../../../theme/colors';
import { typography } from '../../../theme/typography';

export interface ScriptInputFormProps {
  onSubmit: (formData: FormData) => void;
  onCancel?: () => void;
}

export interface FormData {
  title1: string;
  title2: string;
  title3: string;
  subtitle: string;
  overallScript: string;
  pageScript: string;
  overview: string;
  point: string;
}

export const ScriptInputForm: React.FC<ScriptInputFormProps> = ({
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = React.useState<FormData>({
    title1: '',
    title2: '',
    title3: '',
    subtitle: '',
    overallScript: '',
    pageScript: '',
    overview: '',
    point: '',
  });

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 16px',
    border: `1px solid ${colors.line.normal}`,
    borderRadius: '8px',
    fontSize: '14px',
    fontFamily: 'Pretendard, sans-serif',
    backgroundColor: colors.background.normal,
    color: colors.label.normal,
    outline: 'none',
    transition: 'border-color 0.2s ease',
  };

  const textareaStyle: React.CSSProperties = {
    ...inputStyle,
    minHeight: '80px',
    resize: 'vertical' as const,
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '24px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{
          ...typography.title[2],
          color: colors.label.normal,
          marginBottom: '20px',
        }}>
          스크립트 입력
        </h2>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* 제목 필드들 */}
        <div>
          <label style={{
            ...typography.label,
            color: colors.label.normal,
            display: 'block',
            marginBottom: '8px',
          }}>
            제목 1
          </label>
          <input
            type="text"
            value={formData.title1}
            onChange={(e) => handleInputChange('title1', e.target.value)}
            style={inputStyle}
            placeholder="첫 번째 제목을 입력하세요"
          />
        </div>

        <div>
          <label style={{
            ...typography.label,
            color: colors.label.normal,
            display: 'block',
            marginBottom: '8px',
          }}>
            제목 2
          </label>
          <input
            type="text"
            value={formData.title2}
            onChange={(e) => handleInputChange('title2', e.target.value)}
            style={inputStyle}
            placeholder="두 번째 제목을 입력하세요"
          />
        </div>

        <div>
          <label style={{
            ...typography.label,
            color: colors.label.normal,
            display: 'block',
            marginBottom: '8px',
          }}>
            제목 3
          </label>
          <input
            type="text"
            value={formData.title3}
            onChange={(e) => handleInputChange('title3', e.target.value)}
            style={inputStyle}
            placeholder="세 번째 제목을 입력하세요"
          />
        </div>

        <div>
          <label style={{
            ...typography.label,
            color: colors.label.normal,
            display: 'block',
            marginBottom: '8px',
          }}>
            부제목
          </label>
          <input
            type="text"
            value={formData.subtitle}
            onChange={(e) => handleInputChange('subtitle', e.target.value)}
            style={inputStyle}
            placeholder="부제목을 입력하세요"
          />
        </div>

        {/* 스크립트 필드들 */}
        <div>
          <label style={{
            ...typography.label,
            color: colors.label.normal,
            display: 'block',
            marginBottom: '8px',
          }}>
            전체 스크립트
          </label>
          <textarea
            value={formData.overallScript}
            onChange={(e) => handleInputChange('overallScript', e.target.value)}
            style={textareaStyle}
            placeholder="전체 스크립트를 입력하세요"
          />
        </div>

        <div>
          <label style={{
            ...typography.label,
            color: colors.label.normal,
            display: 'block',
            marginBottom: '8px',
          }}>
            페이지 스크립트
          </label>
          <textarea
            value={formData.pageScript}
            onChange={(e) => handleInputChange('pageScript', e.target.value)}
            style={textareaStyle}
            placeholder="페이지별 스크립트를 입력하세요"
          />
        </div>

        <div>
          <label style={{
            ...typography.label,
            color: colors.label.normal,
            display: 'block',
            marginBottom: '8px',
          }}>
            개요
          </label>
          <textarea
            value={formData.overview}
            onChange={(e) => handleInputChange('overview', e.target.value)}
            style={textareaStyle}
            placeholder="발표 개요를 입력하세요"
          />
        </div>

        <div>
          <label style={{
            ...typography.label,
            color: colors.label.normal,
            display: 'block',
            marginBottom: '8px',
          }}>
            핵심 포인트
          </label>
          <textarea
            value={formData.point}
            onChange={(e) => handleInputChange('point', e.target.value)}
            style={textareaStyle}
            placeholder="핵심 포인트를 입력하세요"
          />
        </div>
      </div>

      {/* 버튼들 */}
      <div style={{
        display: 'flex',
        gap: '12px',
        justifyContent: 'flex-end',
        marginTop: '32px',
      }}>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            style={{
              padding: '12px 24px',
              border: `1px solid ${colors.line.normal}`,
              borderRadius: '8px',
              backgroundColor: colors.background.normal,
              color: colors.label.normal,
              fontSize: '14px',
              fontWeight: 500,
              fontFamily: 'Pretendard, sans-serif',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            취소
          </button>
        )}
        <button
          type="submit"
          style={{
            padding: '12px 24px',
            border: 'none',
            borderRadius: '8px',
            backgroundColor: colors.primary.normal,
            color: colors.static.white,
            fontSize: '14px',
            fontWeight: 500,
            fontFamily: 'Pretendard, sans-serif',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
        >
          저장
        </button>
      </div>
    </form>
  );
}; 