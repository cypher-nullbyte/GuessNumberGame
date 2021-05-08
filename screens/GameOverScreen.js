import React from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';
import BodyText from '../components/BodyText';
import MainButton from '../components/MainButton';
import TitleText from '../components/TitleText';
import colors from '../constants/Colors';


const GameOverScreen=props=>{
    return(
        <View style={styles.screen}>
            <TitleText>The Game is Over!</TitleText>
            <View style={styles.imageContainer}>
                <Image source={require('../assets/success.png')} style={styles.image}  resizeMode="cover"/>
            </View>
            <View style={styles.resultContainer}>
                <BodyText styles={{fontSize:16,marginBottom:10}}>Your phone needed <Text style={styles.hightlight}>{props.roundsNumber}</Text> 
                    &nbsp;Rounds to guess the number <Text style={styles.hightlight}>{props.userNumber}</Text> ...</BodyText>
                <MainButton onPress={props.onRestart}>NEW GAME</MainButton>
            </View>
        </View>
    )
};

const styles=StyleSheet.create({
    screen:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    resultContainer:{
        marginHorizontal:30,
    },
    imageContainer:{
        width:300,
        height:300,
        borderRadius:200,
        borderWidth:3,
        borderColor:'black',
        overflow:'hidden',
        marginVertical:30,
    },
    image:{
        width:300,
        height:"100%",
    },
    hightlight:{
        color:colors.primary,
        fontFamily:'open-sans-bold'
    }
});

export default GameOverScreen;