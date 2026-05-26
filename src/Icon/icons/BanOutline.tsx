import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface Props {
  size?: number;
  color?: string;
  style?: object;
}

const BanOutline: React.FC<Props> = ({ size = 24, color = '#000', style }) => (
  <Svg width={size} height={size} viewBox="0 0 20 20" fill="none" style={style}>
    <Path
      d="M9.9987 0.833374C4.94453 0.833374 0.832031 4.94587 0.832031 10C0.832031 15.0542 4.94453 19.1667 9.9987 19.1667C15.0529 19.1667 19.1654 15.0542 19.1654 10C19.1654 4.94587 15.0529 0.833374 9.9987 0.833374ZM2.4987 10C2.4987 5.86504 5.86286 2.50004 9.9987 2.50004C11.767 2.50004 13.3913 3.11846 14.6746 4.14596L4.14461 14.6759C3.11711 13.3926 2.4987 11.7684 2.4987 10ZM9.9987 17.5C8.23036 17.5 6.60613 16.8816 5.32279 15.8541L15.8528 5.32414C16.8803 6.6083 17.4987 8.23254 17.4987 10C17.4987 14.135 14.1345 17.5 9.9987 17.5Z"
      fill={color}
    />
  </Svg>
);

export default BanOutline;
