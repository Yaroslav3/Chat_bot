import * as React from 'react';
import Svg, {G, Path, Defs, ClipPath, Rect} from 'react-native-svg';
import {MenuSvgProps} from './menuSvg.tsx';

const ArrowLeftSvg: React.FC<MenuSvgProps> = ({ width = 24, height = 24, color = "#000000" }) => (
  <Svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none">
    <G clipPath="url(#clip0_429_11256)">
      <Path
        d="M5 12H19"
        stroke={color}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 5L5 12L12 19"
        stroke={color}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_429_11256">
        <Rect width={24} height={24} fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default ArrowLeftSvg;
