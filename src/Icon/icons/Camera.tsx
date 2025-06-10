import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface Props {
  size?: number;
  color?: string;
  style?: object;
}

const Camera: React.FC<Props> = ({ size = 24, color = '#909090', style }) => (
  <Svg width={size} height={size} viewBox="0 0 18 18" fill="none" style={style}>
    <Path
      d="M15 3.5H13L12.342 1.52588C12.138 0.912879 11.5649 0.5 10.9189 0.5H7.08105C6.43505 0.5 5.86196 0.912879 5.65796 1.52588L5 3.5H3C1 3.5 0 4.5 0 6.5V14.5C0 16.5 1 17.5 3 17.5H15C17 17.5 18 16.5 18 14.5V6.5C18 4.5 17 3.5 15 3.5ZM9 13.5C7.343 13.5 6 12.157 6 10.5C6 8.843 7.343 7.5 9 7.5C10.657 7.5 12 8.843 12 10.5C12 12.157 10.657 13.5 9 13.5ZM14.5 8C13.948 8 13.5 7.552 13.5 7C13.5 6.448 13.948 6 14.5 6C15.052 6 15.5 6.448 15.5 7C15.5 7.552 15.052 8 14.5 8Z"
      fill={color}
    />
  </Svg>
);

export default Camera;
