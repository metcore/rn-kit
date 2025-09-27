import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface Props {
  size?: number;
  color?: string;
  style?: object;
}

const Phone: React.FC<Props> = ({ size = 24, color = '#909090', style }) => (
  <Svg width={size} height={size} viewBox="0 0 20 20" fill="none" style={style}>
    <Path
      d="M14.6874 11.8111L16.89 13.1244C17.345 13.396 17.5799 13.9244 17.4757 14.4444C17.0499 16.5769 14.9083 17.9436 12.8108 17.3677C7.86163 16.0094 3.99571 12.1552 2.63237 7.19522C2.05571 5.09689 3.42079 2.95354 5.55413 2.52687L5.56816 2.52438C6.089 2.42021 6.61996 2.65605 6.8908 3.11355L8.19329 5.31272C8.65662 6.09522 8.42649 7.10271 7.66899 7.60604L6.28492 8.52688C7.26159 10.866 9.1282 12.7402 11.4607 13.7152L12.3899 12.3277C12.8974 11.5719 13.9058 11.3452 14.6874 11.8111Z"
      fill={color}
    />
  </Svg>
);

export default Phone;
