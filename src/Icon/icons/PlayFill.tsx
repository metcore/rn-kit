import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface Props {
  size?: number;
  style?: object;
}

const PlayFill: React.FC<Props> = ({ size = 24, style }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <Path
      d="M18.66 14.3866L8.58398 20.5526C6.57898 21.7796 4 20.3405 4 17.9945V6.0055C4 3.6595 6.57898 2.22064 8.58398 3.44764L18.66 9.61366C20.445 10.7067 20.445 13.2946 18.66 14.3866Z"
      fill="white"
    />
  </Svg>
);

export default PlayFill;
