import React, {useState, useEffect} from 'react';

function Timer({timesUp}) {
    const [seconds, setSeconds] = useState(500);

    useEffect(() => {
        if (seconds > 0) {
          setTimeout(() => setSeconds(seconds - 1), 1000);
        } else if (seconds === 0) {
          setSeconds("Times Up!");
          timesUp();
        }
    },[seconds, timesUp]);

    return (
        <div>
            {seconds}
        </div>
    )
}

export default Timer;