import * as React from 'react';
import Svg, {ClipPath, Defs, G, Path, Rect} from 'react-native-svg';

export interface MenuSvgProps {
    width?: number | string;
    height?: number | string;
    color?: string;
}

const MenuSvg: React.FC<MenuSvgProps> = ({ width = 24, height = 24, color = "#000000" }) => (

    <Svg
            width={width}
            height={height}
            viewBox="0 0 20 20"
            fill="none"
    >
        <G clipPath="url(#clip0_429_11060)">
            <Path
                d="M4 5.99994H20M4 11.9999H14M4 17.9999H8"
                stroke={color}
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </G>
        <Defs>
            <ClipPath id="clip0_429_11060">
                <Rect width={24} height={24} fill="white" />
            </ClipPath>
        </Defs>
    </Svg>
    // <Svg
    //     width={width}
    //     height={height}
    //     viewBox="0 0 20 20"
    //     fill="none"
    // >
    //     <Path
    //         d="M4 17H20M4 12H20M4 7H20"
    //         stroke={color}
    //         strokeWidth={1.5}
    //         strokeLinecap="round"
    //         strokeLinejoin="round"
    //     />
    // </Svg>
);

export default MenuSvg;
