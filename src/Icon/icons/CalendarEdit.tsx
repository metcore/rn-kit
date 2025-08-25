import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface Props {
  size?: number;
  color?: string;
  style?: object;
}

const CalendarEdit: React.FC<Props> = ({
  size = 24,
  color = '#000',
  style,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <Path
      d="M20.7 9.75H3.30005C3.13405 9.75 3 9.88405 3 10.05V18C3 20 4 21 6 21H18C20 21 21 20 21 18V10.05C21 9.88405 20.866 9.75 20.7 9.75ZM10.3311 18.75H8.25098V16.6699L11.9609 12.9399L14.061 15.04L10.3311 18.75ZM15.5 13.5991L14.76 14.3391L12.6599 12.239L13.3999 11.499C13.7199 11.169 14.2501 11.169 14.5801 11.489L15.51 12.4189C15.831 12.7499 15.831 13.2791 15.5 13.5991ZM21 7.5V7.94995C21 8.11595 20.866 8.25 20.7 8.25H3.30005C3.13405 8.25 3 8.11595 3 7.94995V7.5C3 5.5 4 4.5 6 4.5H7.25V3C7.25 2.59 7.59 2.25 8 2.25C8.41 2.25 8.75 2.59 8.75 3V4.5H15.25V3C15.25 2.59 15.59 2.25 16 2.25C16.41 2.25 16.75 2.59 16.75 3V4.5H18C20 4.5 21 5.5 21 7.5Z"
      fill={color}
    />
  </Svg>
);

export default CalendarEdit;
