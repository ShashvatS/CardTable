import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button/Button";
import Input from "@material-ui/core/Input";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import useClipboard from "react-use-clipboard";

import { get_socket_id } from "../scripts/socketconnection";
import { setup_host } from "../scripts/webrtc/host";

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
  // const [{}, setCopied] = useClipboard(code);

  const setCopied = useClipboard(code)[1];

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
      console.log("Get gamecode failed");
      console.log(data);
    } else {
      setCode(data.gameCode);
      await setup_host();
    }
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

        <Button className={classes.gameCode} onClick={setCopied}>
          <FileCopyIcon />
        </Button>
      </div>
    </React.Fragment>
  );
}
