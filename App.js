import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from './components/Header';
import GameScreen from './screens/GameScreen';
import StartGameScreen from './screens/StartGameScreen';

export default function App() {

  [userNumber,setUserNumber]=useState();
  
  const startGameHandler=(selectedNumber)=>{
    setUserNumber(selectedNumber);
    console.log(selectedNumber);
  }

  let content=<StartGameScreen onStartGame={startGameHandler}/>
  if(userNumber)
  {
    content=<GameScreen userChoice={userNumber} />
  }
  return (
    <View style={styles.screen}>
        <Header title="Guess a Number" />
        {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen:{
    flex:1,
    alignItems:'center'
  }
});