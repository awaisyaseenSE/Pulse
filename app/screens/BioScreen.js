import {View, Text, StyleSheet, Platform, Alert} from 'react-native';
import React, {useState} from 'react';
import ScreenComponent from '../components/ScreenComponent';
import Back from '../components/Back';
import colors from '../config/colors';
import fontFamily from '../config/fontFamily';
import ButtonComponent from '../components/ButtonComponent';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import TextInputComponent from '../components/TextInputComponent';
import CountryPicker from 'react-native-country-picker-modal';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import navigationStrings from '../routes/navigationStrings';
import {useNavigation} from '@react-navigation/native';
import {validatePhoneNumber} from '../utils/validation';

export default function BioScreen({route}) {
  const clientData = route?.params?.clientData;
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [countryCode, setCountryCode] = useState('FR');
  const [country, setCountry] = useState('');
  const [withFlag, setWithFlag] = useState(true);
  const [withEmoji, setWithEmoji] = useState(true);
  const [withFilter, setWithFilter] = useState(true);
  const [isCountryPickerShow, setIsCountryPickerShow] = useState(false);

  const [countryCallingCode, setCountryCallingCode] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const onSelect = country => {
    setCountryCode(country?.cca2);

    setCountry(country?.name);
    setCountryCallingCode(country?.callingCode[0]);
  };

  const handlePress = () => {
    let phoneValid = false;
    if (phone !== '') {
      if (countryCallingCode == '') {
        Alert.alert(
          'Country code is not selected',
          'Please select your country for dail code!',
        );
        return null;
      }
      if (validatePhoneNumber(countryCallingCode + phone)) {
        setPhoneError('');
        phoneValid = true;
      } else {
        setPhoneError('Enter valid phone number!');
        phoneValid = false;
      }
    } else {
      phoneValid = true;
    }

    if (phoneValid) {
      let bioInfo = {
        phone,
        countryCode: countryCallingCode ? countryCallingCode : '',
        countryName: country,
      };
      let final = {...clientData, ...bioInfo};
      navigation.navigate(navigationStrings.UploadImageScreen, {
        clientData: final,
      });
    }
  };

  return (
    <ScreenComponent>
      <Back />
      <View style={styles.container}>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.heading}>
            Fill in your bio to{'\n'}get started
          </Text>
          <Text style={styles.subText}>
            This data will be displayed in your{'\n'}account profile for
            security
          </Text>
        </View>
        <KeyboardAwareScrollView
          style={{flex: 1}}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 50}}
          keyboardShouldPersistTaps="handled">
          <View style={styles.contentContainer}>
            <View style={{marginTop: '14%'}} />
            <TextInputComponent
              placeholder="Full Name"
              leftIcon={require('../assets/user.png')}
              editable={false}
              value={clientData?.userName}
              inputStyle={{marginBottom: 26}}
              placeholderTextColor={colors.black}
            />
            <View style={styles.row}>
              <TextInputComponent
                placeholder="Country"
                leftIcon={require('../assets/world-icon.png')}
                value={country}
                placeholderTextColor={colors.black}
                editable={false}
                inputStyle={{flex: 1}}
                onPressIn={() => setIsCountryPickerShow(true)}
              />
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
            </View>
            <TextInputComponent
              placeholder={countryCallingCode === '' ? 'Phone' : ''}
              leftIcon={require('../assets/phone-icon.png')}
              value={phone}
              placeholderTextColor={colors.black}
              onChangeText={text => {
                if (text.trim().length) {
                  setPhone(text);
                } else {
                  setPhone('');
                }
              }}
              keyboardType="phone-pad"
              maxLength={15}
              leftTxt={countryCallingCode ? `+${countryCallingCode} ` : ''}
              inputStyle={{
                borderColor: colors.red,
                borderWidth:
                  phoneError !== '' ? (Platform.OS === 'android' ? 1 : 0.5) : 0,
              }}
            />
            {phoneError !== '' && (
              <Text style={styles.error}>{phoneError}</Text>
            )}
          </View>
        </KeyboardAwareScrollView>
        <ButtonComponent
          title="Next"
          style={{
            ...styles.btn,
            marginBottom: Platform.OS === 'android' ? 14 : insets.bottom,
          }}
          onPress={() => handlePress()}
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
    marginTop: 12,
    textAlign: 'center',
  },
  subText: {
    fontSize: 14,
    color: colors.gray,
    fontFamily: fontFamily.medium,
    marginTop: 22,
    textAlign: 'center',
  },
  contentContainer: {
    flex: 1,
  },

  btn: {
    marginTop: 6,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.inputBg,
    borderRadius: 8,
    paddingRight: 6,
    marginBottom: 26,
  },
  error: {
    paddingHorizontal: 6,
    marginTop: 6,
    color: colors.red,
    fontSize: 14,
    fontFamily: fontFamily.medium,
  },
});
