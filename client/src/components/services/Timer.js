import React, {useState, useEffect} from 'react';

function Timer({pageDuration}) {
  const aduration = 8
  const [seconds, setSeconds] = useState(aduration);

    useEffect(() => {
      console.log(aduration);
        if (seconds > 0) {
          setTimeout(() => setSeconds(seconds - 1), 1000);
          console.log(seconds);
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