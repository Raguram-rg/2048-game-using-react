import { useEffect } from "react";

export const useEvent = (event, handler, gameWon, checkIfWon) => {
  useEffect(() => {
    // initiate the event handler
    if(!gameWon){
       window.addEventListener(event, handler);
       checkIfWon()
      }

    // this will clean up the event every time the component is re-rendered
    return function cleanup() {
      window.removeEventListener(event, handler);
    };
  });
};