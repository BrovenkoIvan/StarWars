import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import FavHeaderRight from '../components/FavHeaderRight';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

const ResidentsScreen = ({navigation}) => {
  const [result, setResult] = useState({});

  const getResult = () => {
    const data = navigation.getParam('data');
    setResult(data);
  };

  useEffect(() => {
    getResult();
  }, []);
  return (
    <View style={styles.listView}>
      <View style={styles.img}>
        <Text style={{fontSize: 40}}> Img</Text>
      </View>
      <Text style={styles.textView}>Height: {result.height}</Text>
      <Text style={styles.textView}>Mass: {result.mass}</Text>
      <Text style={styles.textView}>Hair color: {result.hair_color}</Text>
      <Text style={styles.textView}>Scin color: {result.skin_color}</Text>
      <Text style={styles.textView}>Eye color: {result.eye_color}</Text>
      <Text style={styles.textView}>Birth year: {result.birth_year}</Text>
      <Text style={styles.textView}>Gender: {result.gender}</Text>
    </View>
  );
};

ResidentsScreen.navigationOptions = ({navigation}) => {
  return {
    headerTitle: navigation.getParam('title'),
    headerStyle: {
      backgroundColor: 'black',
    },
    headerTitleStyle: {
      fontWeight: 'bold',
      fontSize: 28,
      color: '#8000FF',
      fontFamily: 'AvenirNext-DemiBold',
    },

    headerRight: () => <FavHeaderRight navigation={navigation} />,
    headerLeft: () => (
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <View style={styles.goBack}>
          <Icon name="ios-arrow-back" size={30} color="#8000FF" />
        </View>
      </TouchableOpacity>
    ),
  };
};
const styles = StyleSheet.create({
  textView: {
    fontSize: 20,
    marginLeft: '27%',
  },
  listView: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: '20%',
  },
  img: {
    backgroundColor: '#d81b60',
    height: 200,
    width: 200,
    marginLeft: '27%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  goBack: {
    paddingLeft: 10,
  },
});

export default ResidentsScreen;
