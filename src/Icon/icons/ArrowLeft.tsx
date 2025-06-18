import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface Props {
  size?: number;
  color?: string;
  style?: object;
}

const ArrowLeft: React.FC<Props> = ({ size = 24, color = '#000', style }) => (
  <Svg width={size} height={size} viewBox="0 0 6 10" fill="none" style={style}>
    <Path
      d="M4.6669 9.16658C4.45357 9.16658 4.24021 9.08494 4.07771 8.92243L0.744375 5.5891C0.418542 5.26327 0.418542 4.73655 0.744375 4.41072L4.07771 1.07738C4.40354 0.751549 4.93026 0.751549 5.25609 1.07738C5.58193 1.40322 5.58193 1.92993 5.25609 2.25577L2.51195 4.99991L5.25609 7.74405C5.58193 8.06988 5.58193 8.5966 5.25609 8.92243C5.09359 9.08494 4.88023 9.16658 4.6669 9.16658Z"
      fill={color}
    />
  </Svg>
);

export default ArrowLeft;
