import {View, Text, Image, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import ScreenComponent from '../components/ScreenComponent';
import colors from '../config/colors';
import fontFamily from '../config/fontFamily';
import Button from '../components/ButtonComponent';
import Animated, {FadeInDown} from 'react-native-reanimated';
import {StackActions, useNavigation} from '@react-navigation/native';
import {storeValue} from '../utils/storeAndGetAsyncStorage';

export default function OnBoardingScreen() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigation = useNavigation();

  const data = [
    {
      title: 'Track your Comfort Food here',
      desc: 'Here You Can find a chef or dish for every taste and color. Enjoy!',
      img: require('../assets/onboarding-img1.png'),
    },
    {
      title: 'Foodie is Where Your Comfort Food Resides',
      desc: 'Enjoy a fast and smooth food delivery at your doorstep',
      img: require('../assets/onboarding-img2.png'),
    },
  ];

  const handleOnPress = async () => {
    try {
      if (selectedIndex === 0) {
        setSelectedIndex(1);
      } else if (selectedIndex === 1) {
        let key = 'onBoarding';
        await storeValue(key, 'true');
        navigation.dispatch(StackActions.replace('LoginScreen'));
      } else {
        return null;
      }
    } catch (error) {
      console.log('Error in onBoarding: ', error);
    }
  };

  return (
    <>
      <ScreenComponent>
        <View style={styles.container}>
          <View>
            <Image source={data[selectedIndex]?.img} style={styles.image} />
            <Image
              source={require('../assets/Illustartion.png')}
              style={styles.imageBG}
            />
          </View>
          <View style={styles.contentContainer}>
            <Animated.Text
              style={styles.heading}
              entering={FadeInDown.delay(500).springify()}>
              {data[selectedIndex]?.title}
            </Animated.Text>
            <Text style={styles.subHeading}>{data[selectedIndex]?.desc}</Text>
            <Animated.View
              entering={FadeInDown.delay(600).springify()}
              style={{width: '100%', alignItems: 'center'}}>
              <Button title="Next" style={styles.btn} onPress={handleOnPress} />
            </Animated.View>
          </View>
        </View>
      </ScreenComponent>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 24,
  },
  image: {
    width: 320,
    height: 320,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  imageBG: {
    width: '100%',
    height: 360,
    position: 'absolute',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 50,
    alignItems: 'center',
  },
  heading: {
    fontSize: 20,
    fontFamily: fontFamily.bold,
    width: '60%',
    textAlign: 'center',
    color: colors.black,
  },
  subHeading: {
    fontSize: 14,
    fontFamily: fontFamily.medium,
    width: '60%',
    textAlign: 'center',
    color: colors.gray,
    marginTop: 16,
  },
  btn: {
    width: '50%',
    marginTop: '20%',
  },
});
