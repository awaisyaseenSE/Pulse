import {
  View,
  Text,
  Platform,
  Image,
  ImageBackground,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import TextInputComponent from '../components/TextInputComponent';
import Button from '../components/ButtonComponent';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {styles} from '../styles/loginSignUpStyle';
import ErrorText from '../components/ErrorText';
import colors from '../config/colors';
import {isEmailValid, validateEmail} from '../utils/validation';
import MyIndicator from '../components/MyIndicator copy';
import {useNavigation} from '@react-navigation/native';
import navigationStrings from '../routes/navigationStrings';

export default function SignUpScreen() {
  const insets = useSafeAreaInsets();
  const [userName, setUserName] = useState('');
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [loading, setLoading] = useState(false);

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [userNameError, setUserNameError] = useState('');

  const handleCreateAccount = () => {
    Keyboard.dismiss();
    let isEmailCorrect = true;
    if (email.length == 0) {
      setEmailError('Email is required.');
      isEmailCorrect = false;
    } else if (!isEmailValid(email)) {
      setEmailError('Please enter a valid email.');
      isEmailCorrect = false;
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

    if (userName.trim().length == 0) setUserNameError('Name is required.');

    try {
      if (
        !isEmailCorrect ||
        password.length < 6 ||
        userName.trim().length == 0
      ) {
        return null;
      } else {
        let clientData = {
          email,
          userName,
          password,
        };
        navigation.navigate(navigationStrings.BioScreen, {
          clientData,
        });
        // setLoading(true);
        // auth()
        //   .createUserWithEmailAndPassword(email, password)
        //   .then(result => {
        //     setLoading(false);
        //     // handleUploadUserData();
        //     console.log('User account created & signed in!');
        //   })
        //   .catch(error => {
        //     if (error.code === 'auth/email-already-in-use') {
        //       setLoading(false);
        //       console.log('That email address is already in use!');
        //       setEmailError('That email address is already in use!');
        //     }
        //     if (error.code === 'auth/invalid-email') {
        //       setLoading(false);
        //       console.log('That email address is invalid!');
        //       setEmailError('That email address is invalid!');
        //     }
        //     if (error.code == 'auth/weak-password') {
        //       setLoading(false);
        //       console.log('Password is weak, create strong password!');
        //       setPasswordError('Password is weak, create strong password!');
        //     }
        //     if (error.code === 'auth/network-request-failed') {
        //       setLoading(false);
        //       console.log(
        //         'auth/network-request-failed. Please check your network connection!',
        //       );
        //       Alert.alert('Please check your network connection!');
        //     }
        //     setLoading(false);
        //     console.log('getting ERROR while Sign up with Eamil: ', error);
        //   });
      }
    } catch (error) {
      setLoading(false);
      console.log('ERROR in SIGN UP: ', error);
    }
  };

  return (
    <>
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
            <View style={styles.loginCard}>
              <ScrollView
                style={{flex: 1, width: '100%'}}
                showsVerticalScrollIndicator={false}>
                <View
                  style={{
                    flex: 1,
                    width: '100%',
                    padding: 20,
                  }}>
                  <Text style={styles.loginTxt}>SignUp</Text>
                  <TextInputComponent
                    placeholder="Full Name"
                    leftIcon={require('../assets/user.png')}
                    value={userName}
                    onChangeText={text => {
                      if (text.trim().length) {
                        let finalTxt = text.replace(/\s\s+/g, ' ');
                        setUserName(finalTxt);
                        setUserNameError('');
                      } else {
                        setUserName('');
                      }
                    }}
                    maxLength={30}
                    inputStyle={{
                      borderColor: colors.red,
                      borderWidth:
                        userNameError !== ''
                          ? Platform.OS === 'android'
                            ? 1
                            : 0.5
                          : 0,
                    }}
                  />
                  <ErrorText
                    style={styles.errorTxtStyle}
                    error={userNameError}
                  />
                  <TextInputComponent
                    placeholder="Email"
                    leftIcon={require('../assets/email.png')}
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
                    autoCapitalize="none"
                    maxLength={30}
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
                    title="Create Account"
                    style={styles.btn}
                    loading={loading}
                    onPress={handleCreateAccount}
                  />
                </View>
              </ScrollView>
            </View>
            <View style={{alignItems: 'center', marginTop: 26}}>
              <Text style={styles.subTxt}>Already have an account?</Text>
              <TouchableOpacity
                style={styles.regTxtContainer}
                onPress={() => navigation.goBack()}>
                <Text style={styles.regTxt}>Login</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAwareScrollView>
        </TouchableWithoutFeedback>
      </View>
      <MyIndicator visible={loading} />
    </>
  );
}
