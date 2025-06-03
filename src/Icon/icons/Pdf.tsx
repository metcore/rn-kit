import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface Props {
  size?: number;
  color?: string;
  style?: object;
}

const Pdf: React.FC<Props> = ({ size = 24, color = '#909090', style }) => (
  <Svg width={size} height={size} viewBox="0 0 28 36" fill="none" style={style}>
    <Path
      d="M0.59375 6.82812C0.59375 3.12609 3.59484 0.125 7.29688 0.125H17.2468L27.4038 10.6875V29.1719C27.4038 32.8739 24.4027 35.875 20.7007 35.875H7.29688C3.59485 35.875 0.59375 32.8739 0.59375 29.1719V6.82812Z"
      fill={`${color}`}
    />
  </Svg>
);

export default Pdf;
