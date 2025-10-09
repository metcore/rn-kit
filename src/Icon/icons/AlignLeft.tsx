import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface Props {
  size?: number;
  color?: string;
  style?: object;
}

const AlignLeft: React.FC<Props> = ({ size = 24, color = '#000', style }) => (
  <Svg
    width={size + 1}
    height={size}
    viewBox="0 0 25 24"
    fill="none"
    style={style}
  >
    <Path
      d="M16.6667 10H3.66667M20.6667 6H3.66667M20.6667 14H3.66667M16.6667 18H3.66667"
      stroke={color}
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </Svg>
);

export default AlignLeft;
