import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from './components/Header';
import GameOverScreen from './screens/GameOverScreen';
import GameScreen from './screens/GameScreen';
import StartGameScreen from './screens/StartGameScreen';

export default function App() {

  [userNumber,setUserNumber]=useState();
  [guessRounds,setGuessRounds]=useState();


  const startGameHandler=(selectedNumber)=>{
    setUserNumber(selectedNumber);
    setGuessRounds(0);
  }

  const gameOverHandler=numOfRounds=>{
    setGuessRounds(numOfRounds);
  };

  let content=<StartGameScreen onStartGame={startGameHandler}/>
  if(userNumber && guessRounds<=0)
  {
    content=<GameScreen userChoice={userNumber} onGameOver={gameOverHandler}/>
  }
  else if(guessRounds>0)
  {
    content=<GameOverScreen roundsNumber={guessRounds} userNumber={userNumber}/>
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
