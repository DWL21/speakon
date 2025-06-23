import React, { useCallback, useState } from 'react'
import { Progress } from './ui/Progress'
import { colors } from '../theme/colors'
import { typography } from '../theme/typography'

interface FileUploadProps {
  onFileUpload: (file: File) => void
  isUploading: boolean
  uploadProgress: number
  uploadedFileName?: string
  maxSizeMB?: number
  maxPages?: number
  accept?: string
}

const FileIcon: React.FC = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <path
      d="M6 30V6C6 4.35 7.35 3 9 3H21L30 12V30C30 31.65 28.65 33 27 33H9C7.35 33 6 31.65 6 30Z"
      fill={colors.neutral.gray900}
    />
    <path
      d="M21 3V12H30"
      fill="none"
      stroke={colors.neutral.gray50}
      strokeWidth="2"
    />
    <path
      d="M15 19.5H21M15 24H21"
      stroke={colors.neutral.gray50}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
)

const PlusIcon: React.FC = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 6V18M6 12H18"
      stroke={colors.primary.normal}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
)

export const FileUpload: React.FC<FileUploadProps> = ({
  onFileUpload,
  isUploading,
  uploadProgress,
  uploadedFileName,
  maxSizeMB = 50,
  maxPages = 100,
  accept = '.pdf',
}) => {
  const [isDragOver, setIsDragOver] = useState(false)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      onFileUpload(files[0])
    }
  }, [onFileUpload])

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      onFileUpload(files[0])
    }
  }, [onFileUpload])

  const getUploadAreaStyles = (): React.CSSProperties => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '28px',
    width: '100%',
    minHeight: '400px',
    backgroundColor: isDragOver ? colors.neutral.gray100 : colors.neutral.gray50,
    borderRadius: '30px',
    border: isDragOver ? `2px dashed ${colors.primary.normal}` : 'none',
    transition: 'all 0.2s ease',
    cursor: 'pointer',
    position: 'relative',
    padding: '20px',
  })

  return (
    <div
      className="upload-area"
      style={getUploadAreaStyles()}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => !isUploading && document.getElementById('file-input')?.click()}
    >
      <input
        id="file-input"
        type="file"
        accept={accept}
        onChange={handleFileChange}
        style={{ display: 'none' }}
        disabled={isUploading}
      />

      {!isUploading && !uploadedFileName && (
        <>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FileIcon />
            <div style={{ position: 'absolute', bottom: '-6px', right: '-6px' }}>
              <PlusIcon />
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px', textAlign: 'center' }}>
            <p
              style={{
                ...typography.body[1],
                color: colors.neutral.gray900,
                margin: 0,
              }}
            >
              PDF 파일을 업로드 해주세요.
            </p>
            <p
              style={{
                ...typography.label,
                color: colors.neutral.gray500,
                margin: 0,
              }}
            >
              최대 {maxPages}페이지 이하 / {maxSizeMB}MB 이하
            </p>
          </div>
        </>
      )}

      {(isUploading || uploadedFileName) && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px',
          width: '100%',
          maxWidth: '300px'
        }}>
          <FileIcon />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px', width: '100%' }}>
            <p
              style={{
                ...typography.body[1],
                color: colors.neutral.gray900,
                textAlign: 'center',
                margin: 0,
                width: '100%',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {uploadedFileName || '[파일명]'}
            </p>
            <p
              style={{
                ...typography.body[1],
                color: colors.neutral.gray900,
                textAlign: 'center',
                margin: 0,
              }}
            >
              {isUploading ? '파일을 업로드 중입니다' : '업로드 완료'}
            </p>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px', width: '100%' }}>
            <Progress value={uploadProgress} />
            <span
              style={{
                ...typography.label,
                color: colors.neutral.gray500,
                minWidth: '40px',
                textAlign: 'right',
                fontSize: '12px',
              }}
            >
              {Math.round((uploadProgress / 100) * maxSizeMB)}MB
            </span>
          </div>
        </div>
      )}
    </div>
  )
} 