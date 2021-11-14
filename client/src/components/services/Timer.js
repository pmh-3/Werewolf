import React, {useState, useEffect, useContext} from 'react';

function Timer({pageDuration}) {
  // Set frontend timer duration 
  const [seconds, setSeconds] = useState();


    useEffect(() => {
      // If server timer is 10 seconds, frontend timer will be 9 seconds
      // So "Times Up!" will get 1 seconds to show on screen
      if (seconds === undefined && pageDuration !== undefined) {
        setSeconds(pageDuration - 1);
      }
      if (seconds > 0) {
        setTimeout(() => setSeconds(seconds - 1), 1000);
      } else if (seconds === 0) {
        setSeconds("Times Up!");
      }
    }, [seconds, pageDuration]);

    return (
        <div>
            {seconds}
        </div>
    )
}

export default Timer;