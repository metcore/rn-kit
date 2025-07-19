import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface Props {
  size?: number;
  color?: string;
  style?: object;
}

const ShieldFill: React.FC<Props> = ({ size = 24, color = '#000', style }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <Path
      d="M21 10.8889C21 17.5559 15.333 20.889 12 22C8.667 20.889 3 17.5559 3 10.8889C3 9.70192 3 6.137 3 5C8 4 9.77807 3.111 12.0181 2C14.2231 3.111 16 4 21 5C21 6.194 21 9.66392 21 10.8889Z"
      fill={color}
    />
  </Svg>
);

export default ShieldFill;
