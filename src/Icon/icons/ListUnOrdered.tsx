import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface Props {
  size?: number;
  color?: string;
  style?: object;
}

const ListUnOrdered: React.FC<Props> = ({
  size = 24,
  color = '#909090',
  style,
}) => (
  <Svg
    width={size + 1}
    height={size}
    viewBox="0 0 25 24"
    fill="none"
    style={style}
  >
    <Path
      d="M21.6667 12L9.66667 12M21.6667 6L9.66667 6M21.6667 18L9.66667 18M5.66667 12C5.66667 12.5523 5.21895 13 4.66667 13C4.11438 13 3.66667 12.5523 3.66667 12C3.66667 11.4477 4.11438 11 4.66667 11C5.21895 11 5.66667 11.4477 5.66667 12ZM5.66667 6C5.66667 6.55228 5.21895 7 4.66667 7C4.11438 7 3.66667 6.55228 3.66667 6C3.66667 5.44772 4.11438 5 4.66667 5C5.21895 5 5.66667 5.44772 5.66667 6ZM5.66667 18C5.66667 18.5523 5.21895 19 4.66667 19C4.11438 19 3.66667 18.5523 3.66667 18C3.66667 17.4477 4.11438 17 4.66667 17C5.21895 17 5.66667 17.4477 5.66667 18Z"
      stroke={color}
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </Svg>
);

export default ListUnOrdered;
