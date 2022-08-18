import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(mode, replace = false) { 

    if (!replace) {
      setHistory(prev => ([...prev, mode]));
    }

    setMode(mode);
  
  };

  function back() { 

    if (history[history.length - 1] === initial) {
      setMode("FIRST");
    } else {
      history.pop();
      setMode(history[history.length - 1]);
    }


  };

  return { mode, transition, back };
}
