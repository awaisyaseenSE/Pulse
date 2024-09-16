import {
  View,
  Text,
  Platform,
  Image,
  ImageBackground,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import TextInputComponent from '../components/TextInputComponent';
import Button from '../components/ButtonComponent';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {styles} from '../styles/loginSignUpStyle';
import ErrorText from '../components/ErrorText';
import {validateEmail} from '../utils/validation';
import colors from '../config/colors';
import {useNavigation} from '@react-navigation/native';
import navigationStrings from '../routes/navigationStrings';
import useAuths from '../auth/useAuth';
import auth from '@react-native-firebase/auth';
import MyIndicator from '../components/MyIndicator copy';

export default function LoginScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const {user, setUser} = useAuths();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [loading, setLoading] = useState(false);

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleLogin = () => {
    Keyboard.dismiss();
    let isEmailCorrect = true;
    if (email.length == 0) {
      setEmailError('Email is required.');
      isEmailCorrect = false;
    } else if (!validateEmail(email)) {
      setEmailError('Please enter a valid email.');
      isEmailCorrect = false;
    } else {
      setEmailError('');
      isEmailCorrect = true;
    }

    if (password === '') {
      setPasswordError('Password is required!');
    } else {
      if (password.length < 6) {
        setPasswordError('Password is not less then 6 characters!');
      } else {
        setPasswordError('');
      }
    }

    try {
      if (!isEmailCorrect || password.length < 6) {
        return null;
      } else {
        setLoading(true);
        auth()
          .signInWithEmailAndPassword(email, password)
          .then(() => {
            setEmail('');
            setPassword('');
            setLoading(false);
            setUser(auth().currentUser);
          })
          .catch(error => {
            setLoading(false);

            if (error.code === 'auth/user-not-found') {
              setEmailError('Invalid Email please check your email');
            } else if (error.code === 'auth/invalid-email') {
              setEmailError('Email is invalid!');
            } else if (error.code === 'auth/wrong-password') {
              setPasswordError('Password is invalid!');
            } else if (error.code === 'auth/internal-error') {
              Alert.alert('Please enter valid email and password!');
            } else if (error.code === 'auth/invalid-credential') {
              Alert.alert('Please enter valid email and password!');
            } else if (error.code === 'auth/invalid-login') {
              Alert.alert('Please enter valid email and password!');
            } else if (error.code === 'auth/network-request-failed') {
              Alert.alert('Please check your network connection!');
            } else {
              console.log('Error while login: ', error);
            }
          });
      }
    } catch (error) {
      console.log('ERROR in LOGIN SCREEN: ', error);
    }
  };

  return (
    <>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 0}}
        keyboardShouldPersistTaps="handled">
        <View style={styles.container}>
          <TouchableWithoutFeedback
            style={{flex: 1}}
            onPress={() => Keyboard.dismiss()}>
            <KeyboardAwareScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{paddingBottom: 50}}
              keyboardShouldPersistTaps="handled">
              <ImageBackground
                source={require('../assets/red-bg.png')}
                style={styles.bg}>
                <View
                  style={{
                    paddingTop: Platform.OS === 'ios' ? insets.top : 12,
                    marginTop: '10%',
                  }}>
                  <Image
                    source={require('../assets/logo-white.png')}
                    style={styles.logo}
                  />
                  <Text style={styles.heading}>Deliver Favourite Food</Text>
                </View>
              </ImageBackground>
              <View style={[styles.loginCard, {padding: 20}]}>
                <Text style={styles.loginTxt}>Login</Text>
                <TextInputComponent
                  placeholder="Email"
                  leftIcon={require('../assets/user.png')}
                  value={email}
                  onChangeText={text => {
                    if (text.trim().length) {
                      if (text.includes(' ')) {
                        setEmail(text.trim());
                      } else {
                        setEmail(text);
                      }
                      if (validateEmail(text)) {
                        setEmailError('');
                      }
                    } else {
                      setEmail('');
                    }
                  }}
                  maxLength={30}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  inputStyle={{
                    borderColor: colors.red,
                    borderWidth:
                      emailError !== ''
                        ? Platform.OS === 'android'
                          ? 1
                          : 0.5
                        : 0,
                  }}
                />
                <ErrorText style={styles.errorTxtStyle} error={emailError} />
                <TextInputComponent
                  placeholder="Password"
                  leftIcon={require('../assets/lock.png')}
                  value={password}
                  onChangeText={text => {
                    if (text.trim().length) {
                      if (text.includes(' ')) {
                        setPassword(text.trim());
                      } else {
                        setPassword(text);
                      }
                    } else {
                      setPassword('');
                    }
                  }}
                  maxLength={30}
                  secureTextEntry={secureTextEntry}
                  onPressSecure={() => setSecureTextEntry(!secureTextEntry)}
                  secureText={
                    secureTextEntry
                      ? require('../assets/show-eye.png')
                      : require('../assets/hide.png')
                  }
                  inputStyle={{
                    borderColor: colors.red,
                    borderWidth:
                      passwordError !== ''
                        ? Platform.OS === 'android'
                          ? 1
                          : 0.5
                        : 0,
                  }}
                />
                <ErrorText
                  style={{...styles.errorTxtStyle, marginBottom: 8}}
                  error={passwordError}
                />
                <TouchableOpacity
                  style={styles.forgotTxtContainer}
                  activeOpacity={0.6}>
                  <Text style={styles.forgotTxt}>Forgot Password?</Text>
                </TouchableOpacity>
                <Button
                  title="Login"
                  style={styles.btn}
                  loading={loading}
                  onPress={handleLogin}
                />
                <Text style={styles.orTxt}>Or</Text>
                <View style={styles.row}>
                  <Image
                    source={require('../assets/google.png')}
                    style={styles.icon}
                  />
                  <Image
                    source={require('../assets/facebook.png')}
                    style={[styles.icon, {marginLeft: 18}]}
                  />
                </View>
              </View>
              <View style={{alignItems: 'center', marginTop: 26}}>
                <Text style={styles.subTxt}>Don't have an account?</Text>
                <TouchableOpacity
                  style={styles.regTxtContainer}
                  onPress={() =>
                    navigation.navigate(navigationStrings.SIGN_UP_SCREEN)
                  }>
                  <Text style={styles.regTxt}>REGISTER</Text>
                </TouchableOpacity>
              </View>
            </KeyboardAwareScrollView>
          </TouchableWithoutFeedback>
        </View>
      </KeyboardAwareScrollView>
      <MyIndicator visible={loading} />
    </>
  );
}
