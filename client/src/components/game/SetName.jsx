import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button/Button";
import Input from "@material-ui/core/Input";

import { connection } from "../../scripts/webrtc/webrtc";
import { notify } from "../NotificationSystem";
import { gamedata } from "../../scripts/logic/gamedata";
import { get_client_id } from "../../scripts/logic/my_id";

const useStyles = makeStyles(theme => ({
  element: {
    display: "inline-block"
  }
}));

export default function Join() {
  const classes = useStyles();

  const [name, setName] = React.useState("");

  function textFieldChange(event) {
    setName(event.target.value);
  }

  function setname() {
    if (name == "") {
      notify("warning", "Cannot have empty name");
      return;
    }
    if (gamedata.state.name2client[name] != null) {
      notify("warning", "This name is already taken");
      return;
    }

    connection.sendMessage({
      set_name: {
        client: get_client_id(),
        name: name
      }
    });
  }

  function onKeyPress(event) {
    if (event.key === "Enter") {
      setname();
    }
  }

  return (
    <React.Fragment>
      <div className={classes.element}>First, enter a screenname: </div>
      <Input
        className={classes.element}
        color="primary"
        inputProps={{ "aria-label": "description" }}
        onChange={textFieldChange}
        onKeyPress={onKeyPress}
      />

      <Button
        className={classes.element}
        variant="contained"
        color="primary"
        onClick={setname}
      >
        Set Name
      </Button>
    </React.Fragment>
  );
}
