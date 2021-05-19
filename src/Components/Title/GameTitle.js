import React from 'react';
import styles from './GameTitle.module.css'


const GameTitle = () => {
   return(
     <div className={styles.title}>
        <div style={{transform:"rotate(12deg)",fontWeight:'900',color:'rgb(255, 0, 0)'}}>2&nbsp;</div> 
        <div style={{transform:"rotate(-12deg)",fontWeight:'900',color:'rgb(9, 255, 0)'}}>0&nbsp;</div> 
        <div style={{transform:"rotate(12deg)",fontWeight:'900',color:'rgb(47, 0, 255)'}}>4&nbsp;</div> 
        <div style={{transform:"rotate(-12deg)",fontWeight:'900',color:'rgb(255, 145, 0)'}}>8</div> 
     </div>
   );
}

export default GameTitle;