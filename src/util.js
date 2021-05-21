import { useEffect } from "react";

export const useEvent = (event, handler, checkIfWon) => {
  useEffect(() => {
    // initiate the event handler
    window.addEventListener(event, handler)
    checkIfWon();

    // this will clean up the event every time the component is re-rendered
    return function cleanup() {
      window.removeEventListener(event, handler);
    };
  });
};