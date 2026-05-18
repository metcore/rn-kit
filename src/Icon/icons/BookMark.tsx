import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface Props {
  size?: number;
  color?: string;
  style?: object;
}

const BookMark: React.FC<Props> = ({ size = 24, color = '#000', style }) => (
  <Svg width={size} height={size} viewBox="0 0 40 40" fill="none" style={style}>
    <Path
      d="M30.8346 3.75H26.668V16.6667L23.3346 14.7618L20.0013 16.6667V3.75H11.668C7.63797 3.75 5.41797 5.97 5.41797 10V30C5.41797 33.7383 7.92964 36.25 11.668 36.25H30.8346C32.9013 36.25 34.5846 34.5683 34.5846 32.5V22.5V7.5C34.5846 5.43167 32.9013 3.75 30.8346 3.75ZM32.0846 32.5C32.0846 33.19 31.523 33.75 30.8346 33.75H11.668C8.28464 33.75 7.91797 31.1267 7.91797 30C7.91797 28.8733 8.28464 26.25 11.668 26.25H30.8346C31.0763 26.25 31.3098 26.2217 31.5382 26.1784C31.6115 26.1651 31.6813 26.14 31.753 26.1216C31.863 26.0933 31.978 26.0733 32.0846 26.035V32.5Z"
      fill={color}
    />
  </Svg>
);

export default BookMark;
