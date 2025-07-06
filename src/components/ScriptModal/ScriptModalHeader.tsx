import React from 'react';
import { Typography } from '../ui/Typography';

interface ScriptModalHeaderProps {
  title: string;
  description: string;
}

export const ScriptModalHeader: React.FC<ScriptModalHeaderProps> = ({
  title,
  description
}) => {
  return (
    <div style={headerStyle}>
      <Typography
        variant="title2"
        component="h2"
        style={titleStyle}
      >
        {title}
      </Typography>
      <Typography
        variant="label"
        color="alternative"
        style={descriptionStyle}
      >
        {description}
      </Typography>
    </div>
  );
};

const headerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'end',
  justifyContent: 'flex-start',
  width: '100%',
  gap: '15px',
};

const titleStyle: React.CSSProperties = {
  fontWeight: 600,
  fontSize: '20px',
  color: '#171719',
};

const descriptionStyle: React.CSSProperties = {
  fontSize: '13px',
  color: '#78787b',
  alignSelf: 'flex-end',
}; 