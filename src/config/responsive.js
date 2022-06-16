import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 426;
const guidelineBaseHeight = 926;

const scaleWidth = size => width / guidelineBaseWidth * size;
const scaleHeight = size => height / guidelineBaseHeight * size;

export {scaleWidth, scaleHeight};
