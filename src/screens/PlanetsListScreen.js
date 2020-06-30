import React, {useState, useEffect} from 'react';
import {
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import SearchBar from '../components/SearchBar';
import usePlanets from '../hooks/usePlanets';

const PlanetsListScreen = ({navigation}) => {
  const [term, setTerm] = useState('');
  const [searchAPI, planet, errorMessage] = usePlanets();
  const [filteredPlanets, setFilteredPlanets] = useState([]);

  useEffect(() => {
    setFilteredPlanets(
      planet.filter(planeta => {
        return planeta.name.toLowerCase().includes(term.toLowerCase());
      }),
    );
  }, [term, planet]);
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar barStyle="light-content" />
      <SearchBar term={term} onTermChange={setTerm} />
      {errorMessage ? <Text>{errorMessage}</Text> : null}
      <FlatList
        data={filteredPlanets}
        onEndReached={() => searchAPI()}
        keyExtractor={planet => planet.name}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Residents', {
                  title: item.name,
                  residents: item.residents,
                })
              }>
              <Text style={styles.listStyle}>{item.name}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
};

PlanetsListScreen.navigationOptions = () => {
  return {
    headerTitle: 'Planets',
    headerStyle: {
      backgroundColor: 'black',
    },
    headerTitleStyle: {
      fontWeight: 'bold',
      fontSize: 28,
      color: 'white',
      fontFamily: 'AvenirNext-DemiBold',
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

export default PlanetsListScreen;
