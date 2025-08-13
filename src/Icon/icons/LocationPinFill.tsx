import Svg, { Path } from 'react-native-svg';

interface Props {
  size?: number;
  color?: string;
  style?: object;
}

const LocationPinFill: React.FC<Props> = ({
  size = 24,
  color,
  style,
}: Props) => (
  <Svg
    width={size}
    height={size + 1}
    viewBox="0 0 24 25"
    fill="none"
    style={style}
  >
    <Path
      d="M12 2.96149C7.313 2.96149 3.5 6.77449 3.5 11.4615C3.5 16.4445 8.129 19.5025 11.192 21.5255L11.722 21.8775C11.806 21.9335 11.903 21.9615 11.999 21.9615C12.095 21.9615 12.192 21.9335 12.276 21.8775L12.806 21.5255C15.869 19.5025 20.498 16.4445 20.498 11.4615C20.5 6.77449 16.687 2.96149 12 2.96149ZM12 13.9615C10.619 13.9615 9.5 12.8425 9.5 11.4615C9.5 10.0805 10.619 8.96149 12 8.96149C13.381 8.96149 14.5 10.0805 14.5 11.4615C14.5 12.8425 13.381 13.9615 12 13.9615Z"
      fill={color}
    />
  </Svg>
);

export default LocationPinFill;
