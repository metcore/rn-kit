import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface Props {
  size?: number;
  color?: string;
  style?: object;
}

const FolderClock: React.FC<Props> = ({ size = 24, color = '#000', style }) => (
  <Svg
    width={size}
    height={size - 2}
    viewBox="0 0 19 16"
    fill="none"
    style={style}
  >
    <Path
      d="M10.791 10.084C10.986 10.279 10.986 10.596 10.791 10.791C10.693 10.889 10.565 10.937 10.437 10.937C10.309 10.937 10.181 10.888 10.083 10.791L9.14502 9.854C9.05102 9.76 8.99902 9.633 8.99902 9.5V8.18799C8.99902 7.91199 9.22302 7.68799 9.49902 7.68799C9.77502 7.68799 9.99902 7.91199 9.99902 8.18799V9.293L10.791 10.084ZM18.5 6V13C18.5 15 17.5 16 15.5 16H3.5C1.5 16 0.5 15 0.5 13V3C0.5 1 1.5 0 3.5 0H7.5L10.5 3H15.5C17.5 3 18.5 4 18.5 6ZM13 9.5C13 7.567 11.433 6 9.5 6C7.567 6 6 7.567 6 9.5C6 11.433 7.567 13 9.5 13C11.433 13 13 11.433 13 9.5Z"
      fill={color}
    />
  </Svg>
);

export default FolderClock;
