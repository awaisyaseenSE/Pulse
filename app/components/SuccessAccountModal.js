import {
  View,
  Text,
  Modal,
  Dimensions,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import ScreenComponent from './ScreenComponent';
import colors from '../config/colors';
import fontFamily from '../config/fontFamily';
import ButtonComponent from './ButtonComponent';
import useAuths from '../auth/useAuth';
import auth from '@react-native-firebase/auth';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const SuccessAccountModal = ({showModal = false, setShowModal}) => {
  const {user, setUser} = useAuths();
  return (
    <Modal visible={showModal} transparent animationType="slide">
      <ScreenComponent style={{backgroundColor: colors.white}}>
        <View style={styles.container}>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => setShowModal(false)}>
            <Image
              source={require('../assets/success.png')}
              style={styles.img}
            />
          </TouchableOpacity>
          <Text style={styles.heading}>Congrats!</Text>
          <Text style={styles.subHeading}>
            Account is created Successfully!
          </Text>
        </View>
        <ButtonComponent
          title="Home"
          style={styles.btn}
          onPress={() => {
            setUser(auth().currentUser);
          }}
        />
      </ScreenComponent>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  heading: {
    fontSize: 18,
    color: colors.red,
    fontFamily: fontFamily.bold,
    marginTop: 20,
    marginBottom: 14,
  },
  subHeading: {
    fontSize: 16,
    color: colors.black,
    fontFamily: fontFamily.medium,
    textAlign: 'center',
  },
  btn: {
    marginBottom: 30,
    width: '88%',
    alignSelf: 'center',
  },
});

export default SuccessAccountModal;
