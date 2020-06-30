import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Button,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const FavoriteListScreen = ({navigation}) => {
  const [favorit, setFavorit] = useState([]);

  const getMyValue = async () => {
    try {
      const value = await AsyncStorage.getItem('resList');
      data = value ? JSON.parse(value) : [];
      setFavorit(data);
    } catch (e) {
      console.log('error', e);
    }
  };

  const setValue = async () => {
    try {
      console.log(favorit);
      await AsyncStorage.setItem('resList', JSON.stringify(favorit));
    } catch (e) {
      console.log('error', e);
    }
  };
  useEffect(() => {
    getMyValue();
    const willFocusSubscription = navigation.addListener(
      'willFocus',
      getMyValue,
    );
    // Remove the listener when you are done
    return () => willFocusSubscription.remove();
  }, []);

  console.log(favorit);

  const removeTodo = name => {
    const todo = favorit.find(t => t.name === name);
    Alert.alert(
      'Удаление элемента',
      `Вы уверены, что хотите удалить "${todo.name}"?`,
      [
        {
          text: 'Отмена',
          style: 'cancel',
        },
        {
          text: 'Удалить',
          style: 'destructive',
          onPress: () => {
            setFavorit(prev => prev.filter(todo => todo.name !== name));
          },
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      {favorit.length ? (
        <FlatList
          data={favorit}
          keyExtractor={data => data.name}
          renderItem={({item}) => {
            return (
              <View>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('Resident', {
                      title: item.name,
                      data: item,
                    })
                  }
                  onLongPress={removeTodo.bind(null, item.name)}>
                  <Text style={styles.listStyle}>{item.name}</Text>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      ) : (
        <Text> no favorite</Text>
      )}
    </SafeAreaView>
  );
};

FavoriteListScreen.navigationOptions = () => {
  return {
    headerTitle: 'Favorite',
    headerStyle: {
      backgroundColor: 'black',
    },
    headerTitleStyle: {
      fontWeight: 'bold',
      fontSize: 28,
      color: 'white',
    },
  };
};
const styles = StyleSheet.create({
  listStyle: {
    fontSize: 30,
    paddingLeft: 10,
    paddingTop: 10,
  },
});

export default FavoriteListScreen;
