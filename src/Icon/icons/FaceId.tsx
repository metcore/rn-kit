import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface Props {
  size?: number;
  color?: string;
  style?: object;
}

const FaceId: React.FC<Props> = ({ size = 24, color = '#000', style }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <Path
      d="M4.00098 7.99976V5.99976C4.00098 5.46932 4.21169 4.96062 4.58676 4.58554C4.96184 4.21047 5.47054 3.99976 6.00098 3.99976H8.00098"
      stroke={color}
      stroke-width="1.37143"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <Path
      d="M4.00098 15.9998V17.9998C4.00098 18.5302 4.21169 19.0389 4.58676 19.414C4.96184 19.789 5.47054 19.9998 6.00098 19.9998H8.00098"
      stroke={color}
      stroke-width="1.37143"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <Path
      d="M16.001 3.99976H18.001C18.5314 3.99976 19.0401 4.21047 19.4152 4.58554C19.7903 4.96062 20.001 5.46932 20.001 5.99976V7.99976"
      stroke={color}
      stroke-width="1.37143"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <Path
      d="M16.001 19.9998H18.001C18.5314 19.9998 19.0401 19.789 19.4152 19.414C19.7903 19.0389 20.001 18.5302 20.001 17.9998V15.9998"
      stroke={color}
      stroke-width="1.37143"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <Path
      d="M9 10H10"
      stroke={color}
      strokeWidth="1.37143"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M15 10H16"
      stroke={color}
      strokeWidth="1.37143"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M9.50098 14.9999C9.82686 15.3325 10.2158 15.5967 10.6451 15.7771C11.0744 15.9575 11.5353 16.0504 12.001 16.0504C12.4666 16.0504 12.9276 15.9575 13.3568 15.7771C13.7861 15.5967 14.1751 15.3325 14.501 14.9999"
      stroke={color}
      stroke-width="1.37143"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </Svg>
);

export default FaceId;
