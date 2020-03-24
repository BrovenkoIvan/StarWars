import React from 'react'
import { View, Text, StyleSheet, TextInput, } from 'react-native'


const SearchBar1 = ({term, onTermChange, onTermSubmit}) => {
    return(
        <View style={styles.backgroundStyle}>
            <TextInput 
                style={styles.inputStyle}
                placeholder="Search"
                value={term}
                onChangeText={onTermChange}
                onEndEditing={onTermSubmit}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    backgroundStyle: {
        marginTop: 15,
        backgroundColor: '#F0EEEE',
        height: 50,
        borderRadius: 5,
        marginHorizontal: 15, 
        flexDirection: 'row',
        marginBottom: 10
    },
    inputStyle: {
        flex: 1,
        fontSize: 18,

    },
    // iconStyle: {
    //     fontSize: 35,
    //     alignSelf: 'center',
    //     marginHorizontal: 15
    // }
})

export default SearchBar1