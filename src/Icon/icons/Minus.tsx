import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface Props {
  size?: number;
  color?: string;
  style?: object;
}

const Minus: React.FC<Props> = ({ size = 24, color = '#000', style }) => (
  <Svg
    width={size}
    height={size + 1}
    viewBox="0 0 10 2"
    fill="none"
    style={style}
  >
    <Path
      d="M9.08301 1.58341H0.916341C0.594341 1.58341 0.333008 1.32208 0.333008 1.00008C0.333008 0.678081 0.594341 0.416748 0.916341 0.416748H9.08301C9.40501 0.416748 9.66634 0.678081 9.66634 1.00008C9.66634 1.32208 9.40501 1.58341 9.08301 1.58341Z"
      fill={color}
    />
  </Svg>
);

export default Minus;
