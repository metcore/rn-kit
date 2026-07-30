// Geometry mirrors example/assets/react-logo.svg (the source the splash PNGs
// are rasterized from) — keep both in sync when either changes.
import React from 'react';
import Svg, { Circle, Ellipse, G } from 'react-native-svg';

export interface ReactLogoProps {
  size?: number;
  color?: string;
}

const ReactLogo: React.FC<ReactLogoProps> = ({
  size = 48,
  color = '#4D46FF',
}) => (
  <Svg width={size} height={size} viewBox="-11.5 -11.5 23 23">
    <Circle cx={0} cy={0} r={2.05} fill={color} />
    <G stroke={color} strokeWidth={1} fill="none">
      <Ellipse rx={11} ry={4.2} />
      <Ellipse rx={11} ry={4.2} transform="rotate(60)" />
      <Ellipse rx={11} ry={4.2} transform="rotate(120)" />
    </G>
  </Svg>
);

export default ReactLogo;
