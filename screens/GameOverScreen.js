import React, { useEffect, useState } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import BodyText from '../components/BodyText';
import MainButton from '../components/MainButton';
import TitleText from '../components/TitleText';
import colors from '../constants/Colors';

const availableDeviceHeight=Dimensions.get('window').height;
const availableDeviceWidth=Dimensions.get('window').width;

const GameOverScreen=props=>{
    const [availableDeviceWidth,setAvailableDeviceWidth]=useState(Dimensions.get('window').width);
    const [availableDeviceHeight,setAvailableDeviceHeight]=useState(Dimensions.get('window').height);

    useEffect(()=>{
        const updateLayout=()=>{
            setAvailableDeviceHeight(Dimensions.get('window').height);
            setAvailableDeviceWidth(Dimensions.get('window').width);
        };
        Dimensions.addEventListener('change',updateLayout);
        return ()=>{
            Dimensions.removeEventListener('change',updateLayout);
        }
    },[]);
    let styles={
        screen:{
            flex:1,
            justifyContent:'center',
            alignItems:'center',
            width:availableDeviceWidth,
        },
        resultContainer:{
            marginHorizontal:30,
            marginVertical:Math.floor(availableDeviceHeight/60),
        },
        imageContainer:{
            width:Math.floor(availableDeviceWidth*0.7),
            height:Math.floor(availableDeviceWidth*0.7),
            borderRadius:Math.floor(availableDeviceWidth*0.7/2),
            borderWidth:3,
            borderColor:'black',
            overflow:'hidden',
            marginVertical:availableDeviceHeight/30,
        },
        portraitImageContainer:{
            width:Math.floor(availableDeviceWidth*0.5),
            height:Math.floor(availableDeviceWidth*0.5),
            borderRadius:Math.floor(availableDeviceWidth*0.5/2),
            borderWidth:3,
            borderColor:'black',
            overflow:'hidden',
            marginVertical:availableDeviceHeight/30,
        },
        image:{
            width:'100%',
            height:"100%",
        },
        hightlight:{
            color:colors.primary,
            fontFamily:'open-sans-bold'
        }
    };
    return(
        <ScrollView>
            <View style={styles.screen}>
                <TitleText>The Game is Over!</TitleText>
                <View style={availableDeviceWidth>availableDeviceHeight ? styles.portraitImageContainer: styles.imageContainer}>
                    <Image source={require('../assets/success.png')} style={styles.image}  resizeMode="cover"/>
                </View>
                <View style={styles.resultContainer}>
                    <BodyText styles={{fontSize:16,marginBottom:10}}>Your phone needed <Text style={styles.hightlight}>{props.roundsNumber}</Text> 
                        &nbsp;Rounds to guess the number <Text style={styles.hightlight}>{props.userNumber}</Text> ...</BodyText>
                    <MainButton onPress={props.onRestart}>NEW GAME</MainButton>
                </View>
            </View>
        </ScrollView>
    )
};



export default GameOverScreen;

