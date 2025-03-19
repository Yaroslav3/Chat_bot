import {TypeTheme} from '../../store/state/devise-system.tsx';

export const COLOR_SYSTEM: Record<
  TypeTheme,
  {
    backgroundColor: string;
    backgroundColorHover: string;
    backgroundColorChats: string;
    textColor: string;
    textColorSimple: string;
    borderColor: string;
    colorMenu: string;
    colorBtn: string;
    colorMessage: string;
    colorMessageText: string;
  }
> = {
  BLACK: {
    backgroundColor: 'rgb(25,33,42)',
    backgroundColorHover: 'rgba(52,66,81,0.63)',
    backgroundColorChats: 'rgb(16,22,32)',
    textColor: 'rgb(251,249,249)',
    textColorSimple: 'rgb(141,141,141)',
    borderColor: 'rgb(141,141,141)',
    colorMenu: 'rgb(59,85,177)',
    colorBtn: 'rgb(38,47,60)',
    colorMessage: 'rgb(38,47,60)',
    colorMessageText: 'rgb(251,249,249)',
  },
  WHITE: {
    backgroundColor: 'white',
    backgroundColorHover: 'rgba(52,66,81,0.11)',
    backgroundColorChats: 'rgb(251,249,249)',
    textColor: 'black',
    textColorSimple: 'rgba(37,37,37,0.63)',
    borderColor: 'rgba(37,37,37,0.63)',
    colorMenu: 'rgb(59,85,177)',
    colorBtn: 'rgb(59,85,177)',
    colorMessage: 'rgb(38,47,60)',
    colorMessageText: 'rgb(38,47,60)',
  },
};

export const getColorProperty = (theme: TypeTheme, property: keyof (typeof COLOR_SYSTEM)[TypeTheme]) => {
  return COLOR_SYSTEM[theme][property];
};
