import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button/Button";
import Input from "@material-ui/core/Input";

import { connection } from "../scripts/webrtc/webrtc";
import { notify } from "./NotificationSystem";

const useStyles = makeStyles(theme => ({
  button: {
    display: "inline-block"
  },
  gameCode: {
    display: "inline-block"
  },
  makeRight: {
    float: "right"
  }
}));

export default function Join() {
  const classes = useStyles();

  const [gameCode, setGameCode] = React.useState("");

  function textFieldChange(event) {
    setGameCode(event.target.value);
  }

  async function join() {
    if (connection.is_host === true) {
      notify("error", "Already the host of a game!");
      return;
    }

    let response = await fetch("/api/join", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        gameCode: gameCode
      })
    });

    let data = await response.json();

    if (!data || !data.success) {
      notify("error", "Invalid game code");
    } else {
      await connection.connect_to_host(data.socket);
    }
  }

  function onKeyPress(event) {
    if (event.key === "Enter") {
      join();
    }
  }

  return (
    <React.Fragment>
      <div className={classes.gameCode}>Game code:</div>
      <Input
        className={classes.gameCode}
        color="primary"
        inputProps={{ "aria-label": "description" }}
        onChange={textFieldChange}
        onKeyPress={onKeyPress}
      />

      <div className={classes.makeRight}>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={join}
        >
          Join
        </Button>
      </div>
    </React.Fragment>
  );
}
