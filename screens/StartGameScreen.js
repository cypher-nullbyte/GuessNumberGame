import React, { useEffect, useState } from 'react';
import { Alert, Button, Dimensions, Keyboard, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import BodyText from '../components/BodyText';
import Card from '../components/Card';
import Input from '../components/Input';
import MainButton from '../components/MainButton';
import NumberContainer from '../components/NumberContainer';
import TitleText from '../components/TitleText';
import colors from '../constants/Colors';
const StartGameScreen=props=>{

    const [enteredValue,setEnteredValue]=useState('');
    const [confirmed,setConfirmed]=useState(false);
    const [selectedNumber,setSelectedNumber]=useState();
    const [buttonWidth,setButtonWidth] =useState(Dimensions.get('window').width/4);
    
    

    const numberInputHandler=(inputText)=>{
        // setEnteredValue(prevVal=>{
        //     return (inputText || prevVal).toString();
        // });
        setEnteredValue(inputText.replace(/[^0-9]/g,''))
    }
    const resetInputHandler=()=>{
        setEnteredValue('');
        setConfirmed(false);
        setSelectedNumber('');
    }

    const confirmInputHandler=()=>{
        const chosenNumber=parseInt(enteredValue);
        if (isNaN(chosenNumber) || chosenNumber<=0 || chosenNumber>99) 
        {
            Alert.alert('ಠ_ಠ Invalid Input!','Number has to be between [1-99].',[{text:'Okay',style:'destructive',onPress:resetInputHandler}])
            return;
        }
        setConfirmed(true);
        setSelectedNumber(chosenNumber);
        setEnteredValue('');
        Keyboard.dismiss();
    };
    
    useEffect(()=>{
        const updateLayout=()=>{
            setButtonWidth(Dimensions.get('window').width/4);
        };  
        Dimensions.addEventListener('change',updateLayout);
        return ()=>{
            Dimensions.removeEventListener('change',updateLayout);
        };
    },[]);


    let confirmedOutput=null;
    if(confirmed)
    {
        confirmedOutput=(
            <Card styles={styles.summaryContainer}>
                <BodyText>You Selected</BodyText>
                <NumberContainer>
                    {selectedNumber}
                </NumberContainer>
                <MainButton  onPress={props.onStartGame.bind(null,selectedNumber)}>START GAME</MainButton>
            </Card>
        );
    }

    return(
        <ScrollView>
            <TouchableWithoutFeedback onPress={()=>{Keyboard.dismiss();}}>
            <View style={styles.screen}>
                <TitleText>Start a New Game!</TitleText>
                <Card styles={styles.inputContainer}>
                    <BodyText>Select a Number</BodyText>
                    <Input styles={styles.input} 
                        blurOnSubmit autoCapitalize='none' autoCorrect={false} 
                        keyboardType='number-pad' maxLength={2}
                        onChangeText={numberInputHandler}
                        value={enteredValue}    
                    />
                    
                    <View style={styles.buttonContainer}>
                        <View style={{width:buttonWidth}}>
                            <Button title="Reset" 
                                color={colors.accent}
                                onPress={resetInputHandler}
                            />
                        </View>
                        <View style={{width:buttonWidth}}>
                            <Button title="Confirm" 
                                color={colors.primary}
                                onPress={confirmInputHandler}
                            />
                        </View>
                    </View>
                </Card>
                {confirmedOutput}
            </View>
        </TouchableWithoutFeedback>
        </ScrollView>
    );
};

const styles=StyleSheet.create({
    screen:{
        flex:1,
        alignItems:'center'
    },
    inputContainer:{
        width:'80%',
        minWidth:280,
        maxWidth:'95%',
        alignItems:'center',
        margin:10
    },
    buttonContainer:{
        flexDirection:'row',
        width:"100%",
        justifyContent:"space-between", 
        paddingHorizontal:15
    },
    // button:{
    //     width:Dimensions.get('window').width/3,
    // },
    input:{
        width:50,
        textAlign:'center',
    },
    summaryContainer:{
        margin:20,
        alignItems:'center',
        
    },
});

export default StartGameScreen;