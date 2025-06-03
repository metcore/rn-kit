import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface Props {
  size?: number;
  color?: string;
  style?: object;
}

const ArrowBackAlt: React.FC<Props> = ({
  size = 24,
  color = '#000',
  style,
}) => (
  <Svg width={size} height={size} viewBox="0 0 20 9" fill="none" style={style}>
    <Path
      d="M19.23 8.9729C19.153 8.9909 19.075 9 18.999 9C18.546 9 18.1361 8.68998 18.0271 8.22998C17.1591 4.56198 13.9071 2 10.1201 2C7.21912 2 4.57692 3.565 3.13892 6H5.00488C5.55788 6 6.00488 6.448 6.00488 7C6.00488 7.552 5.55788 8 5.00488 8H1C0.447 8 0 7.552 0 7V3C0 2.448 0.447 2 1 2C1.553 2 2 2.448 2 3V4.09009C3.876 1.57009 6.87212 0 10.1201 0C14.8391 0 18.8909 3.19502 19.9729 7.77002C20.1009 8.30702 19.768 8.8459 19.23 8.9729Z"
      fill={color}
    />
  </Svg>
);

export default ArrowBackAlt;
