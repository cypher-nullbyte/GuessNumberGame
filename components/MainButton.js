import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from '../constants/Colors';

const MainButton=props=>{
    return(
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} activeOpacity={0.6} onPress={props.onPress}>
                    <Text style={styles.buttonText}>{props.children}</Text>
            </TouchableOpacity>
        </View>
        
    );
};

const styles=StyleSheet.create({
    buttonContainer:{
        alignItems:'center',
    }, 
    button: {
        backgroundColor:colors.primary,
        paddingVertical:12,
        paddingHorizontal:30,
        borderRadius:25,
    },
    buttonText:{
        color:'white',
        fontFamily:'open-sans',
        fontSize:18,
    },
});

export default MainButton;