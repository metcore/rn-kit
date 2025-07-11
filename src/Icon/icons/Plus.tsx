import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface Props {
  size?: number;
  color?: string;
  style?: object;
}

const Plus: React.FC<Props> = ({ size = 24, color = '#909090', style }) => (
  <Svg width={size} height={size} viewBox="0 0 16 17" fill="none" style={style}>
    <Path
      d="M15 7.84619H9V1.84619C9 1.29419 8.552 0.846191 8 0.846191C7.448 0.846191 7 1.29419 7 1.84619V7.84619H1C0.448 7.84619 0 8.29419 0 8.84619C0 9.39819 0.448 9.84619 1 9.84619H7V15.8462C7 16.3982 7.448 16.8462 8 16.8462C8.552 16.8462 9 16.3982 9 15.8462V9.84619H15C15.552 9.84619 16 9.39819 16 8.84619C16 8.29419 15.552 7.84619 15 7.84619Z"
      fill={color}
    />
  </Svg>
);

export default Plus;
