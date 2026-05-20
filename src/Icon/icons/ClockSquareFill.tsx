import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface Props {
  size?: number;
  color?: string;
  style?: object;
}

const ClockSquareFill: React.FC<Props> = ({
  size = 24,
  color = '#000',
  style,
}) => (
  <Svg width={size} height={size} viewBox="0 0 40 40" fill="none" style={style}>
    <Path
      d="M29.375 5H10.625C6.875 5 5 6.875 5 10.625V29.375C5 33.125 6.875 35 10.625 35H29.375C33.125 35 35 33.125 35 29.375V10.625C35 6.875 33.125 5 29.375 5ZM25.8834 25.8834C25.64 26.1267 25.32 26.25 25 26.25C24.68 26.25 24.36 26.1284 24.1166 25.8834L19.1166 20.8834C18.8816 20.6484 18.75 20.33 18.75 20V11.6667C18.75 10.9767 19.31 10.4167 20 10.4167C20.69 10.4167 21.25 10.9767 21.25 11.6667V19.4816L25.8834 24.115C26.3717 24.605 26.3717 25.395 25.8834 25.8834Z"
      fill={color}
    />
  </Svg>
);

export default ClockSquareFill;
