import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Header=props=>{
    return(
        <View style={styles.header}>
            <Text style={styles.headerTitle}>{props.title}</Text>
        </View>
    );
};

const styles=StyleSheet.create({
    header:{
        width:'100%',
        height:100,
        paddingTop:20,
        backgroundColor:'#f7287b',
        alignItems:'center',
        justifyContent:'center',
    },
    headerTitle:{
        color:'black',
        fontSize:20,
        fontFamily:'open-sans-bold'
    }
});

export default Header;