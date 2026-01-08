import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface Props {
  size?: number;
  color?: string;
  style?: object;
}

const ArrowRightLong: React.FC<Props> = ({
  size = 24,
  color = '#000',
  style,
}) => (
  <Svg width={size} height={size} viewBox="0 0 14 14" fill="none" style={style}>
    <Path
      d="M12.0785 7.41309L9.74577 9.74585C9.63202 9.8596 9.48267 9.91675 9.33333 9.91675C9.184 9.91675 9.03465 9.8596 8.9209 9.74585C8.69281 9.51777 8.69281 9.14906 8.9209 8.92098L10.2585 7.58342H2.33333C2.01075 7.58342 1.75 7.32208 1.75 7.00008C1.75 6.67808 2.01075 6.41675 2.33333 6.41675H10.2585L8.9209 5.07918C8.69281 4.8511 8.69281 4.4824 8.9209 4.25431C9.14898 4.02623 9.51768 4.02623 9.74577 4.25431L12.0785 6.58708C12.1328 6.64133 12.1754 6.70545 12.2051 6.7772C12.2641 6.91954 12.2641 7.08063 12.2051 7.22296C12.1754 7.29471 12.1328 7.35884 12.0785 7.41309Z"
      fill={color}
    />
  </Svg>
);

export default ArrowRightLong;
