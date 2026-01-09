import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface Props {
  size?: number;
  color?: string;
  style?: object;
}

const HourGlassFill: React.FC<Props> = ({
  size = 24,
  color = '#909090',
  style,
}) => (
  <Svg width={size} height={size} viewBox="0 0 14 14" fill="none" style={style}>
    <Path
      d="M10.2023 5.1684L7.01152 7L3.80318 5.1684C3.25485 4.85923 2.9165 4.66667 2.9165 3.65167V2.625C2.9165 2.14083 3.30734 1.75 3.7915 1.75H10.2082C10.6923 1.75 11.0832 2.14083 11.0832 2.625V3.65167C11.0832 4.66667 10.7448 4.85923 10.2023 5.1684Z"
      fill={color}
    />
    <Path
      d="M2.9165 10.3483V11.375C2.9165 11.8592 3.30734 12.25 3.7915 12.25H10.2082C10.6923 12.25 11.0832 11.8592 11.0832 11.375V10.3483C11.0832 9.33333 10.7448 9.14077 10.2023 8.8316L7.01152 7L3.80318 8.8316C3.25485 9.14077 2.9165 9.33333 2.9165 10.3483Z"
      fill={color}
    />
  </Svg>
);

export default HourGlassFill;
