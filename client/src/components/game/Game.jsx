import React from "react";
import Button from "@material-ui/core/Button/Button";
import { sendMessage } from "../../scripts/webrtc/message";

function Game() {
  function send(_event) {
    console.log("send");
    sendMessage({
      hello: "world"
    });
  }
  return (
    <Button variant="contained" color="primary" onClick={send}>
      Send a message
    </Button>
  );
}

export default Game;
