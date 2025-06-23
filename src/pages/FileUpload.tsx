import React, { useState, useEffect } from 'react'
import { Layout } from '../components/Layout'
import { FileUpload } from '../components/FileUpload'
import { Dialog } from '../components/ui/Dialog'
import { useFileUpload } from '../hooks/useFileUpload'
import { colors } from '../theme/colors'
import { typography } from '../theme/typography'
import { spacing } from '../theme/spacing'

export const FileUploadPage: React.FC = () => {
  const {
    isUploading,
    uploadProgress,
    uploadedFile,
    error,
    uploadFile,
    resetUpload,
  } = useFileUpload()
  
  const [showErrorDialog, setShowErrorDialog] = useState(false)

  useEffect(() => {
    if (error) {
      setShowErrorDialog(true)
    }
  }, [error])

  const handleFileUpload = async (file: File) => {
    await uploadFile(file)
  }

  const handleErrorDialogClose = () => {
    setShowErrorDialog(false)
    resetUpload()
  }

  const containerStyles: React.CSSProperties = {
    maxWidth: '1080px',
    margin: '0 auto',
    padding: `${spacing.xl} ${spacing.md}`,
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.xl,
  }

  const headerSectionStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: spacing.xs,
    textAlign: 'center',
  }

  const uploadSectionStyles: React.CSSProperties = {
    width: '100%',
    minHeight: '400px',
  }

  return (
    <Layout>
      <div style={containerStyles}>
        <div style={headerSectionStyles}>
          <h1
            className="mobile-title"
            style={{
              ...typography.title[1],
              color: colors.neutral.gray900,
              margin: 0,
              fontSize: '22px',
              lineHeight: '26px',
              letterSpacing: '-0.02em',
            }}
          >
            발표 연습, 이젠 SpeakON에서 끝내세요!
          </h1>
          <p
            className="mobile-subtitle"
            style={{
              ...typography.body[1],
              color: colors.primary.normal,
              margin: 0,
            }}
          >
            파일 업로드하고 발표 연습을 시작해보세요.
          </p>
        </div>

        <div style={uploadSectionStyles}>
          <FileUpload
            onFileUpload={handleFileUpload}
            isUploading={isUploading}
            uploadProgress={uploadProgress}
            uploadedFileName={uploadedFile?.name}
          />
        </div>
      </div>

      <Dialog
        open={showErrorDialog}
        onOpenChange={setShowErrorDialog}
        title="업로드 오류"
        description={error || ''}
        onConfirm={handleErrorDialogClose}
        confirmText="다시 시도"
      />
    </Layout>
  )
} 