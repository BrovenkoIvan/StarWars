import React, { useState, useEffect} from 'react'
import { 
    Text, 
    View,
    SafeAreaView, 
    StyleSheet, 
    FlatList,
    TouchableOpacity,
} from 'react-native'
import SearchBar from '../components/SearchBar'

const ResidentsListScreen = ({ navigation }) => {
    const [term, setTerm] = useState('')
    const [result, setResult] = useState([])
    const [filteredResident, setFilteredResident] = useState([])

    const getResult = async () => {
        const  residentsURLs  = navigation.getParam('residents')
        const residentsData = residentsURLs.map( async url => {
            const responce = await fetch(url);
            const dataa = await responce.json();
            return dataa;
        });
        Promise.all(residentsData).then(data => {
            setResult(data);
        })
    }
    useEffect(()=>{
        setFilteredResident(
            result.filter( resident => {
                return resident.name.toLowerCase().includes( term.toLowerCase() )
            })
        )
    }, [term, result])

    useEffect(() => {
        getResult()
    }, [])
    
    return(
        <SafeAreaView>
             <SearchBar
                term={term} 
                onTermChange={ setTerm }
            />
            {filteredResident.length ? (
             <FlatList
                data={filteredResident}
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
            ) : (<Text style={{ fontSize: 28, paddingTop: 10}}>Oops... NO RESULTS</Text>)}
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