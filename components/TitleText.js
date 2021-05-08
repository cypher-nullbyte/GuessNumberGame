import React from 'react';
import {Text,StyleSheet} from 'react-native';

const TitleText=props=> <Text style={styles.title}>{props.children}</Text>

const styles=StyleSheet.create({
    title:{
        fontSize:20,
        marginVertical:10,
        fontFamily:'open-sans-bold'
    }
});
export default TitleText;