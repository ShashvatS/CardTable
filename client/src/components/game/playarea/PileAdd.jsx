import React from "react";
import Fab from "@material-ui/core/Fab/Fab";

import AddIcon from "@material-ui/icons/Add";
import { gamedata } from "../../../scripts/logic/gamedata";

export default function PileAdd() {

  function pileWindowButton() {
    let event = new Event("pile-form-change");
    event.open = true;
    gamedata.dispatchEvent(event);
  }

  return (
    <Fab variant="extended" color="primary" aria-label="add" onClick={pileWindowButton}>
      <AddIcon />
      Make pile
    </Fab>
  );
}
