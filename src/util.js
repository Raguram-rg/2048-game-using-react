import { useEffect } from "react";

export const useEvent = (event, handler, checkIfWon ,checkIfGameOver, setGameOver) => {
  useEffect(() => {
    // initiate the event handler
    window.addEventListener(event, handler)
    checkIfWon();

    let gameover = checkIfGameOver
    if(gameover)
         setGameOver(gameover)

    // this will clean up the event every time the component is re-rendered
    return function cleanup() {
      window.removeEventListener(event, handler);
    };
  });
};