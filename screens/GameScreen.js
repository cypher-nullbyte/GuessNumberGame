import React, { useEffect, useRef, useState } from 'react';
import {View,StyleSheet, Alert, ScrollView, Dimensions,} from 'react-native';
import Card from '../components/Card';
import {Ionicons} from '@expo/vector-icons';
import NumberContainer from '../components/NumberContainer';
import TitleText from '../components/TitleText';
import MainButton from '../components/MainButton';
import BodyText from '../components/BodyText';

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

const renderListItem=(value,numOfRound)=>(
    <View key={value} style={styles.listItem}>
        <BodyText>#{numOfRound}</BodyText>
        <BodyText>{value}</BodyText>
    </View>
);

const GameScreen=props=>{

    const initalGuess=generateRandomBetween(1,100,props.userChoice);
    const [currentGuess,setCurrentGuess]= useState(initalGuess);
    const [pastGuesses,setPastGuesses]=useState([initalGuess]);
    const [availableDeviceWidth,setAvailableDeviceWidth]=useState(Dimensions.get('window').width);
    const [availableDeviceHeight,setAvailableDeviceHeight]=useState(Dimensions.get('window').height);

    const currentLow=useRef(1);
    const currentHigh=useRef(100);

    useEffect(()=>{
        const updateLayout=()=>{
            setAvailableDeviceHeight(Dimensions.get('window').height);
            setAvailableDeviceWidth(Dimensions.get('window').width);
        };
        Dimensions.addEventListener('change',updateLayout);
        return ()=>{
            Dimensions.removeEventListener('change');
        }
    });

    const {userChoice,onGameOver}=props;
    useEffect(()=>{
        if(currentGuess===userChoice)
        {
            onGameOver(pastGuesses.length);
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
        // setRounds((currRounds)=>currRounds+1);
        setPastGuesses((prevGuesses)=>[nextNumer,...prevGuesses]);
    };
    let listContainerStyle=styles.listContainer;

    if(Dimensions.get('window').width<350)
    {
        listContainerStyle=styles.listContainerBig;
    }
    const styles2={
        controls:{
            flexDirection:'row',
            justifyContent:'space-around',
            width:availableDeviceWidth*0.8,
            alignItems:'center',
        }, 
    };

    if(Dimensions.get('window').height<500)
    {
        return (
        <View style={styles.screen}>
            <TitleText>Opponent's Guess</TitleText>
            <View style={styles2.controls}>
                <MainButton onPress={nextGuessHandler.bind(null,'lower')}>
                    <Ionicons name="md-remove" size={24} color='white' />
                </MainButton>
                <NumberContainer>{currentGuess}</NumberContainer>
                <MainButton onPress={nextGuessHandler.bind(null,'greater')}>
                    <Ionicons name="md-add" size={24} color="white" />
                </MainButton>
            </View>
            <View style={styles.listContainer}>
                <ScrollView contentContainerStyle={styles.list}>
                    {pastGuesses.map((guess,idx)=>renderListItem(guess,idx+1))}
                </ScrollView>
            </View>
        </View>
        );
    }


    return(
        <View style={styles.screen}>
            <TitleText>Opponent's Guess</TitleText>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card styles={styles.buttonContainer}>
                <MainButton onPress={nextGuessHandler.bind(null,'lower')}>
                    <Ionicons name="md-remove" size={24} color='white' />
                </MainButton>
                <MainButton onPress={nextGuessHandler.bind(null,'greater')}>
                    <Ionicons name="md-add" size={24} color="white" />
                </MainButton>
            </Card>
            <View style={styles.listContainer}>
                <ScrollView contentContainerStyle={styles.list}>
                    {pastGuesses.map((guess,idx)=>renderListItem(guess,idx+1))}
                </ScrollView>
            </View>
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
        marginTop:Dimensions.get('window').height>600 ? 20 : 5,
        width:300,
        maxWidth:'90%'
    },
     
    listContainer:{
        flex:1,
        width:Dimensions.get('window').width>350? '60%': '80%',
    }, 
    list:{
        flexGrow:1,
        alignItems:'center',
        justifyContent:'flex-end',
    },  
    listItem:{
        borderColor:'#ccc',
        borderWidth:1,
        padding:15,
        marginVertical:10,
        backgroundColor:'white',
        flexDirection:'row',
        justifyContent:'space-between',
        width:'100%',
    }
});

export default GameScreen;