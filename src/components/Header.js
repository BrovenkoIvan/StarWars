import React from 'react'
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    StatusBar,
    TextInput
  } from 'react-native'

  const Header = ({ title }) => {
    return (
        <SafeAreaView style={styles.AreaView}>
            <StatusBar barStyle="light-content" />
            <View style={styles.viewHeaderStyle}>
                <Text style={styles.textHeaderStyle}>{title}</Text>
            </View>
        </SafeAreaView>
    )
  }

  const styles = StyleSheet.create({
    AreaView: {
        backgroundColor: "black",
        flex: 1,
      },
    
      viewHeaderStyle: {
        marginBottom: 3,
        shadowColor: "#000",
        backgroundColor: "black",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.2,
        elevation: 2,
        alignItems: 'center',
      },
      textHeaderStyle: {
        color: "#fff",
        fontSize: 30,
        fontFamily: "AvenirNext-DemiBold",

      },
  })

  export default Header