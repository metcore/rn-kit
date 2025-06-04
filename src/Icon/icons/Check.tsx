import Svg, { Path } from 'react-native-svg';

const Check = ({ size = 16, color = 'black' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M5 13l4 4L19 7"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default Check;
