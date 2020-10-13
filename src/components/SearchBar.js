import React from 'react'
import { View, StyleSheet, TextInput, } from 'react-native'


const SearchBar = ({term, onTermChange, onTermSubmit}) => {
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
    },
    inputStyle: {
        flex: 1,
        fontSize: 18,

    }
})

export default SearchBar