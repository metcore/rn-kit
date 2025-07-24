import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface Props {
  size?: number;
  color?: string;
  style?: object;
}

const Italic: React.FC<Props> = ({ size = 24, color = '#909090', style }) => (
  <Svg width={size} height={size} viewBox="0 0 14 16" fill="none" style={style}>
    <Path
      d="M12.8334 1.41016H5.33341M8.66675 14.7435H1.16675M9.50008 1.41016L4.50008 14.7435"
      stroke={color}
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </Svg>
);

export default Italic;
