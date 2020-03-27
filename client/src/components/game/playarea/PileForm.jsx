import React from "react";
import Button from "@material-ui/core/Button/Button";
import Input from "@material-ui/core/Input";
import Switch from "@material-ui/core/Switch/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import Divider from "@material-ui/core/Divider";
import Select from "@material-ui/core/Select/Select";
import Box from "@material-ui/core/Box/Box";

import { connection } from "../../../scripts/webrtc/webrtc";
import { get_client_id } from "../../../scripts/logic/my_id";
import { gamedata } from "../../../scripts/logic/gamedata";
import { notify } from "../../NotificationSystem";
import { cardSets } from "../../../scripts/gamesets";

import CardPile from "./CardPile";

const useStyles = makeStyles(theme => ({
  buttonRow: {
    display: "flex"
  }
}));

function IndividualSelectPile(props) {
  const [selectedSubset, setSelectedSubset] = React.useState(-1);
  const classes = useStyles();

  if (
    props.cardSet == null ||
    props.cardSet.index == null ||
    props.cardSet.index === -1
  ) {
    return <div>Choose a card set first</div>;
  }

  const cardSet = cardSets[props.cardSet.index];

  function changeSelectedSubset(event) {
    setSelectedSubset(event.target.value);
  }

  return (
    <Box p={3}>
      <div>
        Card subset:
        <Select native value={selectedSubset} onChange={changeSelectedSubset}>
          <option value={-1} key={-1} />
          {cardSet.cardSubSetLabels.map((value, index) => (
            <option value={index} key={index}>
              {value}
            </option>
          ))}
        </Select>
      </div>

      <div>
        {selectedSubset !== -1 && (
          <CardPile images={cardSet.cardSubSets[selectedSubset]} />
        )}
      </div>
    </Box>
  );
}

export default function PileForm(props) {
  const classes = useStyles();

  const [pileName, setPileName] = React.useState("");
  const [allowDuplicates, setAllowDuplicates] = React.useState("");

  const [individualPiles, setIndividualPiles] = React.useState([]);

  function textFieldChange(event) {
    setPileName(event.target.value);
  }

  function closePile() {
    let event = new Event("pile-form-change");
    event.open = false;
    gamedata.dispatchEvent(event);
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
    closePile();
  }

  function onKeyPress(event) {
    if (event.key === "Enter") {
      makePile();
    }
  }

  function handleSwitch(event) {
    setAllowDuplicates(event.target.checked);
  }

  function handleNewIndividualSelectPile() {
    setIndividualPiles(prevPiles => [...prevPiles, {}]);
  }

  return (
    <div>
      <div>
        Pile-name:
        <Input
          color="primary"
          inputProps={{ "aria-label": "description" }}
          onChange={textFieldChange}
          onKeyPress={onKeyPress}
          value={pileName}
        />
        <FormControlLabel
          control={<Switch onChange={handleSwitch} color="secondary" />}
          label="Allow duplicates"
        />
        <Button onClick={closePile}>Close</Button>
      </div>

      <div className={classes.buttonRow}>
        <Button color="primary">Add all cards</Button>
        <Button color="primary">Empty pile</Button>

        <Divider orientation="vertical" flexItem />

        <Button color="primary" onClick={handleNewIndividualSelectPile}>
          <AddIcon />
          Select individual cards
        </Button>
      </div>

      <div>
        {individualPiles.map((value, index) => (
          <IndividualSelectPile
            key={index}
            cardSet={props.cardSet}
            data={value}
          />
        ))}
      </div>

      <div>
        <Button variant="contained" color="primary" onClick={makePile}>
          Make pile!
        </Button>
      </div>
    </div>
  );
}
