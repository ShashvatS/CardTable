import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button/Button";
import Input from "@material-ui/core/Input";

import { get_is_host } from "../scripts/webrtc/webrtc";
import { connect_to_host, test_send } from "../scripts/webrtc/follower";

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
    if (get_is_host() === true) {
      console.log("Already the host of a game!\n");
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
      console.log("Get host socket id failed");
      console.log(data);
    } else {
      await connect_to_host(data.socket);
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

      <div>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={() => {test_send({
            hello: "world"
          })}}
        >
          Test Message
        </Button>
      </div>
    </React.Fragment>
  );
}
