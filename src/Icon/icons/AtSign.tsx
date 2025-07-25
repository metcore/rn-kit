import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface Props {
  size?: number;
  color?: string;
  style?: object;
}

const AtSign: React.FC<Props> = ({ size = 24, color = '#000', style }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <Path
      d="M12 2C6.486 2 2 6.486 2 12C2 17.514 6.486 22 12 22C12.553 22 13 21.552 13 21C13 20.448 12.553 20 12 20C7.589 20 4 16.411 4 12C4 7.589 7.589 4 12 4C16.411 4 20 7.589 20 12C20 13.486 18.99 15 18 15C17.075 15 16.5 14.234 16.5 13V8.5C16.5 7.948 16.053 7.5 15.5 7.5C15.021 7.5 14.64 7.84299 14.542 8.29199C13.818 7.79399 12.943 7.5 12 7.5C9.519 7.5 7.5 9.519 7.5 12C7.5 14.481 9.519 16.5 12 16.5C13.186 16.5 14.258 16.03 15.063 15.278C15.729 16.441 16.887 17 18 17C20.357 17 22 14.365 22 12C22 6.486 17.514 2 12 2ZM12 14.5C10.621 14.5 9.5 13.378 9.5 12C9.5 10.622 10.621 9.5 12 9.5C13.379 9.5 14.5 10.622 14.5 12C14.5 13.378 13.379 14.5 12 14.5Z"
      fill={color}
    />
  </Svg>
);

export default AtSign;
