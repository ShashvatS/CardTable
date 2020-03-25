import React from "react";
import Button from "@material-ui/core/Button/Button";
import Input from "@material-ui/core/Input";

import { connection } from "../../../scripts/webrtc/webrtc";
import { get_client_id } from "../../../scripts/logic/my_id";
import { gamedata } from "../../../scripts/logic/gamedata";
import { notify } from "../../NotificationSystem";

export default function PileForm(props) {
  console.log(props);
  const [pileName, setPileName] = React.useState("");

  function textFieldChange(event) {
    setPileName(event.target.value);
  }

  function makePile() {
    if (gamedata.pile_exists(pileName)) {
      notify("warning", "A pile with that name already exists.");
      return;
    }
    const data = {
      makePile: {
        client: get_client_id(),
        name: pileName
      }
    };

    connection.sendMessage(data);

    setPileName("");
    let event = new Event("pile-form-change");
    event.open = false;
    gamedata.dispatchEvent(event);
  }

  function onKeyPress(event) {
    if (event.key === "Enter") {
      makePile();
    }
  }

  return (
    <div>
      <Input
        color="primary"
        inputProps={{ "aria-label": "description" }}
        onChange={textFieldChange}
        onKeyPress={onKeyPress}
        value={pileName}
      />

      <Button color="primary" onClick={makePile}>
        Make pile!
      </Button>
    </div>
  );
}
