import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button/Button";
import Input from "@material-ui/core/Input";
import FileCopyIcon from "@material-ui/icons/FileCopy";

import { CopyToClipboard } from "react-copy-to-clipboard";

import { get_socket_id } from "../scripts/logic/my_id";
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

export default function Host() {
  const classes = useStyles();

  const [code, setCode] = React.useState("");

  async function getCode() {
    let socketId = get_socket_id();
    if (socketId == null) {
      console.log("Socket.io not connected yet");
      return;
    }

    let response = await fetch("/api/host", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        socketId: socketId
      })
    });

    let data = await response.json();

    if (!data || !data.success) {
      notify("error", "Failed to obtain a game code");
    } else {
      setCode(data.gameCode);
      await connection.setup_host();
    }
  }

  //TODO: check that this doesn't notify when browser is unable to copy the code
  function copy() {
    notify("success", "Copied the game code");
  }

  return (
    <React.Fragment>
      <Button
        className={classes.button}
        variant="contained"
        color="secondary"
        onClick={getCode}
      >
        Host
      </Button>

      <div className={classes.makeRight}>
        <div className={classes.gameCode}>Game code:</div>

        <Input
          className={classes.gameCode}
          color="primary"
          readOnly
          inputProps={{ "aria-label": "description" }}
          value={code}
        />

        <CopyToClipboard text={code} onCopy={copy}>
          <Button className={classes.gameCode}>
            <FileCopyIcon />
          </Button>
        </CopyToClipboard>
      </div>
    </React.Fragment>
  );
}
