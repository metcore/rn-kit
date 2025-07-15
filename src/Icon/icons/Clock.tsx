import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface Props {
  size?: number;
  color?: string;
  style?: object;
}

const Clock: React.FC<Props> = ({ size = 24, color = '#000', style }) => (
  <Svg
    width={size}
    height={size + 1}
    viewBox="0 0 24 25"
    fill="none"
    style={style}
  >
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M12 2.61539C6.477 2.61539 2 7.09239 2 12.6154C2 18.1384 6.477 22.6154 12 22.6154C17.523 22.6154 22 18.1384 22 12.6154C22 7.09239 17.523 2.61539 12 2.61539ZM15.53 16.1454C15.384 16.2914 15.192 16.3654 15 16.3654C14.808 16.3654 14.616 16.2924 14.47 16.1454L11.47 13.1454C11.329 13.0044 11.25 12.8134 11.25 12.6154V7.61539C11.25 7.20139 11.586 6.86539 12 6.86539C12.414 6.86539 12.75 7.20139 12.75 7.61539V12.3044L15.53 15.0844C15.823 15.3784 15.823 15.8524 15.53 16.1454Z"
      fill={color}
    />
  </Svg>
);

export default Clock;
