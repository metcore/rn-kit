import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface Props {
  size?: number;
  color?: string;
  style?: object;
}

const ArrowUp: React.FC<Props> = ({ size = 24, color = '#000', style }) => (
  <Svg width={size} height={size} viewBox="0 0 10 6" fill="none" style={style}>
    <Path
      d="M8.33227 5.49999C8.11893 5.49999 7.90557 5.41835 7.74307 5.25585L4.99893 2.51171L2.25479 5.25585C1.92896 5.58168 1.40224 5.58168 1.07641 5.25585C0.750573 4.93002 0.750573 4.4033 1.07641 4.07746L4.40974 0.744131C4.73557 0.418298 5.26229 0.418298 5.58812 0.744131L8.92146 4.07746C9.24729 4.4033 9.24729 4.93002 8.92146 5.25585C8.75896 5.41835 8.5456 5.49999 8.33227 5.49999Z"
      fill={color}
    />
  </Svg>
);

export default ArrowUp;
