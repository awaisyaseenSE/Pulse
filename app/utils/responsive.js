import {PixelRatio} from 'react-native';

export const getFontSize = size => {
  const fontScale = PixelRatio.getFontScale();
  return size / fontScale;
};
