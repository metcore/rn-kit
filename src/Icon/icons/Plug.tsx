import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface Props {
  size?: number;
  color?: string;
  style?: object;
}

const Plug: React.FC<Props> = ({ size = 24, color = '#000', style }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <Path
      d="M18.25 7H16.25V3C16.25 2.59 15.91 2.25 15.5 2.25C15.09 2.25 14.75 2.59 14.75 3V7H9.25V3C9.25 2.59 8.91 2.25 8.5 2.25C8.09 2.25 7.75 2.59 7.75 3V7H5.75C5.336 7 5 7.336 5 7.75V11.343C5 12.404 5.42112 13.4209 6.17212 14.1709L9.56104 17.5601C9.84204 17.8411 10 18.2231 10 18.6211V21H14V18.6211C14 18.2231 14.158 17.8411 14.439 17.5601L17.8279 14.1709C18.5779 13.4209 19 12.403 19 11.343V7.75C19 7.336 18.664 7 18.25 7ZM14 11.75H10C9.586 11.75 9.25 11.414 9.25 11C9.25 10.586 9.586 10.25 10 10.25H14C14.414 10.25 14.75 10.586 14.75 11C14.75 11.414 14.414 11.75 14 11.75Z"
      fill={color}
    />
  </Svg>
);

export default Plug;
