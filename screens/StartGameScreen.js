import React, { useState } from 'react';
import { Alert, Button, Keyboard, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import Card from '../components/Card';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
import colors from '../constants/Colors';
const StartGameScreen=props=>{

    const [enteredValue,setEnteredValue]=useState('10');
    const [confirmed,setConfirmed]=useState(false);
    const [selectedNumber,setSelectedNumber]=useState();
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
            Alert.alert('Invalid Input!','Number has to be between [1-99].',[{text:'Okay',style:'destructive',onPress:resetInputHandler}])
            return;
        }
        setConfirmed(true);
        setSelectedNumber(chosenNumber);
        setEnteredValue('');
        Keyboard.dismiss();
    };
    
    let confirmedOutput=null;
    if(confirmed)
    {
        confirmedOutput=(
            <Card styles={styles.summaryContainer}>
                <Text>You Selected</Text>
                <NumberContainer>
                    {selectedNumber}
                </NumberContainer>
                <Button title="START GAME" onPress={props.onStartGame.bind(null,selectedNumber)}/>
            </Card>
        );
    }

    return(
        <TouchableWithoutFeedback onPress={()=>{Keyboard.dismiss();}}>
            <View style={styles.screen}>
                <Text style={styles.title}>Start a New Game!</Text>
                <Card styles={styles.inputContainer}>
                    <Text style={styles.text}>Select a Number</Text>
                    <Input styles={styles.input} 
                        blurOnSubmit autoCapitalize='none' autoCorrect={false} 
                        keyboardType='number-pad' maxLength={2}
                        onChangeText={numberInputHandler}
                        value={enteredValue}    
                    />
                    
                    <View style={styles.buttonContainer}>
                        <View style={styles.button}>
                            <Button title="Reset" 
                                color={colors.accent}
                                onPress={resetInputHandler}
                            />
                        </View>
                        <View style={styles.button}>
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
    );
};

const styles=StyleSheet.create({
    screen:{
        flex:1,
        alignItems:'center'
    },
    title:{
        fontSize:20,
        marginVertical:10,
        fontFamily:'open-sans-bold'
    },
    inputContainer:{
        width:300,
        maxWidth:'80%',
        alignItems:'center',
    },
    buttonContainer:{
        flexDirection:'row',
        width:"100%",
        justifyContent:"space-between", 
        paddingHorizontal:15
    },
    button:{
        width:100
    },
    input:{
        width:50,
        textAlign:'center',
    },
    summaryContainer:{
        marginTop:20,
        alignItems:'center'
    },
    text:{
        fontFamily:'open-sans',
    },  
});

export default StartGameScreen;