import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface Props {
  size?: number;
  color?: string;
  style?: object;
}

const StickyNote: React.FC<Props> = ({ size = 24, color = '#000', style }) => (
  <Svg width={size} height={size} viewBox="0 0 18 18" fill="none" style={style}>
    <Path
      d="M18 3.37V9.84998C18 10.07 17.9799 10.29 17.9299 10.5H13.8799C12.0099 10.5 10.5 12.01 10.5 13.88V17.9301C10.29 17.9801 10.0701 18 9.8501 18H3.37988C1.11988 18 0 16.87 0 14.62V3.37C0 1.12 1.11988 0 3.37988 0H14.6201C16.8801 0 18 1.12 18 3.37ZM12 13.88V17.22C12.09 17.16 12.16 17.09 12.24 17.01L17.01 12.24C17.09 12.16 17.16 12.09 17.22 12H13.8799C12.8399 12 12 12.84 12 13.88Z"
      fill={`${color}`}
    />
  </Svg>
);

export default StickyNote;
