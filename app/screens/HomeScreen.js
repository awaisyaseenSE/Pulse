import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import ScreenComponent from '../components/ScreenComponent';
import navigationStrings from '../routes/navigationStrings';

import fontFamily from '../config/fontFamily';
import colors from '../config/colors';
import {useNavigation} from '@react-navigation/native';
import TextInputComponent from '../components/TextInputComponent';
import {dessertData, popularMenuData} from '../utils/dummyData';
import ShowMenuHomeCompo from '../components/ShowMenuHomeCompo';

export default function HomeScreen() {
  const navigation = useNavigation();
  const [popularShowMore, setPopularShowMore] = useState(false);
  const [dessertShowMore, setDessertShowMore] = useState(false);

  return (
    <ScreenComponent>
      <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
        <View style={styles.container}>
          <View style={styles.row}>
            <Text style={styles.heading}>
              Find your{'\n'}
              Favourite Food
            </Text>
            <TouchableOpacity
              activeOpacity={0.6}
              style={styles.settingIconContainer}
              onPress={() =>
                navigation.navigate(navigationStrings.SettingScreen)
              }>
              <Image
                source={require('../assets/setting.png')}
                style={styles.settingIcon}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.row2}>
            <TextInputComponent
              placeholder="Search for food"
              placeholderTextColor={colors.gray}
              leftIcon={require('../assets/search.png')}
              inputStyle={styles.inputStyle}
              rightIcon={require('../assets/filter.png')}
            />
            <TouchableOpacity style={styles.notifiIconContainer}>
              <Image
                source={require('../assets/notification-with-badge.png')}
                style={styles.notifiIcon}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.banner}>
            <View>
              <Text style={styles.heading2}>
                Special Deal For{'\n'}December
              </Text>
              <TouchableOpacity style={styles.buyNowBtn} activeOpacity={0.7}>
                <Text style={styles.buyNowBtnTxt}>Buy Now</Text>
              </TouchableOpacity>
            </View>
            <Image
              source={require('../assets/home-banner-1.png')}
              style={styles.homeBannerImage}
            />
          </View>
          <View style={styles.row3}>
            <TouchableOpacity
              style={{
                paddingVertical: 6,
                paddingRight: 10,
              }}
              activeOpacity={0.6}
              onPress={() => setPopularShowMore(false)}>
              <Text style={styles.txt}>Popular Menu</Text>
            </TouchableOpacity>
            {!popularShowMore && (
              <TouchableOpacity onPress={() => setPopularShowMore(true)}>
                <Text style={styles.ligth_txt}>View more</Text>
              </TouchableOpacity>
            )}
          </View>
          <View style={{flex: 1, marginTop: 8}}>
            <FlatList
              data={
                popularShowMore ? popularMenuData : popularMenuData?.slice(0, 2)
              }
              renderItem={({item, index}) => (
                <ShowMenuHomeCompo data={item} index={index} />
              )}
              numColumns={2}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
              scrollEnabled={false}
              ItemSeparatorComponent={<View style={{marginVertical: 10}} />}
            />
            <View style={[styles.row3, {marginTop: 20}]}>
              <TouchableOpacity
                style={{
                  paddingVertical: 6,
                  paddingRight: 10,
                }}
                activeOpacity={0.6}
                onPress={() => setDessertShowMore(false)}>
                <Text style={styles.txt}>Dessert</Text>
              </TouchableOpacity>
              {!dessertShowMore && (
                <TouchableOpacity onPress={() => setDessertShowMore(true)}>
                  <Text style={styles.ligth_txt}>View more</Text>
                </TouchableOpacity>
              )}
            </View>
            <FlatList
              style={{marginTop: 8}}
              data={!dessertShowMore ? dessertData?.slice(0, 2) : dessertData}
              renderItem={({item, index}) => (
                <ShowMenuHomeCompo data={item} index={index} />
              )}
              numColumns={2}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
              scrollEnabled={false}
              ItemSeparatorComponent={<View style={{marginVertical: 10}} />}
            />
          </View>
          <View style={{height: 90}} />
        </View>
      </ScrollView>
    </ScreenComponent>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 18,
  },
  btn: {
    marginTop: '10%',
  },
  heading: {
    fontSize: 22,
    fontFamily: fontFamily.bold,
    color: colors.black,
  },
  settingIcon: {
    width: 22,
    height: 22,
    tintColor: colors.black,
    resizeMode: 'contain',
  },
  settingIconContainer: {
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 22,
  },
  inputStyle: {
    borderRadius: 22,
    flex: 1,
  },
  notifiIcon: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
  row2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 22,
  },
  notifiIconContainer: {
    marginLeft: 6,
    paddingLeft: 10,
    paddingVertical: 6,
  },
  homeBannerImage: {
    width: 110,
    height: 110,
    resizeMode: 'contain',
  },
  banner: {
    backgroundColor: colors.red,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  heading2: {
    fontSize: 18,
    fontFamily: fontFamily.semi_bold,
    color: colors.white,
    marginBottom: 12,
  },
  buyNowBtn: {
    backgroundColor: colors.white,
    paddingVertical: 8,
    alignItems: 'center',
    width: '70%',
    borderRadius: 6,
  },
  buyNowBtnTxt: {
    fontFamily: fontFamily.semi_bold,
    fontSize: 14,
    color: colors.red,
  },
  row3: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  txt: {
    fontSize: 17,
    color: colors.black,
    fontFamily: fontFamily.semi_bold,
  },
  ligth_txt: {
    fontSize: 13,
    color: colors.gray,
    fontFamily: fontFamily.medium,
  },
});
