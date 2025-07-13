import React from 'react';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';

interface PracticeGuideProps {
  isVisible: boolean;
  onDismiss: () => void;
}

export const PracticeGuide: React.FC<PracticeGuideProps> = ({ isVisible, onDismiss }) => {
  if (!isVisible) return null;

  return (
    <div style={positionedTooltipStyle} onClick={onDismiss}>
      <div style={tooltipStyle}>
        <div style={textStyle}>
          재생 버튼을 누르면 시작되며, 한 슬라이드에 머문 시간이 발표 소요시간으로 측정됩니다.
        </div>
      </div>
    </div>
  );
};

const positionedTooltipStyle: React.CSSProperties = {
  position: 'absolute',
  top: '125px', // TopNavBar(60px) + 파일명 패널(약 48px) + 타이머 패널 중앙(약 17px)
  left: '16px', // SideBar의 타이머 컨트롤 패널 왼쪽 패딩과 일치
  zIndex: 1000,
  cursor: 'pointer',
};

const tooltipStyle: React.CSSProperties = {
  backgroundColor: colors.label.normal,
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'row',
  gap: '10px',
  height: '45px',
  alignItems: 'center',
  justifyContent: 'center',
  paddingLeft: '30px',
  paddingRight: '30px',
  paddingTop: '10px',
  paddingBottom: '10px',
  position: 'relative',
  borderRadius: '5px',
  boxShadow: '1px 1px 7.6px 0px rgba(0,0,0,0.1)',
  flexShrink: 0,
  margin: 'auto',
};

const textStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  fontFamily: typography.button[1].fontFamily,
  fontWeight: typography.button[1].fontWeight,
  fontSize: typography.button[1].fontSize,
  lineHeight: '0',
  fontStyle: 'normal',
  position: 'relative',
  flexShrink: 0,
  color: colors.static.white,
  textAlign: 'left',
  whiteSpace: 'nowrap',
  justifyContent: 'center',
};