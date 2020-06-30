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

  useEffect(() => {
    (async () => {
      const residentData = navigation.getParam('data');
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
      const residentData = navigation.getParam('data');
      const resList = await AsyncStorage.getItem('resList');
      const parsedResList = resList ? JSON.parse(resList) : [];
      const isAdded = parsedResList.some(
        item => item.name === residentData.name,
      );
      console.log('result', isAdded);
      // console.log('deleteResult',deleteResult)
      console.log('parsedResList', parsedResList);
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
      <View>{isFav ? starContentTrue : starContentFalse}</View>
    </TouchableOpacity>
  );
};

export default FavHeaderRight;
