import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface Props {
  size?: number;
  color?: string;
  style?: object;
}

const StopwatchFill2: React.FC<Props> = ({
  size = 24,
  color = '#000',
  style,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M8.25 3C8.25 2.586 8.586 2.25 9 2.25H14C14.414 2.25 14.75 2.586 14.75 3C14.75 3.414 14.414 3.75 14 3.75H9C8.586 3.75 8.25 3.414 8.25 3ZM19 13.5C19 17.642 15.642 21 11.5 21C7.358 21 4 17.642 4 13.5C4 9.358 7.358 6 11.5 6C13.173 6 14.712 6.55398 15.96 7.47998L17.47 5.96997C17.76 5.67997 18.24 5.67997 18.53 5.96997C18.82 6.25997 18.82 6.74003 18.53 7.03003L17.0701 8.48999C18.2661 9.81899 19 11.572 19 13.5ZM13.95 14.4L12.25 13.125V10C12.25 9.586 11.914 9.25 11.5 9.25C11.086 9.25 10.75 9.586 10.75 10V13.5C10.75 13.736 10.861 13.958 11.05 14.1L13.05 15.6C13.185 15.701 13.343 15.75 13.499 15.75C13.728 15.75 13.9531 15.646 14.1001 15.45C14.3491 15.119 14.281 14.648 13.95 14.4Z"
      fill={color}
    />
  </Svg>
);

export default StopwatchFill2;
