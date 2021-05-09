import React from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import BodyText from '../components/BodyText';
import MainButton from '../components/MainButton';
import TitleText from '../components/TitleText';
import colors from '../constants/Colors';


const GameOverScreen=props=>{
    return(
        <ScrollView>
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
        </ScrollView>
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
        marginVertical:Dimensions.get('window').height/60,
    },
    imageContainer:{
        width:Dimensions.get('window').width*0.7,
        height:Dimensions.get('window').width*0.7,
        borderRadius:Dimensions.get('window').width*0.7/2,
        borderWidth:3,
        borderColor:'black',
        overflow:'hidden',
        marginVertical:Dimensions.get('window').height/30,
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