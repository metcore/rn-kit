import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface Props {
  size?: number;
  color?: string;
  style?: object;
}

const Money: React.FC<Props> = ({ size = 24, color = '#000', style }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <Path
      d="M18 5H6C4 5 3 6 3 8V16C3 18 4 19 6 19H18C20 19 21 18 21 16V8C21 6 20 5 18 5ZM6 13C5.45 13 5 12.55 5 12C5 11.45 5.45 11 6 11C6.55 11 7 11.45 7 12C7 12.55 6.55 13 6 13ZM12 15C10.34 15 9 13.66 9 12C9 10.34 10.34 9 12 9C13.66 9 15 10.34 15 12C15 13.66 13.66 15 12 15ZM18 13C17.45 13 17 12.55 17 12C17 11.45 17.45 11 18 11C18.55 11 19 11.45 19 12C19 12.55 18.55 13 18 13Z"
      fill={color}
    />
  </Svg>
);

export default Money;
