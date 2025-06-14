import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface Props {
  size?: number;
  color?: string;
  style?: object;
}

const ArrowDown: React.FC<Props> = ({ size = 24, color = '#000', style }) => (
  <Svg width={size} height={size} viewBox="0 0 10 6" fill="none" style={style}>
    <Path
      d="M4.99893 5.49999C4.7856 5.49999 4.57224 5.41835 4.40974 5.25585L1.07641 1.92252C0.750573 1.59668 0.750573 1.06996 1.07641 0.744131C1.40224 0.418298 1.92896 0.418298 2.25479 0.744131L4.99893 3.48827L7.74307 0.744131C8.06891 0.418298 8.59562 0.418298 8.92146 0.744131C9.24729 1.06996 9.24729 1.59668 8.92146 1.92252L5.58812 5.25585C5.42562 5.41835 5.21227 5.49999 4.99893 5.49999Z"
      fill={color}
    />
  </Svg>
);

export default ArrowDown;
