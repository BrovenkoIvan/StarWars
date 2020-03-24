import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native'
import  AsyncStorage  from '@react-native-community/async-storage';

const ResidentsScreen = ({ navigation }) => {
    const [result, setResult] = useState({})  
    const getResult = () => {
        const data = navigation.getParam('data')
        setResult(data)
    }

    useEffect(() => {
        getResult()
    }, [])
    return(
        <View>
            <Text>Height: {result.height}</Text>
            <Text>Mass: {result.mass}</Text>
            <Text>Hair color: {result.hair_color}</Text>
            <Text>Scin color: {result.skin_color}</Text>
            <Text>Eye color: {result.eye_color}</Text>
            <Text>Birth year: {result.birth_year}</Text>
            <Text>Gender: {result.gender}</Text>
        </View>
    )
}

ResidentsScreen.navigationOptions = ({ navigation }) => {
    const res = navigation.getParam('data')
    
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
        },
        headerRight: () => (
            <Button
              onPress = { async () => {
                try {
                await AsyncStorage.setItem('MyKey', JSON.stringify(res))      
                } catch (e) {
                    console.log('eeror',e)
                }
                console.log('doResident')
            } }
              title="Star"
              color="gold"
              fontSize="25"
            />
        )
    }
}
const styles = StyleSheet.create({
    favorite: {
        fontSize: 20,
    }
})

export default ResidentsScreen