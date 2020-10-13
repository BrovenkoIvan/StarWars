import React, {useState, useEffect} from 'react';
import {TouchableOpacity, View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';

const starContentTrue = <Icon name="ios-star" size={30} color="gold" />;
const starContentFalse = (
  <Icon name="ios-star-outline" size={30} color="gold" />
);

const FavHeaderRight = ({navigation}) => {
  const [isFav, setFav] = useState(false);

  const residentData = navigation.getParam('data');

  useEffect(() => {
    (async () => {
      const resList = await AsyncStorage.getItem('resList');
      const parsedResList = resList ? JSON.parse(resList) : [];
      const isAdded = parsedResList.some(
        item => item.name === residentData.name,
      );
      setFav(isAdded);
    })();
  }, []);

  const setValue = async () => {
    try {
      const resList = await AsyncStorage.getItem('resList');
      const parsedResList = resList ? JSON.parse(resList) : [];
      const isAdded = parsedResList.some(
        item => item.name === residentData.name,
      );
      if (isAdded) {
        const newResList = parsedResList.filter(
          item => item.name !== residentData.name,
        );
        await AsyncStorage.setItem('resList', JSON.stringify(newResList));
        setFav(false);
      } else {
        parsedResList.push(residentData);
        await AsyncStorage.setItem('resList', JSON.stringify(parsedResList));
        setFav(true);
      }
    } catch (e) {
      console.log('eeror', e);
    }
  };
  return (
    <TouchableOpacity onPress={setValue}>
      <View style={{paddingRight: 10}}>
        {isFav ? starContentTrue : starContentFalse}
      </View>
    </TouchableOpacity>
  );
};

export default FavHeaderRight;
