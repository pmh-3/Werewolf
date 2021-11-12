import React, {useState, useEffect} from 'react';

function Timer({pageDuration}) {
  const [seconds, setSeconds] = useState();

    useEffect(() => {
      if (seconds === undefined && pageDuration !== undefined) {
        // If server timer is 10 seconds, frontend timer will be 8 seconds
        // So "Times Up!" will get 2 seconds to show on screen
        setSeconds(pageDuration - 2);
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