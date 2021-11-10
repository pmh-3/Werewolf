import React, { useEffect, useState } from "react";


export default function SocketIO_EX() {
  const [response, setResponse] = useState("init");

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("FromAPI", data => {
      setResponse(data);
    });

    //CLEAN UP THE EFFECT
    return () => socket.disconnect();

  }, []);

  return (
    <p>
      It's <time dateTime={response}>{response}</time>
    </p>
  );
}
