import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface Props {
  size?: number;
  color?: string;
  style?: object;
}

const CreditCardFill: React.FC<Props> = ({
  size = 24,
  color = '#000',
  style,
}) => (
  <Svg width={size} height={size} viewBox="0 0 20 20" fill="none" style={style}>
    <Path
      d="M17.5 6.66699V7.70866H2.5V6.66699C2.5 5.00033 3.33333 4.16699 5 4.16699H15C16.6667 4.16699 17.5 5.00033 17.5 6.66699ZM17.5 8.95866V13.3337C17.5 15.0003 16.6667 15.8337 15 15.8337H5C3.33333 15.8337 2.5 15.0003 2.5 13.3337V8.95866H17.5ZM8.95833 12.5003C8.95833 12.1553 8.67833 11.8753 8.33333 11.8753H5.83333C5.48833 11.8753 5.20833 12.1553 5.20833 12.5003C5.20833 12.8453 5.48833 13.1253 5.83333 13.1253H8.33333C8.67833 13.1253 8.95833 12.8453 8.95833 12.5003Z"
      fill={color}
    />
  </Svg>
);

export default CreditCardFill;
