import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface Props {
  size?: number;
  color?: string;
  style?: object;
}

const FolderClock: React.FC<Props> = ({ size = 24, color = '#000', style }) => (
  <Svg
    width={size + 1}
    height={size}
    viewBox="0 0 25 24"
    fill="none"
    style={style}
  >
    <Path
      d="M13.791 14.084C13.986 14.279 13.986 14.596 13.791 14.791C13.693 14.889 13.565 14.937 13.437 14.937C13.309 14.937 13.181 14.888 13.083 14.791L12.145 13.854C12.051 13.76 11.999 13.633 11.999 13.5V12.188C11.999 11.912 12.223 11.688 12.499 11.688C12.775 11.688 12.999 11.912 12.999 12.188V13.293L13.791 14.084ZM21.5 10V17C21.5 19 20.5 20 18.5 20H6.5C4.5 20 3.5 19 3.5 17V7C3.5 5 4.5 4 6.5 4H10.5L13.5 7H18.5C20.5 7 21.5 8 21.5 10ZM16 13.5C16 11.567 14.433 10 12.5 10C10.567 10 9 11.567 9 13.5C9 15.433 10.567 17 12.5 17C14.433 17 16 15.433 16 13.5Z"
      fill={color}
    />
  </Svg>
);

export default FolderClock;
