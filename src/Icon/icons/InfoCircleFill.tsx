import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface Props {
  size?: number;
  color?: string;
  style?: object;
}

const InfoCircleFill: React.FC<Props> = ({
  size = 24,
  color = '#909090',
  style,
}) => (
  <Svg
    width={size + 1}
    height={size}
    style={style}
    viewBox="0 0 25 24"
    fill="none"
  >
    <Path
      d="M12.5 2C6.977 2 2.5 6.477 2.5 12C2.5 17.523 6.977 22 12.5 22C18.023 22 22.5 17.523 22.5 12C22.5 6.477 18.023 2 12.5 2ZM13.25 16.5C13.25 16.914 12.914 17.25 12.5 17.25C12.086 17.25 11.75 16.914 11.75 16.5V11.929C11.75 11.515 12.086 11.179 12.5 11.179C12.914 11.179 13.25 11.515 13.25 11.929V16.5ZM12.52 9.5C11.968 9.5 11.5149 9.052 11.5149 8.5C11.5149 7.948 11.958 7.5 12.51 7.5H12.52C13.073 7.5 13.52 7.948 13.52 8.5C13.52 9.052 13.072 9.5 12.52 9.5Z"
      fill={color}
    />
  </Svg>
);

export default InfoCircleFill;
