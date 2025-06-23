export const colors = {
  primary: {
    normal: '#3282FF',
    hover: '#2768E3',
    pressed: '#1F57C7',
    disabled: '#A6C6FF',
  },
  neutral: {
    white: '#FFFFFF',
    gray50: '#F1F2F5',
    gray100: '#EEEEEE',
    gray300: '#A6A6A6',
    gray500: '#78787B',
    gray900: '#171719',
    black: '#000000',
  },
  semantic: {
    error: '#FF3742',
    warning: '#FF8F00',
    success: '#00C851',
    info: '#17A2B8',
  },
} as const;

export type Colors = typeof colors; 