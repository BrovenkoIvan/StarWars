import React, {useState, useEffect} from 'react'
import { Text, View, StyleSheet,FlatList,TouchableOpacity, SearchBar,SafeAreaView } from 'react-native'
import  AsyncStorage  from '@react-native-community/async-storage';
import usePlanets from '../hooks/usePlanets'
import SearchBar1 from '../components/SearchBar1'


const FavoriteListScreen = () => {
    const [favorit, setFavorit] = useState([])

    const getMyValue = async () => {
        try {
          const value = await AsyncStorage.getItem('MyKey')
          console.log('value',value)
          JSON.parse(value)
          setFavorit(value)
        } catch(e) {
          console.log('error',e)
        }
        console.log('Doo.favorit')

      }

      console.log('Done.', favorit)
      useEffect(()=>{
        getMyValue()
    }, [])

    return(
        <SafeAreaView style={{ flex: 1 }}>     
            <Text>helli</Text> 
           
        </SafeAreaView>
    )
}

FavoriteListScreen.navigationOptions = () => {
    return{
        headerTitle: 'Favorite',
        headerStyle:{
            backgroundColor: 'black'
        },
        headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 28,
            color: 'white'
        },
        
    }
}
const styles =  StyleSheet.create({
  listStyle: {
    fontSize: 30,
    paddingLeft: 10,
    paddingTop: 10,
},
})


export default FavoriteListScreen