import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface Props {
  size?: number;
  color?: string;
  style?: object;
}

const UserCircleFill: React.FC<Props> = ({
  size = 24,
  color = '#000',
  style,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <Path
      d="M12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2ZM12.0081 7C13.6651 7 15.0081 8.343 15.0081 10C15.0081 11.657 13.6651 13 12.0081 13C10.3511 13 9.00806 11.657 9.00806 10C9.00806 8.343 10.3511 7 12.0081 7ZM12 20.5C9.79 20.5 7.77001 19.65 6.26001 18.26C6.70001 16.88 7.84004 15.5699 10.29 15.5699H13.71C16.15 15.5699 17.29 16.89 17.74 18.26C16.23 19.65 14.21 20.5 12 20.5Z"
      fill={color}
    />
  </Svg>
);

export default UserCircleFill;
