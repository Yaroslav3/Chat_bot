import { useState, useEffect } from 'react';
import {Dimensions} from 'react-native';

export const screenMob = 700;


export const FormatTime = (dateString: string) => {
  const date = new Date(dateString);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};


export const useScreenLayout = () => {
  // const { height } = useWindowDimensions();
  const [isShowRight, setShowRight] = useState(Dimensions.get('window').width > screenMob);
  const [widthLeft, setWidthLeft] = useState(Math.min(Dimensions.get('window').width * 0.4, 400));
  const [height, screenHeight] = useState(Math.min(Dimensions.get('window').height));
  const [width, setScreenWidth] = useState(Math.min(Dimensions.get('window').width));

  useEffect(() => {
    const updateLayout = () => {
      const screenWidth = Dimensions.get('window').width;
      setShowRight(screenWidth >= screenMob);
      setWidthLeft(Math.min(screenWidth * 0.4, 400));
      screenHeight( Dimensions.get('window').height);
      setScreenWidth(Dimensions.get('window').width);
    };

    const subscription = Dimensions.addEventListener('change', updateLayout);
    return () => subscription.remove();
  }, []);

  return { isShowRight, widthLeft, height,  width};
};
