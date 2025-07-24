import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface Props {
  size?: number;
  color?: string;
  style?: object;
}

const UnderLine: React.FC<Props> = ({
  size = 24,
  color = '#909090',
  style,
}) => (
  <Svg width={size} height={size} viewBox="0 0 16 17" fill="none" style={style}>
    <Path
      d="M12.9999 1.41016V7.24349C12.9999 10.0049 10.7613 12.2435 7.99992 12.2435C5.23849 12.2435 2.99992 10.0049 2.99992 7.24349V1.41016M1.33325 15.5768H14.6666"
      stroke={color}
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </Svg>
);

export default UnderLine;
