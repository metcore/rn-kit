import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface Props {
  size?: number;
  style?: object;
}

const HourGlassFillBulk: React.FC<Props> = ({ size = 24, style }) => (
  <Svg width={size} height={size} viewBox="0 0 40 40" fill="none" style={style}>
    <Path
      d="M29.1501 14.7668L20.0335 20L10.8669 14.7668C9.3002 13.8835 8.3335 13.3333 8.3335 10.4333V7.5C8.3335 6.11667 9.45016 5 10.8335 5H29.1668C30.5502 5 31.6668 6.11667 31.6668 7.5V10.4333C31.6668 13.3333 30.7001 13.8835 29.1501 14.7668Z"
      fill="#0CA2FF"
    />
    <Path
      d="M8.3335 29.5667V32.5C8.3335 33.8833 9.45016 35 10.8335 35H29.1668C30.5502 35 31.6668 33.8833 31.6668 32.5V29.5667C31.6668 26.6667 30.7001 26.1165 29.1501 25.2332L20.0335 20L10.8669 25.2332C9.3002 26.1165 8.3335 26.6667 8.3335 29.5667Z"
      fill="#065EB7"
    />
  </Svg>
);

export default HourGlassFillBulk;
