import React, {useState} from 'react'
import { 
    Text,
    View, 
    StyleSheet, 
    SafeAreaView, 
    FlatList, 
    TouchableOpacity, 
    StatusBar,
    SearchBar 
} from 'react-native'
import SearchBar1 from '../components/SearchBar1'
import usePlanets from '../hooks/usePlanets'

const PlanetsListScreen = ({ navigation }) => {
    const [term, setTerm] = useState('')
    const [searchAPI, planet, errorMessage]=usePlanets()
    return(
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar barStyle="light-content" />
            <SearchBar1 
                term={term} 
                onTermChange={ setTerm }
                onTermSubmit={ () => searchAPI(term)}
            />
            {errorMessage ? <Text>{errorMessage}</Text> : null}
            <FlatList
                data={planet}
                onEndReached={() => searchAPI()}
                keyExtractor={(planet) => planet.name}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity
                        onPress={() => navigation.navigate('Residents', { title: item.name, residents: item.residents })}>
                        <Text style={styles.listStyle}>{item.name}</Text>
                    </TouchableOpacity>
                )
            }}
            />
        </SafeAreaView>
    )
}

PlanetsListScreen.navigationOptions = () => {
    return {
        headerTitle: 'Planets',
        headerStyle:{
            backgroundColor: 'black'
        },
        headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 28,
            color: 'white',
            fontFamily: "AvenirNext-DemiBold",
        },
    }
}
const styles = StyleSheet.create({
    listStyle: {
        fontSize: 30,
        paddingLeft: 10,
        paddingTop: 10,
    },
})

export default PlanetsListScreen