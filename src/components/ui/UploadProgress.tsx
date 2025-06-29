import React from 'react';

interface UploadProgressProps {
  progress: number;
  fileName?: string;
  style?: React.CSSProperties;
}

export const UploadProgress: React.FC<UploadProgressProps> = ({ 
  progress, 
  fileName, 
  style = {} 
}) => {
  const displayProgress = Math.ceil(progress / 100);
  
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      marginTop: '10px',
      ...style
    }}>
      {/* Progress Bar Container */}
      <div style={{
        position: 'relative',
        width: '200px',
        height: '5px'
      }}>
        {/* Background */}
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          background: '#AEAFB0',
          borderRadius: '22px'
        }} />
        {/* Fill */}
        <div style={{
          position: 'absolute',
          width: `${progress}%`,
          height: '100%',
          background: '#0A64FF',
          borderRadius: '22px',
          transition: 'width 0.2s ease-in-out'
        }} />
      </div>
      
      {/* Progress Text */}
      <div style={{
        fontFamily: 'Pretendard',
        fontWeight: 400,
        fontSize: '13px',
        lineHeight: '16px',
        color: '#AEAFB0',
        minWidth: '70px'
      }}>
        {fileName ? `${displayProgress}MB/1MB` : '0MB/1MB'}
      </div>
    </div>
  );
}; 