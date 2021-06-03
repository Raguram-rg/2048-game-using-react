import React, { useEffect, useState } from 'react';
import './App.css';
import Block from './Components/Block/Block.js';
import cloneDeep from "lodash.clonedeep";
import {useEvent} from "./util.js";
import GameTitle from './Components/Title/GameTitle.js'
import Scores from './Components/Scores/Scores.js'
import { Gameover, Gamewon } from './Components/GameStatus/Status'
import { useSwipeable } from 'react-swipeable';


function App() {

  const UP_ARROW = 38;
  const DOWN_ARROW = 40;
  const LEFT_ARROW = 37; 
  const RIGHT_ARROW = 39;

  const [data,setData] = useState([
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
  ])

  const [scores,setScores]=useState(0);
  const [best,setBest] = useState(0);

  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [continueGame, setContinueGame] = useState(false);

  var score = scores;

  const handlers = useSwipeable({
    onSwipedLeft: () => swipeLeft(),
    onSwipedRight: () => swipeRight(),
    onSwipedUp: () => swipeUp(),
    onSwipedDown: () => swipeDown(),
    preventDefaultTouchmoveEvent: true,
    trackTouch: true,
    trackMouse:true
 })


  useEffect(() =>{
    
    const saveLocalGrid = () => {
      if(localStorage.getItem("datas") === null)
      {
        let dup = cloneDeep(data);
        addNumber(dup)
        addNumber(dup)
        setData(dup)

      
        localStorage.setItem('datas',JSON.stringify(data))
        localStorage.setItem('scores',JSON.stringify(0))
        localStorage.setItem('best',JSON.stringify(0))
        localStorage.setItem('continuegame',JSON.stringify(false))
        localStorage.setItem('gameover',JSON.stringify(false))
      }
      else
      {
        let localDatas = JSON.parse(localStorage.getItem('datas'))
        let localScores = JSON.parse(localStorage.getItem('scores'))
        let initalBest = JSON.parse(localStorage.getItem('best'))
        let localContinueGame = JSON.parse(localStorage.getItem('continuegame'))
        let localGameOver = JSON.parse(localStorage.getItem('gameover'))

        setData(localDatas)
        setScores(localScores)
        setBest(initalBest)
        setContinueGame(localContinueGame)
        setGameOver(localGameOver)
      }
    }
    saveLocalGrid();
  },[])

  useEffect(() =>{
    const getLocalGrid = () => {  

        localStorage.setItem('datas',JSON.stringify(data))
        localStorage.setItem('scores',JSON.stringify(scores))
        localStorage.setItem('best',JSON.stringify(best))
        localStorage.setItem('continuegame',JSON.stringify(continueGame))
        localStorage.setItem('gameover',JSON.stringify(gameOver))

    };
    getLocalGrid();
  },[data])

  // left arrow key
   const swipeLeft = (check) => {
    let oldGrid = data;
    let newGrid = cloneDeep(data);

    if(!gameWon){
      for (let i = 0; i < 4; i++) {
        let b = newGrid[i];
        let slow = 0;
        let fast = 1;
        while (slow < 4) {
          if (fast === 4) {
            fast = slow + 1;
            slow++;
            continue;
          }
          if (b[slow] === 0 && b[fast] === 0) {
            fast++;
          } else if (b[slow] === 0 && b[fast] !== 0) {
            b[slow] = b[fast];
            b[fast] = 0;
            fast++;
          } else if (b[slow] !== 0 && b[fast] === 0) {
            fast++;
          } else if (b[slow] !== 0 && b[fast] !== 0) {
            if (b[slow] === b[fast]) {
              b[slow] = b[slow] + b[fast];
              score += b[slow];
              b[fast] = 0;
              slow++;
              fast = slow + 1;
            } else {
              slow++;
              fast = slow + 1;
            }
          }
        }
      }
      return setGrid(oldGrid, newGrid, check)
    }
  };

  //right arrow key
  const swipeRight = (check) => {
    let oldGrid = data;
    let newGrid = cloneDeep(data);

    if(!gameWon){      
     for (let i = 3; i >= 0; i--) {
       let b = newGrid[i];
       let slow = b.length - 1;
       let fast = slow - 1;
       while (slow > 0) {
        if (fast === -1) {
          fast = slow - 1;
          slow--;
          continue;
        }
        if (b[slow] === 0 && b[fast] === 0) {
          fast--;
        } else if (b[slow] === 0 && b[fast] !== 0) {
          b[slow] = b[fast];
          b[fast] = 0;
          fast--;
        } else if (b[slow] !== 0 && b[fast] === 0) {
          fast--;
        } else if (b[slow] !== 0 && b[fast] !== 0) {
          if (b[slow] === b[fast]) {
            b[slow] = b[slow] + b[fast];
            score += b[slow];
            b[fast] = 0;
            slow--;
            fast = slow - 1;
          } else {
            slow--;
            fast = slow - 1;
          }
        }
      }
     }
     return setGrid(oldGrid, newGrid, check)
    }
  };

  //down arrow key
  const swipeDown = (check) => {
    let b = cloneDeep(data);
    let oldData = JSON.parse(JSON.stringify(data));

    if(!gameWon){
      for (let i = 3; i >= 0; i--) {
        let slow = b.length - 1;
        let fast = slow - 1;
        while (slow > 0) {
          if (fast === -1) {
            fast = slow - 1;
            slow--;
            continue;
          }
          if (b[slow][i] === 0 && b[fast][i] === 0) {
            fast--;
          } else if (b[slow][i] === 0 && b[fast][i] !== 0) {
            b[slow][i] = b[fast][i];
            b[fast][i] = 0;
            fast--;
          } else if (b[slow][i] !== 0 && b[fast][i] === 0) {
            fast--;
          } else if (b[slow][i] !== 0 && b[fast][i] !== 0) {
            if (b[slow][i] === b[fast][i]) {
              b[slow][i] = b[slow][i] + b[fast][i];
              score += b[slow][i];
              b[fast][i] = 0;
              slow--;
              fast = slow - 1;
            } else {
              slow--;
              fast = slow - 1;
            }
          }
        }
      }
      return setGrid(oldData, b, check)
    }
  };

  //upper arrow key
  const swipeUp = (check) => {
    let b = cloneDeep(data);
    let oldGrid = JSON.parse(JSON.stringify(data));

    if(!gameWon){
      for (let i = 0; i < 4; i++) {
        let slow = 0;
        let fast = 1;
        while (slow < 4) {
          if (fast === 4) {
            fast = slow + 1;
            slow++;
            continue;
          }
          if (b[slow][i] === 0 && b[fast][i] === 0) {
            fast++;
          } else if (b[slow][i] === 0 && b[fast][i] !== 0) {
            b[slow][i] = b[fast][i];
            b[fast][i] = 0;
            fast++;
          } else if (b[slow][i] !== 0 && b[fast][i] === 0) {
            fast++;
          } else if (b[slow][i] !== 0 && b[fast][i] !== 0) {
            if (b[slow][i] === b[fast][i]) {
              b[slow][i] = b[slow][i] + b[fast][i];
              score += b[slow][i];
              b[fast][i] = 0;
              slow++;
              fast = slow + 1;
            } else {
              slow++;
              fast = slow + 1;
            }
          }
        }
      }
      return setGrid(oldGrid, b, check)
    }
  };

  const setGrid = (oldGrid, newGrid, check) => {
    if (JSON.stringify(oldGrid) !== JSON.stringify(newGrid)) {
      addNumber(newGrid);
      if (!check){
        setScores(score);
        if(score > best)
          setBest(score)
      }
    }
    if (check) {
      return newGrid;
    } else {
      setData(newGrid);
    }
  }

  //handling arrow keys
  const handleKeyDown = (event) => {
    switch (event.keyCode) {
      case UP_ARROW:
        swipeUp();
        break;

      case DOWN_ARROW:
        swipeDown();
        break;

      case LEFT_ARROW:
        swipeLeft();
        break;

      case RIGHT_ARROW:
        swipeRight();
        break;

      default:
        break;
      }

      let gameover = checkIfGameOver()
      if(gameover)
           setGameOver(gameover)
  };

  const checkIfWon = () => {

    if(!continueGame){
      let row = data.findIndex(row => row.find(num => num === 2048));
      if(row > -1)
       setGameWon(true)
    }
  };


  const checkIfGameOver = () => {
    let checker = swipeLeft(true);

    if (JSON.stringify(data) !== JSON.stringify(checker)) {
      return false;
    }

    let checker2 = swipeDown(true);
   
    if (JSON.stringify(data) !== JSON.stringify(checker2)) {
      return false;
    }

    let checker3 = swipeRight(true);

    if (JSON.stringify(data) !== JSON.stringify(checker3)) {
      return false;
    }
    let checker4 = swipeUp(true);

    if (JSON.stringify(data) !== JSON.stringify(checker4)) {
      return false;
    }
    return true; 
  };
  
  useEvent("keydown", handleKeyDown, checkIfWon);

  //adding numbers randomly
  const addNumber = (newGrid) => {
    let added = false;
    
    while (!added) {

      let rand1 = Math.floor(Math.random() * 4);
      let rand2 = Math.floor(Math.random() * 4);

      if (newGrid[rand1][rand2] === 0) {
        newGrid[rand1][rand2] = Math.random() > 0.5 ? 2 : 4;
        added = true;
      }
    }
  };

  const resetGame = () =>{
    let newGrid = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]

    setScores(0)
    setGameOver(false)
    setGameWon(false)
    setContinueGame(false)

    addNumber(newGrid)
    addNumber(newGrid)

    setData(newGrid)

  };

  return (
    <div className="game"> 
      <GameTitle />
      <Scores scores={scores} best={best} />
      <div style={{marginTop:'13px'}}> 
        <button onClick={resetGame} className="newgamebtn">New Game</button>
      </div>
      <div {...handlers} className="grid">
        {gameOver && <Gameover scores={scores}
                      resetGame={resetGame} />}
        {gameWon && <Gamewon scores={scores}
                     continueGame={continueGame} 
                     resetGame={resetGame}
                     setGameWon={setGameWon}
                     setContinueGame={setContinueGame} />}
        {data.map((row, index1) => {
            return(
               <div style={{display:'flex'}} key={index1}>
                  {row.map((digit, index2) => (
                       <Block digit={digit} key={index2} gameOver={gameOver} gameWon={gameWon} />
                  ))}
               </div>
            )
        })}
      </div>
    </div>
  )
}

export default App;
