import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface Props {
  size?: number;
  color?: string;
  style?: object;
}

const MoreVertical: React.FC<Props> = ({
  size = 24,
  color = '#000',
  style,
}) => (
  <Svg width={size} height={size} style={style} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12.0201 6C10.9161 6 10.0151 5.104 10.0151 4C10.0151 2.896 10.9051 2 12.0101 2H12.0201C13.1241 2 14.0201 2.896 14.0201 4C14.0201 5.104 13.1251 6 12.0201 6ZM14.0201 12C14.0201 10.896 13.1241 10 12.0201 10H12.0101C10.9061 10 10.0151 10.896 10.0151 12C10.0151 13.104 10.9151 14 12.0201 14C13.1251 14 14.0201 13.104 14.0201 12ZM14.0201 20C14.0201 18.896 13.1241 18 12.0201 18H12.0101C10.9061 18 10.0151 18.896 10.0151 20C10.0151 21.104 10.9151 22 12.0201 22C13.1251 22 14.0201 21.104 14.0201 20Z"
      fill={color}
    />
  </Svg>
);

export default MoreVertical;
