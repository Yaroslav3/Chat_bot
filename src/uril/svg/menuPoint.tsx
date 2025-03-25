import * as React from 'react';
import Svg, { G, Rect, Defs, ClipPath } from 'react-native-svg';
import {MenuSvgProps} from './menuSvg.tsx';

const MenuPoint: React.FC<MenuSvgProps> = ({ width = 24, height = 24, color = '#000000' }) => (
    <Svg
        width={width}
        height={height}
        viewBox="0 0 20 20"
        fill="none">
        <G clipPath="url(#clip0_429_11122)">
            <Rect
                x={12}
                y={12}
                width={0.01}
                height={0.01}
                stroke={color}
                strokeWidth={3.75}
                strokeLinejoin="round"
            />
            <Rect
                x={12}
                y={5}
                width={0.01}
                height={0.01}
                stroke={color}
                strokeWidth={3.75}
                strokeLinejoin="round"
            />
            <Rect
                x={12}
                y={19}
                width={0.01}
                height={0.01}
                stroke={color}
                strokeWidth={3.75}
                strokeLinejoin="round"
            />
        </G>
        <Defs>
            <ClipPath id="clip0_429_11122">
                <Rect
                    width={24}
                    height={24}
                    fill="white"
                    transform="translate(0 0.000915527)"
                />
            </ClipPath>
        </Defs>
    </Svg>
);
export default MenuPoint;
