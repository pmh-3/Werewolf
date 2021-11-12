import React, {useState, useEffect} from 'react';

function Timer({pageDuration}) {
  
  const [seconds, setSeconds] = useState(pageDuration);
  console.log("$$$$$" + seconds);

    useEffect(() => {
      console.log("$$" + seconds);
        if (seconds > 0) {
          setTimeout(() => setSeconds(seconds - 1), 1000);
        } else if (seconds === 0) {
          setSeconds("Times Up!");
        }
    }, [seconds]);

    return (
        <div>
            {seconds}
        </div>
    )
}

export default Timer;