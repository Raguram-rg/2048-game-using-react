import styles from './Status.module.css' 

export const Gameover = ({scores, resetGame}) => { 
    return (
          <div className={styles.gameover}>
            <div className={styles.text}>
             <div>Game Over!</div> 
             <div className={styles.smileysad}>:(</div>
             <br/>
             <div style={{fontSize:20}}>Your Score is</div>
               {scores}
             </div>
             <button className={styles.newbtn} onClick={resetGame}>Start Again</button>
          </div>
        );
}

const continueAfterWon = async (continueGame, setGameWon, setContinueGame) => {

  setGameWon(false);
  await setContinueGame(true);
 
};

export const Gamewon = ({scores, continueGame, resetGame, setGameWon, setContinueGame}) => { 
   return (
          <div className={styles.gamewon}>
            <div className={styles.text}>
             <div>You Won</div> 
             <div className={styles.smileyhappy}>:)</div>
             <br/>
             <div style={{fontSize:20}}>Your Score is</div>
               {scores}
            </div>
            <button className={styles.continuebtn} onClick={() => continueAfterWon(continueGame, setGameWon, setContinueGame)}>Keep Going</button>
            <button className={styles.newbtn} onClick={resetGame}>Fresh Game</button>
          </div>
       );
}
