import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface Props {
  size?: number;
  color?: string;
  style?: object;
}

const Flag: React.FC<Props> = ({ size = 24, color = '#000', style }) => (
  <Svg
    width={size}
    height={size + 1}
    viewBox="0 0 24 25"
    style={style}
    fill="none"
  >
    <Path
      d="M15 9.26953L19 14.7695H5.75V21.7295C5.75 22.1395 5.41 22.4795 5 22.4795C4.59 22.4795 4.25 22.1395 4.25 21.7295V14.7695V6.76953C4.25 4.76953 5.25 3.76953 7.25 3.76953H19L15 9.26953Z"
      fill={color}
    />
  </Svg>
);

export default Flag;
