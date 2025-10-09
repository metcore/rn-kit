import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface Props {
  size?: number;
  color?: string;
  style?: object;
}

const UnderLine: React.FC<Props> = ({
  size = 24,
  color = '#909090',
  style,
}) => (
  <Svg
    width={size + 1}
    height={size}
    viewBox="0 0 25 24"
    fill="none"
    style={style}
  >
    <Path
      d="M18.6667 4V11C18.6667 14.3137 15.9804 17 12.6667 17C9.35296 17 6.66667 14.3137 6.66667 11V4M4.66667 21H20.6667"
      stroke={color}
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </Svg>
);

export default UnderLine;
