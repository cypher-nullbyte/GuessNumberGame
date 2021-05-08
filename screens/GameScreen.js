import React, { useEffect, useRef, useState } from 'react';
import {View,Text,StyleSheet, Button, Alert} from 'react-native';
import Card from '../components/Card';
import {Ionicons} from '@expo/vector-icons';
import NumberContainer from '../components/NumberContainer';
import TitleText from '../components/TitleText';
import MainButton from '../components/MainButton';

const generateRandomBetween=(min,max,exclude)=>{
    min=Math.ceil(min);
    max=Math.floor(max);
    const rndNum=Math.floor(Math.random()*(max-min))+min;

    if(rndNum===exclude)
    {
        return generateRandomBetween(min,max,exclude);
    }
    else
    {
        return rndNum;
    }
};

const GameScreen=props=>{
    const [currentGuess,setCurrentGuess]= useState(generateRandomBetween(1,100,props.userChoice));
    const [rounds,setRounds]=useState(0);
    const currentLow=useRef(1);
    const currentHigh=useRef(100);

    const {userChoice,onGameOver}=props;

    useEffect(()=>{
        if(currentGuess===userChoice)
        {
            onGameOver(rounds);
        }
    },[currentGuess,currentGuess,userChoice]);

    const nextGuessHandler=direction=>{

        if((direction==='lower' && currentGuess<props.userChoice) 
            || (direction==='greater'&& currentGuess>props.userChoice))
        {
            Alert.alert('༼ つ ◕_◕ ༽つ Don\'t Lie','\nಠ_ಠ  You know that this is wrong...',[{text:'Sorry',style:'cancel'}]);  
            return;
        }    
        if(direction=='lower')
        {
            currentHigh.current=currentGuess;
        }
        else if(direction==='greater')
        {
            currentLow.current=currentGuess+1;
        }
        const nextNumer=generateRandomBetween(currentLow.current,currentHigh.current,currentGuess);
        setCurrentGuess(nextNumer);
        setRounds((currRounds)=>currRounds+1);
    };

    return(
        <View style={styles.screen}>
            <TitleText>Opponent's Guess</TitleText>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card styles={styles.buttonContainer}>
                <MainButton onPress={nextGuessHandler.bind(null,'lower')}>
                    <Ionicons name="md-remove" size={24} color='black' />
                </MainButton>
                <MainButton onPress={nextGuessHandler.bind(null,'greater')}>
                    <Ionicons name="md-add" size={24} color="black" />
                </MainButton>
            </Card>
        </View>
    );
};

const styles=StyleSheet.create({
    screen:{
        flex:1,
        padding:10,
        alignItems:'center'
    },
    buttonContainer:{
        flexDirection:'row',
        justifyContent:'space-around',
        marginTop:20,
        width:300,
        maxWidth:'80%'
    }
});


export default GameScreen;