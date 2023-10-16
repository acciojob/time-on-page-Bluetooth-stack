
import React, { useEffect, useState } from "react";
import './../styles/App.css';

const App = () => {
  const [time, setTime] = useState(-1);
  const [isActive, setIsActive] = useState(true);
  const [loadTime, setLoadTime] = useState(Date.now());

  useEffect(()=>{
    let interval;
    interval = setInterval(()=>{
      if(isActive){
        console.log(loadTime, time);
        setTime(Date.now() - loadTime);
      }
    })

    return(()=>{
      clearInterval(interval);
      }
    )
  }, [isActive, loadTime])

  useEffect(()=>{
    function handleDocVisibility(){
      setIsActive(!document.hidden);
      if(!document.hidden){
        setLoadTime(Date.now()-time);
      }
    }

    document.addEventListener('visibilitychange', handleDocVisibility);

    return(()=>{
      document.removeEventListener('visibilitychange', handleDocVisibility);
    })
  })

  return (
    <div>
        {/* Do not remove the main div */}
        <p>You've been on this page for {(time/1000).toFixed(0)} seconds.</p>
    </div>
  )
}

export default App
