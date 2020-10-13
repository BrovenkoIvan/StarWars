import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {SwipeListView} from 'react-native-swipe-list-view';
import {TouchableHighlight} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

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

  useEffect(() => {
    getMyValue();
    const willFocusSubscription = navigation.addListener(
      'willFocus',
      getMyValue,
    );
    return () => willFocusSubscription.remove();
  }, []);

  const setNewValue = async todo => {
    try {
      const newResList = favorit.filter(favorit => favorit.name !== todo.name);
      await AsyncStorage.setItem('resList', JSON.stringify(newResList));
    } catch (e) {
      console.log('error', e);
    }
  };
  const deleteRow = name => {
    const todo = favorit.find(t => t.name === name);
    setFavorit(prev => prev.filter(todo => todo.name !== name));
    setNewValue(todo);

  };

  // const removeTodo = name => {
  //   const todo = favorit.find(t => t.name === name);
  //   Alert.alert(
  //     'Удаление элемента',
  //     `Вы уверены, что хотите удалить "${todo.name}"?`,
  //     [
  //       {
  //         text: 'Отмена',
  //         style: 'cancel',
  //       },
  //       {
  //         text: 'Удалить',
  //         style: 'destructive',
  //         onPress: () => {
  //           setFavorit(prev => prev.filter(todo => todo.name !== name));
  //           setNewValue(todo)
  //         },
  //       },
  //     ],
  //     {cancelable: false},
  //   );
  // };

  return (
    <SafeAreaView style={{flex: 1}}>
      <SwipeListView
        disableRightSwipe={true}
        data={favorit}
        keyExtractor={result => result.name}
        renderItem={({item}) => (
          <TouchableHighlight
            onPress={() =>
              navigation.navigate('Resident', {
                title: item.name,
                data: item,
              })
            }>
            <View style={styles.rowFront}>
              <Text style={{fontSize: 25}}>{item.name}</Text>
            </View>
          </TouchableHighlight>
        )}
        renderHiddenItem={({item}) => (
          <View style={styles.rowBack}>
            <TouchableOpacity onPress={() => deleteRow(item.name)}>
            <Icon name="ios-close-circle-outline" size={35} />
            </TouchableOpacity>
          </View>
        )}
        rightOpenValue={-50}
      />
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
      color: 'gold',
    },
  };
};
const styles = StyleSheet.create({
  listStyle: {
    paddingLeft: 10,
    paddingTop: 10,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#FF0000',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 10,
  },
  rowFront: {
    paddingLeft: 10,
    backgroundColor: '#CCC',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    justifyContent: 'center',
    height: 50,
    width: '100%',
  },
});

export default FavoriteListScreen;
