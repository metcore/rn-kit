import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface Props {
  size?: number;
  color?: string;
  style?: object;
}

const Bold: React.FC<Props> = ({ size = 24, color = '#000', style }) => (
  <Svg width={size} height={size} viewBox="0 0 13 16" fill="none" style={style}>
    <Path
      d="M1 8.07682H7.66667C9.50762 8.07682 11 6.58444 11 4.74349C11 2.90254 9.50762 1.41016 7.66667 1.41016H1V8.07682ZM1 8.07682H8.5C10.3409 8.07682 11.8333 9.56921 11.8333 11.4102C11.8333 13.2511 10.3409 14.7435 8.5 14.7435H1V8.07682Z"
      stroke={color}
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </Svg>
);

export default Bold;
