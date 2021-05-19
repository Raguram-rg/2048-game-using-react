import React, { useEffect, useState } from 'react';
import styles from './Block.module.css'


const Block = ({digit,gameOver,gameWon}) => {

    const style = {
        blockStyle: {
            height: 90,
            width: 90,
            margin: 3,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: 36,
            fontWeight: "650",
            borderRadius:8,
            color:"white", 
            maxWidth:540
        }
    }

    const blockColor = (digit) => {
        switch(digit){
            case 2:
                return "#FF9966";
              case 4:
                return "#FFC000";
              case 8:
                return "#AFE313";
              case 16:
                return "#8A496B";
              case 32:
                return "#50BFE6";
              case 64:
                return "#FF8833";
              case 128:
                return "#FF00CC";
              case 256:
                return "#0066FF";
              case 512:
                return "#FF0000";
              case 1024:
                return "#ED0A3F";
              case 2048:
                return "#FFFC00";
              default:
                return "#484848";
        }
    } 

    return(
        <div style={{...style.blockStyle,
        background:blockColor(digit),
        }}>
            <div className={(gameOver || gameWon) ? "" : `${styles.animate}`}>
               {digit !== 0 ? digit:""} 
            </div>
        </div>
    )
}

export default Block;