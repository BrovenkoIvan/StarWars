import React from 'react';
import {View, Image, StyleSheet} from 'react-native';

const NoContent = () => {
  return (
    <View style={styles.imgWrap}>
      <Image style={styles.image} source={require('../assets/no-items.png')} />
    </View>
  );
};
const styles = StyleSheet.create({
  imgWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    padding: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});
export default NoContent;
