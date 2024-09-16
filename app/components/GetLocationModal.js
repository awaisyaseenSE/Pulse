import {View, Text, Modal, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import colors from '../config/colors';
import fontFamily from '../config/fontFamily';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

const GetLocationModal = ({show, setShow, setLocation}) => {
  const insets = useSafeAreaInsets();
  return (
    <Modal
      visible={show}
      transparent
      animationType="slide"
      statusBarTranslucent={true}>
      <View style={{flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.6)'}}>
        <TouchableOpacity
          style={{flex: 0.2}}
          activeOpacity={1}
          onPress={() => setShow(false)}
        />
        <View style={styles.container}>
          <GooglePlacesAutocomplete
            placeholder="Search your city name.."
            onPress={(data, details = null) => {
              let lattitude = details?.geometry?.location?.lat;
              let longtitude = details?.geometry?.location?.lng;
              let location = data?.description;
              setLocation({lattitude, longtitude, location});
            }}
            query={{
              key: 'AIzaSyD4kqu-keSJ-JXdGKuhFlg8GWhREYwoNZw',
              language: 'en',
            }}
            fetchDetails={true}
            styles={{
              textInputContainer: {
                backgroundColor: colors.white_Light,
              },
              textInput: {
                height: 48,
                color: '#5d5d5d',
                fontSize: 16,
                backgroundColor: colors.gray_Light,
              },
              predefinedPlacesDescription: {
                color: '#1fafef',
              },
            }}
            onFail={error =>
              console.log('error in picking start location: ', error)
            }
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white_Light,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 26,
    paddingTop: 30,
  },
});

export default GetLocationModal;

{
  /*  */
}
