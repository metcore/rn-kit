import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface Props {
  size?: number;
  color?: string;
  style?: object;
}

const AlignCenter: React.FC<Props> = ({ size = 24, color = '#000', style }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" style={style} fill="none">
    <Path
      d="M18 10H6M21 6H3M21 14H3M18 18H6"
      stroke={color}
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </Svg>
);

export default AlignCenter;
