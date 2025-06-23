import React from 'react';
import { typography } from '../../theme/typography';
import { colors } from '../../theme/colors';

export interface TypographyProps {
  variant: 'title1' | 'title2' | 'title3' | 'body1' | 'body2' | 'label' | 'caption';
  children: React.ReactNode;
  color?: keyof typeof colors.neutral | keyof typeof colors.primary;
  align?: 'left' | 'center' | 'right';
  className?: string;
  style?: React.CSSProperties;
}

export const Typography: React.FC<TypographyProps> = ({
  variant,
  children,
  color = 'black',
  align = 'left',
  className = '',
  style,
}) => {
  const getTypographyStyles = (): React.CSSProperties => {
    let baseStyle: any = {};

    switch (variant) {
      case 'title1':
        baseStyle = typography.title[1];
        break;
      case 'title2':
        baseStyle = typography.title[2];
        break;
      case 'title3':
        baseStyle = typography.title[3];
        break;
      case 'body1':
        baseStyle = typography.body[1];
        break;
      case 'body2':
        baseStyle = typography.body[2];
        break;
      case 'label':
        baseStyle = typography.label;
        break;
      case 'caption':
        baseStyle = typography.caption;
        break;
      default:
        baseStyle = typography.body[1];
    }

    return {
      ...baseStyle,
      color: getColor(color),
      textAlign: align,
      margin: 0,
      padding: 0,
      display: 'flex',
      alignItems: 'center',
      ...style,
    };
  };

  const getColor = (colorKey: string): string => {
    if (colorKey in colors.neutral) {
      return colors.neutral[colorKey as keyof typeof colors.neutral];
    }
    if (colorKey in colors.primary) {
      return colors.primary[colorKey as keyof typeof colors.primary];
    }
    return colors.neutral.black;
  };

  const getTag = () => {
    switch (variant) {
      case 'title1':
        return 'h1';
      case 'title2':
        return 'h2';
      case 'title3':
        return 'h3';
      case 'body1':
      case 'body2':
        return 'p';
      case 'label':
      case 'caption':
        return 'span';
      default:
        return 'p';
    }
  };

  const Tag = getTag() as keyof JSX.IntrinsicElements;

  return React.createElement(
    Tag,
    {
      style: getTypographyStyles(),
      className,
    },
    children
  );
}; 