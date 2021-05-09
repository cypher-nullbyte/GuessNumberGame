import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';

const Header=props=>{

    const [availableDeviceHeight,setAvailableDeviceHeight]=useState(Dimensions.get('window').height);

    useEffect(()=>{
        const updateLayout=()=>{
            setAvailableDeviceHeight(Dimensions.get('window').height);
        };
        Dimensions.addEventListener('change',updateLayout);
        return ()=>{
            Dimensions.removeEventListener('change');
        }
    },[]);

    return(
        <View style={{...styles.header,height:availableDeviceHeight>500 ? 100 :70}}>
            <Text style={styles.headerTitle}>{props.title}</Text>
        </View>
    );
};

const styles=StyleSheet.create({
    header:{
        width:'100%',
        // height:100,
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