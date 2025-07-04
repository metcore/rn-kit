import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface Props {
  size?: number;
  color?: string;
  style?: object;
}

const Search: React.FC<Props> = ({ size = 24, color = '#000', style }) => (
  <Svg width={size} height={size} viewBox="0 0 18 18" fill="none" style={style}>
    <Path
      d="M16.9417 16.0583L13.7409 12.8575C14.8109 11.5883 15.4583 9.9525 15.4583 8.16667C15.4583 4.14583 12.1875 0.875 8.16667 0.875C4.14583 0.875 0.875 4.14583 0.875 8.16667C0.875 12.1875 4.14583 15.4583 8.16667 15.4583C9.9525 15.4583 11.5884 14.8108 12.8575 13.7408L16.0583 16.9417C16.18 17.0633 16.34 17.125 16.5 17.125C16.66 17.125 16.82 17.0642 16.9417 16.9417C17.1859 16.6983 17.1859 16.3025 16.9417 16.0583ZM2.125 8.16667C2.125 4.835 4.835 2.125 8.16667 2.125C11.4983 2.125 14.2083 4.835 14.2083 8.16667C14.2083 11.4983 11.4983 14.2083 8.16667 14.2083C4.835 14.2083 2.125 11.4983 2.125 8.16667Z"
      fill={color}
    />
  </Svg>
);

export default Search;
