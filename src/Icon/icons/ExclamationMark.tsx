import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface Props {
  size?: number;
  color?: string;
  style?: object;
}

const ExclamationMark: React.FC<Props> = ({
  size = 24,
  color = '#909090',
  style,
}) => (
  <Svg width={size} height={size} viewBox="0 0 20 20" fill="none" style={style}>
    <Path
      d="M10.0005 20C15.5235 20 20.0005 15.523 20.0005 10C20.0005 4.477 15.5235 0 10.0005 0C4.47749 0 0.000488281 4.477 0.000488281 10C0.000488281 15.523 4.47749 20 10.0005 20ZM9.25049 5.5C9.25049 5.086 9.58649 4.75 10.0005 4.75C10.4145 4.75 10.7505 5.086 10.7505 5.5V10.071C10.7505 10.485 10.4145 10.821 10.0005 10.821C9.58649 10.821 9.25049 10.485 9.25049 10.071V5.5ZM9.98047 12.5C10.5325 12.5 10.9856 12.948 10.9856 13.5C10.9856 14.052 10.5425 14.5 9.99048 14.5H9.98047C9.42747 14.5 8.98047 14.052 8.98047 13.5C8.98047 12.948 9.42847 12.5 9.98047 12.5Z"
      fill={`${color}`}
    />
  </Svg>
);

export default ExclamationMark;
