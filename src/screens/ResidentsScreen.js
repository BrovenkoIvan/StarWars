import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native'

import FavHeaderRight from '../components/FavHeaderRight'

const ResidentsScreen = ({ navigation }) => {
    const [result, setResult] = useState({})
    const [clickStar, setClickStar] = useState(false)
    
    const getResult = () => {
        const data = navigation.getParam('data')
        setResult(data)
    }

    useEffect(() => {
        getResult()
    }, [])
    return(
        <View style={styles.listView}>
            <View style={styles.img}><Text style={{ fontSize: 40}}> Img</Text></View>
            <Text style={styles.textView}>Height: {result.height}</Text>
            <Text style={styles.textView}>Mass: {result.mass}</Text>
            <Text style={styles.textView}>Hair color: {result.hair_color}</Text>
            <Text style={styles.textView}>Scin color: {result.skin_color}</Text>
            <Text style={styles.textView}>Eye color: {result.eye_color}</Text>
            <Text style={styles.textView}>Birth year: {result.birth_year}</Text>
            <Text style={styles.textView}>Gender: {result.gender}</Text>
            <Button title ='clear storage'onPress={async () => { AsyncStorage.clear()} }/>
        </View>
    )
}

ResidentsScreen.navigationOptions = ({ navigation, clickStar, setClickStar }) => {
    
    
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
            <FavHeaderRight navigation={navigation} />
        )
    }
}
const styles = StyleSheet.create({
    textView: {
        fontSize: 20,
        marginLeft: '27%'
    },
    listView:{
        flex: 1,
        justifyContent: 'center',
        paddingBottom: '20%'
    },
    img: {
        backgroundColor: '#d81b60',
        height: 200,
        width: 200,
        marginLeft: '27%',
        justifyContent: 'center',
        alignItems: 'center'
        }
})

export default ResidentsScreen