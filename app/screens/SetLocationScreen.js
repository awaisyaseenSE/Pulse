import {
  View,
  Text,
  StyleSheet,
  Platform,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import ScreenComponent from '../components/ScreenComponent';
import Back from '../components/Back';
import colors from '../config/colors';
import fontFamily from '../config/fontFamily';
import ButtonComponent from '../components/ButtonComponent';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import navigationStrings from '../routes/navigationStrings';
import {LinkingContext, useNavigation} from '@react-navigation/native';
import GetLocationModal from '../components/GetLocationModal';
import SuccessAccountModal from '../components/SuccessAccountModal';
import auth from '@react-native-firebase/auth';
import MyIndicator from '../components/MyIndicator copy';

export default function SetLocationScreen({route}) {
  const clientData = route?.params?.clientData;
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [location, setLocation] = useState(null);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleCreateAccount = async () => {
    try {
      console.log(clientData);
      setLoading(true);
      auth()
        .createUserWithEmailAndPassword(clientData?.email, clientData?.password)
        .then(() => {
          auth()
            .currentUser?.updateProfile({
              displayName: clientData?.userName,
              // photoURL: downloadURLOfImage,
            })
            .then(() => {
              setLoading(false);
              setShowSuccessModal(true);
            })
            .catch(e => {
              setLoading(false);
              console.log('error while updatin profile data: ', e);
            });
          console.log('User account created & signed in!');
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            setLoading(false);
            console.log('That email address is already in use!');
            setEmailError('That email address is already in use!');
            Alert.alert(
              'That email address is already in use!',
              'Please change your email!',
            );
          }
          if (error.code === 'auth/invalid-email') {
            setLoading(false);
            console.log('That email address is invalid!');
            setEmailError('That email address is invalid!');
          }
          if (error.code == 'auth/weak-password') {
            setLoading(false);
            console.log(
              'Password is weak, password must be 6 characters or more!',
            );
            setEmailError('Password is weak, try again!');
          }
          if (error.code === 'auth/network-request-failed') {
            setLoading(false);
            console.log(
              'auth/network-request-failed. Please check your network connection!',
            );
            Alert.alert('Please check your network connection!');
          }
          setLoading(false);
          console.log('getting ERROR while Sign up with Eamil: ', error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ScreenComponent>
        <Back iconStyle={{tintColor: colors.red}} />
        <View style={styles.container}>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.heading}>Set your Location</Text>
            <Text style={styles.infoImg}>
              This data will be displayed in your{'\n'}account profile for
              security
            </Text>
          </View>
          <View style={[styles.contentContainer]}>
            <Image
              source={require('../assets/location-icon.png')}
              style={styles.locImg}
            />
            <TouchableOpacity
              style={styles.locaContainer}
              activeOpacity={0.8}
              onPress={() => setShowLocationModal(true)}>
              <Image
                source={require('../assets/plus-icon-frame.png')}
                style={styles.redIcon}
              />
              <Text style={styles.redTxt}>
                {location !== null && location?.location
                  ? location?.location
                  : 'Set your location'}
              </Text>
            </TouchableOpacity>
            <View />
            <View />
          </View>
          <ButtonComponent
            title="Next"
            style={{
              ...styles.btn,
              marginBottom: Platform.OS === 'android' ? 14 : insets.bottom,
            }}
            onPress={handleCreateAccount}
            loading={loading}
          />
          {showLocationModal && (
            <GetLocationModal
              setShow={setShowLocationModal}
              show={showLocationModal}
              setLocation={setLocation}
            />
          )}
        </View>
        {showSuccessModal && (
          <SuccessAccountModal
            showModal={showSuccessModal}
            setShowModal={setShowSuccessModal}
          />
        )}
      </ScreenComponent>
      <MyIndicator visible={loading} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 22,
  },
  heading: {
    fontSize: 24,
    color: colors.red,
    fontFamily: fontFamily.bold,
    textAlign: 'center',
    marginTop: '2%',
  },
  infoImg: {
    fontSize: 16,
    color: colors.gray,
    fontFamily: fontFamily.medium,
    textAlign: 'center',
    width: '90%',
    marginTop: '6%',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 14,
  },
  btn: {
    marginTop: 6,
  },
  locImg: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  locaContainer: {
    borderWidth: 1,
    borderColor: colors.red,
    borderStyle: 'dashed',
    width: '80%',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  redTxt: {
    fontSize: 15,
    color: colors.red,
    fontFamily: fontFamily.medium,
    marginLeft: 14,
    flex: 1,
  },
  redIcon: {
    width: 34,
    height: 34,
  },
});
