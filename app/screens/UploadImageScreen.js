import {
  View,
  Text,
  StyleSheet,
  Platform,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import ScreenComponent from '../components/ScreenComponent';
import Back from '../components/Back';
import colors from '../config/colors';
import fontFamily from '../config/fontFamily';
import ButtonComponent from '../components/ButtonComponent';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import navigationStrings from '../routes/navigationStrings';
import {useNavigation} from '@react-navigation/native';
import {pickImage} from '../utils/mediaPicker';

export default function UploadImageScreen({route}) {
  const clientData = route?.params?.clientData;
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [selectedImg, setSelectedImg] = useState('');

  const handleImagePicker = async () => {
    try {
      let res = await pickImage('photo');
      if (!!res) {
        setSelectedImg(res?.uri);
      }
    } catch (error) {
      console.log('Error in picking image: ', error);
    }
  };

  const handleNext = () => {
    let final = {...clientData, selectedImg};
    navigation.navigate(navigationStrings.SetLocationScreen, {
      clientData: final,
    });
  };

  return (
    <ScreenComponent>
      <Back />
      <View style={styles.container}>
        <Text style={styles.heading}>Upload your photo{'\n'}profile</Text>
        <View style={styles.contentContainer}>
          {selectedImg === '' ? (
            <View>
              <Image
                source={require('../assets/img-trans.png')}
                style={styles.img}
              />
              <View style={styles.imageUploader}>
                <Text style={styles.heading2}>
                  Organize your{'\n'}file easily
                </Text>
                <Text style={styles.desc}>
                  This data will be displayed in your{'\n'}account profile for
                  security
                </Text>
                <View style={styles.btn1Container}>
                  <TouchableOpacity
                    style={styles.btn1}
                    activeOpacity={0.6}
                    onPress={handleImagePicker}>
                    <Text style={styles.btnTxt}>Select Photo</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ) : (
            <View style={styles.imgContainer}>
              <Text style={styles.infoImg}>
                This data will be displayed in your{'\n'}account profile for
                security
              </Text>
              <Image source={{uri: selectedImg}} style={styles.imgStyle} />
              <TouchableOpacity
                style={styles.redTxtContainer}
                activeOpacity={0.8}
                onPress={handleImagePicker}>
                <Text style={styles.redTxt}>Replace or edit image</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        <ButtonComponent
          title="Next"
          style={{
            ...styles.btn,
            marginBottom: Platform.OS === 'android' ? 14 : insets.bottom,
          }}
          onPress={handleNext}
        />
      </View>
    </ScreenComponent>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 22,
  },
  heading: {
    fontSize: 24,
    color: colors.black,
    fontFamily: fontFamily.bold,
    textAlign: 'center',
    marginTop: '2%',
  },
  contentContainer: {
    flex: 1,
    paddingTop: '12%',
  },

  btn: {
    marginTop: 6,
  },
  img: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    alignSelf: 'flex-end',
  },
  imageUploader: {
    borderWidth: 1,
    borderColor: colors.gray_Light,
    borderRadius: 14,
    height: '60%',
    marginTop: '-9%',
    backgroundColor: colors.white,
    hadowColor: colors.gray,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: 'center',
  },
  heading2: {
    fontSize: 22,
    color: colors.black,
    fontFamily: fontFamily.semi_bold,
    textAlign: 'center',
    marginTop: '8%',
  },
  desc: {
    fontSize: 16,
    color: colors.gray,
    fontFamily: fontFamily.medium,
    textAlign: 'center',
    marginTop: '6%',
  },
  btn1: {
    width: '60%',
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: colors.red,
    paddingVertical: 12,
    alignItems: 'center',
  },
  btn1Container: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
    marginBottom: '10%',
    alignItems: 'center',
  },
  btnTxt: {
    fontSize: 18,
    color: colors.red,
    fontFamily: fontFamily.semi_bold,
  },
  imgContainer: {
    alignItems: 'center',
  },
  imgStyle: {
    width: '96%',
    height: 240,
    borderRadius: 12,
    marginTop: '12%',
  },
  infoImg: {
    fontSize: 16,
    color: colors.gray,
    fontFamily: fontFamily.medium,
    textAlign: 'center',
    width: '90%',
  },
  redTxt: {
    fontSize: 15,
    color: colors.red,
    fontFamily: fontFamily.medium,
  },
  redTxtContainer: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginTop: 4,
  },
});
