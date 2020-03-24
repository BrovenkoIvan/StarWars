import React, { useState, useEffect} from 'react'
import { 
    Text, 
    View,
    SafeAreaView, 
    StyleSheet, 
    FlatList,
    TouchableOpacity,
    SearchBar
} from 'react-native'
import Header from '../components/Header'
import SearchBar1 from '../components/SearchBar1'

const ResidentsListScreen = ({ navigation }) => {
    const [term, setTerm] = useState('')
    const [result, setResult] = useState([])  
    const getResult = async () => {
        const  residentsURLs  = navigation.getParam('residents', 'no residents')
        const residentsData = residentsURLs.map( async url => {
            const responce = await fetch(url);
            const dataa = await responce.json();
            return dataa;
        });
        Promise.all(residentsData).then(data => {
            setResult(data);
        })
    }
    useEffect(() => {
        getResult()
    }, [])

    return(
        <SafeAreaView>
             <SearchBar1
                term={term} 
                onTermChange={ setTerm }
                // onTermSubmit={ () => searchApi(term)}
            />
             <FlatList
                data={result}
                keyExtractor={(result) => result.name}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Resident', {title: item.name, data: item, })}
                        >
                            <Text style={styles.listStyle}>{item.name}</Text>
                        </TouchableOpacity>
                        
                    )
                }}
            />
        </SafeAreaView>
    )
}

ResidentsListScreen.navigationOptions = ({ navigation }) => {
    return {
        headerTitle : navigation.getParam('title'),
        headerStyle: {
            backgroundColor: 'black'
        },
        headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 28,
            color: 'white',
            fontFamily: "AvenirNext-DemiBold",
        }
    }
}

const styles = StyleSheet.create({
    listStyle: {
        fontSize: 30,
        paddingLeft: 10,
        paddingTop: 10,
    },
})

export default ResidentsListScreen