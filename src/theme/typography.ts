export const typography = {
  title: {
    1: {
      fontFamily: 'Pretendard',
      fontWeight: 600,
      fontSize: '22px',
      lineHeight: '26px',
      letterSpacing: '-0.02em',
    },
    2: {
      fontFamily: 'Pretendard',
      fontWeight: 600,
      fontSize: '20px',
      lineHeight: '24px',
    },
    3: {
      fontFamily: 'Pretendard',
      fontWeight: 500,
      fontSize: '18px',
      lineHeight: '21px',
    },
  },
  body: {
    1: {
      fontFamily: 'Pretendard',
      fontWeight: 400,
      fontSize: '16px',
      lineHeight: '19px',
    },
    2: {
      fontFamily: 'Pretendard',
      fontWeight: 400,
      fontSize: '14px',
      lineHeight: '17px',
    },
  },
  label: {
    fontFamily: 'Pretendard',
    fontWeight: 400,
    fontSize: '13px',
    lineHeight: '16px',
  },
  caption: {
    fontFamily: 'Pretendard',
    fontWeight: 400,
    fontSize: '12px',
    lineHeight: '14px',
  },
  button: {
    1: {
      fontFamily: 'Pretendard',
      fontWeight: 500,
      fontSize: '16px',
      lineHeight: '19px',
    },
    2: {
      fontFamily: 'Pretendard',
      fontWeight: 500,
      fontSize: '13px',
      lineHeight: '16px',
    },
  },
} as const;

export type Typography = typeof typography; 