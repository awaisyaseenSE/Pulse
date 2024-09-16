import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Platform,
  Image,
} from 'react-native';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import colors from '..//../config/colors';
import fontFamily from '..//../config/fontFamily';
import ButtonComponent from '../../components/ButtonComponent';
import {useNavigation} from '@react-navigation/native';
import navigationStrings from '../../routes/navigationStrings';

export default function GWelcomeScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  return (
    <ImageBackground
      style={styles.container}
      source={require('../../assets/gelocery/onboarding.jpg')}>
      <View style={styles.overflow}>
        <View
          style={[
            styles.footer,
            {marginBottom: Platform.OS === 'android' ? 40 : insets.bottom + 30},
          ]}>
          <Image
            source={require('../../assets/gelocery/donation.png')}
            style={styles.icon}
          />
          <Text style={styles.heading}>Welcome{'\n'}to our store</Text>
          <Text style={styles.text}>
            Get your geloceries with in fast 2 hour.
          </Text>
          <ButtonComponent
            title="Get Started"
            style={styles.btn}
            onPress={() => navigation.navigate('TestingScreen')}
          />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overflow: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    justifyContent: 'flex-end',
  },
  footer: {
    paddingHorizontal: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    paddingVertical: 20,
  },
  icon: {
    width: 48,
    height: 48,
    alignSelf: 'center',
    marginBottom: 14,
  },
  heading: {
    color: colors.white,
    fontFamily: fontFamily.bold,
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 26,
  },
  text: {
    marginTop: 8,
    color: colors.off_White,
    fontSize: 14,
    textAlign: 'center',
    alignSelf: 'center',
    marginBottom: 22,
  },
  btn: {
    backgroundColor: colors.green,
    borderRadius: 12,
    marginBottom: 10,
  },
});
