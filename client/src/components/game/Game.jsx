import React from "react";
import Button from "@material-ui/core/Button/Button";
import { connection } from "../../scripts/webrtc/webrtc";

function Game() {
  function send(_event) {
    connection.sendMessage({
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
