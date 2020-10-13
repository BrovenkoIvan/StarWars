import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import SearchBar from '../components/SearchBar';
import {AppLoader} from '../components/AppLoader';
import NoContent from '../components/NoContent';

const ResidentsListScreen = ({navigation}) => {
  const [term, setTerm] = useState('');
  const [result, setResult] = useState([]);
  const [filteredResident, setFilteredResident] = useState([]);
  const [loader, setLoader] = useState(false);

  const getResult = async () => {
    try {
      setLoader(true);
      const residentsURLs = navigation.getParam('residents');
      const residentsData = residentsURLs.map(async url => {
        const responce = await fetch(url);
        const dataa = await responce.json();
        return dataa;
      });
      Promise.all(residentsData).then(data => {
        setResult(data);
        setLoader(false);
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setFilteredResident(
      result.filter(resident => {
        return resident.name.toLowerCase().includes(term.toLowerCase());
      }),
    );
  }, [term, result]);

  useEffect(() => {
    getResult();
  }, []);

  let content = (
    <View style={styles.viewListStyle}>
      <FlatList
        data={filteredResident}
        keyExtractor={result => result.name}
        renderItem={({item}) => {
          return (
            <View>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('Resident', {
                    title: item.name,
                    data: item,
                  })
                }>
                <Text style={styles.listStyle}>{item.name}</Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
  if (filteredResident.length === 0) {
    content = <NoContent />;
  }
  if (loader) {
    return <AppLoader />;
  }
  return (
    <SafeAreaView>
      <SearchBar term={term} onTermChange={setTerm} />
      {content}
    </SafeAreaView>
  );
};

ResidentsListScreen.navigationOptions = ({navigation}) => {
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
    headerLeft: () => (
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <View>
          <Icon name="ios-arrow-back" size={30} color="#8000FF" />
        </View>
      </TouchableOpacity>
    ),
  };
};

const styles = StyleSheet.create({
  listStyle: {
    fontSize: 25,
    paddingLeft: 10,
    paddingTop: 10,
  },
  viewListStyle: {
    borderWidth: 1,
    borderColor: '#eee',
  },
});

export default ResidentsListScreen;
