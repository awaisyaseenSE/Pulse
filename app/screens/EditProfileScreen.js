import {
  View,
  Text,
  StyleSheet,
  Platform,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import colors from '../config/colors';
import fontFamily from '../config/fontFamily';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import TextInputComponent from '../components/TextInputComponent';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FastImage from 'react-native-fast-image';

export default function EditProfileScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const [uName, setUName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.topHeader,
          {
            paddingTop: Platform.OS === 'ios' ? insets.top : 16,
          },
        ]}>
        <TouchableOpacity
          style={styles.backContainer}
          onPress={() => navigation.goBack()}>
          <Image source={require('../assets/arrow.png')} style={styles.back} />
        </TouchableOpacity>
        <Text style={styles.headerHeading}>Edit Profile</Text>
        <TouchableOpacity style={styles.backContainer}>
          <Text style={styles.doneTxt}>Done</Text>
        </TouchableOpacity>
      </View>
      <View style={{flex: 1, paddingHorizontal: 12}}>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          extraScrollHeight={Platform.OS === 'ios' ? 0 : 80}
          enableOnAndroid={true}
          keyboardOpeningTime={0}
          keyboardShouldPersistTaps="handled">
          <View style={styles.card}>
            <TouchableOpacity style={styles.imgeConatiner}>
              <FastImage
                source={{
                  uri: 'https://images.pexels.com/photos/428364/pexels-photo-428364.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
                }}
                style={styles.imge}
              />
            </TouchableOpacity>
            <TextInputComponent
              placeholder="Username"
              inputStyle={styles.input}
              value={uName}
              onChangeText={txt => setUName(txt)}
              placeholderTextColor={colors.gray}
            />
            <TextInputComponent
              placeholder="Email"
              inputStyle={styles.input}
              value={email}
              onChangeText={txt => setEmail(txt)}
              placeholderTextColor={colors.gray}
              keyboardType="email-address"
            />
            <TextInputComponent
              placeholder="Phone"
              inputStyle={styles.input}
              value={phone}
              onChangeText={txt => setPhone(txt)}
              placeholderTextColor={colors.gray}
            />
            <TextInputComponent
              placeholder="Gender"
              inputStyle={styles.input}
              value={gender}
              onChangeText={txt => setGender(txt)}
              placeholderTextColor={colors.gray}
            />
            <TextInputComponent
              placeholder="Date of birth"
              inputStyle={styles.input}
              value={dateOfBirth}
              onChangeText={txt => setDateOfBirth(txt)}
              placeholderTextColor={colors.gray}
            />
          </View>
        </KeyboardAwareScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F7F8F9',
    flex: 1,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 6,
    shadowColor: colors.gray,
    shadowOffset: {
      width: 1.2,
      height: 1.4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,

    elevation: 5,
    paddingHorizontal: 14,
    paddingBottom: 20,
    marginTop: 70,
    marginHorizontal: 2,
  },
  topHeader: {
    backgroundColor: colors.white,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray_Light,
    marginBottom: 20,
    paddingHorizontal: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  txt: {
    fontSize: 16,
    fontFamily: fontFamily.bold,
    color: colors.black,
  },
  back: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: colors.black,
  },
  headerHeading: {
    fontSize: 16,
    color: colors.black,
    fontFamily: fontFamily.bold,
  },
  doneTxt: {
    fontSize: 16,
    color: '#ED8B2A',
    fontFamily: fontFamily.bold,
  },
  backContainer: {
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  input: {
    backgroundColor: '#F7F8F9',
    marginTop: 20,
  },
  imge: {
    width: '100%',
    height: '100%',
    borderRadius: 200,
  },
  imgeConatiner: {
    width: 110,
    height: 110,
    borderRadius: 60,
    alignSelf: 'center',
    marginTop: -50,
    borderWidth: 2,
    borderColor: '#ED8B2A',
    shadowColor: colors.gray,
    shadowOffset: {
      width: 1.2,
      height: 1.4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
