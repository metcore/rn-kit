import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface Props {
  size?: number;
  color?: string;
  style?: object;
}

const User: React.FC<Props> = ({ size = 24, color = '#909090', style }) => (
  <Svg width={size} height={size} viewBox="0 0 14 16" fill="none" style={style}>
    <Path
      d="M3.67419 3.41659C3.67419 1.57825 5.16919 0.083252 7.00753 0.083252C8.84586 0.083252 10.3409 1.57825 10.3409 3.41659C10.3409 5.25492 8.84586 6.74992 7.00753 6.74992C5.16919 6.74992 3.67419 5.25492 3.67419 3.41659ZM8.66667 8.41659H5.33333C1.95 8.41659 0.75 10.8941 0.75 13.0158C0.75 14.9133 1.75921 15.9166 3.66921 15.9166H10.3308C12.2408 15.9166 13.25 14.9133 13.25 13.0158C13.25 10.8941 12.05 8.41659 8.66667 8.41659Z"
      fill={color}
    />
  </Svg>
);

export default User;
