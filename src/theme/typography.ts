export const typography = {
  title: {
    1: {
      fontFamily: 'Pretendard',
      fontWeight: 600,
      fontSize: '22px',
      lineHeight: '22px',
    },
    2: {
      fontFamily: 'Pretendard',
      fontWeight: 600,
      fontSize: '20px',
      lineHeight: '20px',
    },
    3: {
      fontFamily: 'Pretendard',
      fontWeight: 500,
      fontSize: '18px',
      lineHeight: '18px',
    },
  },
  body: {
    normal: {
      fontFamily: 'Pretendard',
      fontWeight: 500,
      fontSize: '16px',
      lineHeight: '16px',
    },
    reading: {
      fontFamily: 'Pretendard',
      fontWeight: 500,
      fontSize: '14px',
      lineHeight: '14px',
    },
  },
  button: {
    1: {
      fontFamily: 'Pretendard',
      fontWeight: 500,
      fontSize: '16px',
      lineHeight: '16px',
    },
    2: {
      fontFamily: 'Pretendard',
      fontWeight: 500,
      fontSize: '13px',
      lineHeight: '13px',
    },
  },
  label: {
    fontFamily: 'Pretendard',
    fontWeight: 400,
    fontSize: '13px',
    lineHeight: '13px',
  },
  caption: {
    fontFamily: 'Pretendard',
    fontWeight: 400,
    fontSize: '12px',
    lineHeight: '12px',
  },
  heading: {
    2: {
      fontFamily: 'Pretendard JP',
      fontWeight: 600,
      fontSize: '20px',
      lineHeight: '28px',
    },
  },
  headline: {
    2: {
      fontFamily: 'Pretendard JP',
      fontWeight: 600,
      fontSize: '17px',
      lineHeight: '24px',
    },
  },
  captionBold: {
    1: {
      fontFamily: 'Pretendard JP',
      fontWeight: 600,
      fontSize: '12px',
      lineHeight: '16px',
    },
    2: {
      fontFamily: 'Pretendard JP',
      fontWeight: 600,
      fontSize: '11px',
      lineHeight: '14px',
    },
  },
} as const;

export type Typography = typeof typography; 