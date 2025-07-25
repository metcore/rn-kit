import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface Props {
  size?: number;
  color?: string;
  style?: object;
}

const ClockOutline: React.FC<Props> = ({
  size = 24,
  color = '#000',
  style,
}) => (
  <Svg
    width={size}
    height={size + 1}
    viewBox="0 0 24 25"
    fill="none"
    style={style}
  >
    <Path
      d="M12 1.9422C6.072 1.9422 1.25 6.7642 1.25 12.6922C1.25 18.6202 6.072 23.4422 12 23.4422C17.928 23.4422 22.75 18.6202 22.75 12.6922C22.75 6.7642 17.928 1.9422 12 1.9422ZM12 21.9422C6.899 21.9422 2.75 17.7932 2.75 12.6922C2.75 7.5912 6.899 3.4422 12 3.4422C17.101 3.4422 21.25 7.5912 21.25 12.6922C21.25 17.7932 17.101 21.9422 12 21.9422ZM15.53 15.1622C15.823 15.4552 15.823 15.9302 15.53 16.2232C15.384 16.3692 15.192 16.4432 15 16.4432C14.808 16.4432 14.616 16.3702 14.47 16.2232L11.47 13.2232C11.329 13.0822 11.25 12.8912 11.25 12.6932V7.69318C11.25 7.27918 11.586 6.94318 12 6.94318C12.414 6.94318 12.75 7.27918 12.75 7.69318V12.3821L15.53 15.1622Z"
      fill={color}
    />
  </Svg>
);

export default ClockOutline;
