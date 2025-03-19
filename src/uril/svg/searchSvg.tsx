import * as React from 'react';
import Svg, {G, Path, Defs, ClipPath, Rect} from 'react-native-svg';
import {MenuSvgProps} from './menuSvg.tsx';

const SearchSvgSVG: React.FC<MenuSvgProps> = ({width = 24, height = 24, color = '#000000'}) => (
  <Svg width={width} height={height} viewBox="0 0 20 20" fill="none">
    <G clipPath="url(#clip0_429_11090)">
      <Path
        d="M21 21L16.6569 16.6569M16.6569 16.6569C18.1046 15.2091 19 13.2091 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C13.2091 19 15.2091 18.1046 16.6569 16.6569Z"
        stroke={color}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_429_11090">
        <Rect width={24} height={24} fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default SearchSvgSVG;
