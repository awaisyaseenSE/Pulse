import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import colors from '../../config/colors';
import {getFontSize} from '../../utils/responsive';
import fontFamily from '../../config/fontFamily';
import CountryPicker from 'react-native-country-picker-modal';
import {validatePhoneNumber} from '../../utils/validation';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import TextInputComponent from '../../components/TextInputComponent';
import ButtonComponent from '../../components/ButtonComponent';

const screenHeight = Dimensions.get('window').height;

export default function GLogin() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [countryCode, setCountryCode] = useState('FR');
  const [country, setCountry] = useState('');
  const [withFlag, setWithFlag] = useState(true);
  const [withEmoji, setWithEmoji] = useState(true);
  const [withFilter, setWithFilter] = useState(true);
  const [isCountryPickerShow, setIsCountryPickerShow] = useState(false);

  const [countryCallingCode, setCountryCallingCode] = useState('33');
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const onSelect = country => {
    setCountryCode(country?.cca2);

    setCountry(country?.name);
    setCountryCallingCode(country?.callingCode[0]);
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1, width: '100%'}}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      enabled
      keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}>
      <ScrollView
        style={{flex: 1, backgroundColor: colors.gWhite}}
        showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Image
            source={require('../../assets/gelocery/pic1.png')}
            style={styles.image}
          />
          <View style={styles.content}>
            <Text style={styles.heading}>
              Get your groceries{'\n'}with nectar
            </Text>
            <View style={styles.row}>
              <CountryPicker
                {...{
                  countryCode,
                  withFilter,
                  withFlag,
                  withEmoji,
                  onSelect,
                }}
                visible={isCountryPickerShow}
              />
              <Text style={{fontSize: 14, color: colors.black}}>
                +{countryCallingCode}
              </Text>
              <TextInputComponent
                placeholder="Country"
                value={phone}
                onChangeText={text => setPhone(text.replace(/\s+/g, ''))}
                placeholderTextColor={colors.gray}
                inputStyle={styles.input}
                keyboardType="phone-pad"
                maxLength={15}
              />
            </View>
            <Text style={styles.lightTxt}>Or connect with social media</Text>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate('GEnterPhoneNo')}>
              <Image
                source={require('../../assets/gelocery/google.png')}
                style={styles.google}
              />
            </TouchableOpacity>
            <TouchableOpacity style={{marginTop: 16}} activeOpacity={0.8}>
              <Image
                source={require('../../assets/gelocery/facebook.png')}
                style={styles.google}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gWhite,
  },
  image: {
    width: '100%',
    height: screenHeight * 0.35,
  },
  content: {
    paddingHorizontal: 22,
    marginTop: '10%',
  },
  heading: {
    fontSize: getFontSize(20),
    fontFamily: fontFamily.bold,
    color: colors.black,
    marginBottom: 14,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // backgroundColor: colors.red,
    borderRadius: 8,
    paddingRight: 6,

    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2',
  },
  input: {
    flex: 1,
    backgroundColor: colors.gWhite,
    borderWidth: 0,
  },
  lightTxt: {
    fontSize: 13,
    color: colors.gGray,
    fontFamily: fontFamily.medium,
    textAlign: 'center',
    marginVertical: 30,
  },
  btn: {
    borderRadius: 0,
    backgroundColor: '#5383EC',
  },
  google: {
    width: '100%',
    height: 58,
    resizeMode: 'contain',
  },
});
