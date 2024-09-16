import {
  View,
  Text,
  StyleSheet,
  Platform,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import colors from '../config/colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import fontFamily from '../config/fontFamily';
import ListIconCompo from '../components/ListIconCompo';
import {useNavigation} from '@react-navigation/native';
import navigationStrings from '../routes/navigationStrings';

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  return (
    <View style={[styles.container]}>
      <View
        style={[
          styles.header,
          {
            paddingTop: Platform.OS === 'ios' ? insets.top + 20 : 20,
          },
        ]}>
        <FastImage
          source={{
            uri: 'https://images.pexels.com/photos/428364/pexels-photo-428364.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          }}
          style={styles.image}
        />
        <View style={{marginLeft: 20}}>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => navigation.navigate('EditProfileScreen')}
            style={styles.row}>
            <Text style={styles.heading}>John Wick</Text>
            <Image
              source={require('../assets/right-arrow.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn1} activeOpacity={0.8}>
            <Text style={styles.txt}>♛ Vip member</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView
        style={{flex: 1, marginBottom: 80}}
        showsVerticalScrollIndicator={false}>
        <View style={{flex: 1, paddingHorizontal: 20}}>
          <ListIconCompo
            icon={require('../assets/bell.png')}
            label="Notifications"
          />
          <ListIconCompo
            icon={require('../assets/coin.png')}
            label="Payment method"
          />
          <ListIconCompo
            icon={require('../assets/crown.png')}
            label="Reward credits"
          />
          <ListIconCompo
            icon={require('../assets/promo.png')}
            label="My promo"
          />
          <ListIconCompo
            icon={require('../assets/setting.png')}
            label="Setting"
          />
          <ListIconCompo
            icon={require('../assets/add-user.png')}
            label="Invite Friends"
          />
          <ListIconCompo
            icon={require('../assets/support.png')}
            label="Help center"
          />
          <ListIconCompo
            icon={require('../assets/information.png')}
            label="About us"
            onPress={() =>
              navigation.navigate(navigationStrings.GWelcomeScreen)
            }
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    backgroundColor: '#F7F8F9',
    paddingHorizontal: 20,
    paddingBottom: 30,
    borderBottomWidth: 0.8,
    borderBottomColor: colors.gray_Light,
    marginBottom: 28,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  heading: {
    fontSize: 18,
    color: colors.black,
    fontFamily: fontFamily.bold,
  },
  icon: {
    width: 12,
    height: 12,
    resizeMode: 'contain',
    tintColor: colors.gray,
    marginLeft: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  txt: {
    fontSize: 14,
    fontFamily: fontFamily.medium,
    color: colors.white,
  },
  btn1: {
    backgroundColor: colors.red,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    marginTop: 14,
  },
});
