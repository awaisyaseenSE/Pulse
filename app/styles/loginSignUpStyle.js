import {Dimensions, StyleSheet} from 'react-native';
import colors from '../config/colors';
import fontFamily from '../config/fontFamily';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  heading: {
    fontSize: 20,
    color: colors.white,
    fontFamily: fontFamily.semi_bold,
    textAlign: 'center',
    alignSelf: 'center',
    marginTop: 14,
  },
  mainContainer: {
    backgroundColor: colors.red,
    flex: 1,
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
    borderCurve: 'circular',
  },
  bg: {
    width: screenWidth,
    height: screenHeight / 1.7,
  },
  loginCard: {
    width: screenWidth / 1.2,
    height: screenHeight / 1.8,
    marginTop: -(screenHeight / 1.8) / 2,
    backgroundColor: colors.white,

    borderWidth: 1,
    borderColor: colors.gray_Light,
    borderRadius: 12,
    alignSelf: 'center',
    shadowColor: colors.gray,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: 'center',
  },
  loginTxt: {
    fontSize: 24,
    fontFamily: fontFamily.bold,
    color: colors.black,
    marginTop: 4,
    marginBottom: '14%',
  },
  forgotTxt: {
    fontSize: 14,
    color: colors.black,
    fontFamily: fontFamily.regular,
    alignSelf: 'flex-end',
  },
  forgotTxtContainer: {
    paddingVertical: 6,
    paddingHorizontal: 4,
    alignSelf: 'flex-end',
  },
  btn: {
    width: '100%',
    marginTop: '6%',
  },
  orTxt: {
    fontSize: 14,
    color: colors.red,
    fontFamily: fontFamily.medium,
    marginVertical: 20,
  },
  icon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subTxt: {
    fontSize: 16,
    color: colors.black,
    fontFamily: fontFamily.semi_bold,
    marginBottom: 2,
  },
  regTxt: {
    fontSize: 18,
    textTransform: 'uppercase',
    color: colors.red,
    fontFamily: fontFamily.semi_bold,
  },
  regTxtContainer: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  errorTxtStyle: {
    alignSelf: 'flex-start',
    paddingHorizontal: 6,
    marginBottom: 20,
  },
});
