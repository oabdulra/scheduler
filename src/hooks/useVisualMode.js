import { useState } from "react";

export default function useVisualMode(initial) {

  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  //sets the transition based on what mode is selected
  function transition(mode, replace = false) { 

    setMode(mode);

    if (replace) {
      const newHistory = [...history];
      newHistory.pop();
      setHistory(newHistory);
      
    }
    setHistory(prev => ([...prev, mode]));
    
  
  };

  //reverts to previous mode
  function back() { 


    if (history.length > 1) {
      
      setMode(history[history.length -2]);
      setHistory((prev) => [...prev.slice(0,-1)]);
    } 


  };

  return { mode, transition, back };
}
