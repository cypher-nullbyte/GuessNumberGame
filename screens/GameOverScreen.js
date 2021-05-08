import React from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';


const GameOverScreen=props=>{
    return(
        <View style={styles.screen}>
            <TitleText>The Game is Over!</TitleText>
            <View style={styles.imageContainer}>
                <Image source={require('../assets/success.png')} style={styles.image}  resizeMode="cover"/>
            </View>
            <BodyText>Number of rounds: {props.roundsNumber}</BodyText>
            <BodyText>Number Was: {props.userNumber}</BodyText>
            <Button title="NEW GAME" onPress={props.onRestart} />
        </View>
    )
};

const styles=StyleSheet.create({
    screen:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
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
    }
});

export default GameOverScreen;