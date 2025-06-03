import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface Props {
  size?: number;
  color?: string;
  style?: object;
}

const ArrowRight: React.FC<Props> = ({ size = 24, color = '#000', style }) => (
  <Svg width={size} height={size} viewBox="0 0 6 10" fill="none" style={style}>
    <Path
      d="M1.00004 10.0003C0.744037 10.0003 0.488006 9.90231 0.293006 9.70731C-0.0979941 9.31631 -0.0979941 8.68425 0.293006 8.29325L3.58597 5.00028L0.293006 1.70731C-0.0979941 1.31631 -0.0979941 0.68425 0.293006 0.29325C0.684006 -0.09775 1.31607 -0.09775 1.70707 0.29325L5.70707 4.29325C6.09807 4.68425 6.09807 5.31631 5.70707 5.70731L1.70707 9.70731C1.51207 9.90231 1.25604 10.0003 1.00004 10.0003Z"
      fill={color}
    />
  </Svg>
);

export default ArrowRight;
