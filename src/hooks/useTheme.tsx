import React from 'react';
import {useColorScheme} from 'react-native';
import {defaultLightColors, defaultDarkColors} from '../themes/Colors';

const useTheme = () => {
  const isDarkMode = useColorScheme();
  const Colors = isDarkMode ? defaultLightColors : defaultDarkColors;

  return {
    Colors,
  };
};

export default useTheme;
