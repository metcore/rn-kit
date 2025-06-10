import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface Props {
  size?: number;
  color?: string;
  style?: object;
}

const Filter: React.FC<Props> = ({ size = 24, color = '#909090', style }) => (
  <Svg width={size} height={size} viewBox="0 0 14 16" fill="none" style={style}>
    <Path
      d="M1.58431 0.5H12.4176C13.1076 0.5 13.6676 1.06 13.6676 1.75V3.63082C13.6676 3.96249 13.536 4.27999 13.3018 4.51499L9.03426 8.7825C8.8001 9.01666 8.66846 9.335 8.66846 9.66667V15.5L5.33513 13V9.66667C5.33513 9.335 5.20349 9.0175 4.96932 8.7825L0.701847 4.51499C0.46768 4.28083 0.335941 3.96249 0.335941 3.63082V1.75C0.334275 1.06 0.894314 0.5 1.58431 0.5Z"
      fill={color}
    />
  </Svg>
);

export default Filter;
