import React from 'react';

interface TextSectionProps {
  title: string;
  subtitle: string;
}

export const TextSection: React.FC<TextSectionProps> = ({ title, subtitle }) => {
  return (
    <div className="text-section">
      <div className="text-content">
        <div className="title-text">{title}</div>
        <div className="subtitle-text">{subtitle}</div>
      </div>
    </div>
  );
}; 