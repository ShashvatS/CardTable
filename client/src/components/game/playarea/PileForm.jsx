import React, { useEffect } from "react";
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

  const [cards, setCards] = React.useState({});

  const propsmakeChange = props.makeChange;

  useEffect(() => {
    propsmakeChange(cards);
  }, [cards]);

  if (
    props.cardSet == null ||
    props.cardSet.index == null ||
    props.cardSet.index === -1
  ) {
    return <div>Choose a card set first</div>;
  }

  const cardSet = cardSets[props.cardSet.index];

  function makeChange(i) {
    return value => {
      if (cardSet != null && selectedSubset != -1) {
        const key = cardSet.cardSubsetNums[selectedSubset][i];

        setCards(prev => {
          let newState = {
            ...prev,
            [key]: value
          };

          return newState;
        });
      }
    };
  }

  function changeSelectedSubset(event) {
    setSelectedSubset(event.target.value);
  }

  return (
    <Box p={3}>
      <div>
        Card subset:
        <Select native value={selectedSubset} onChange={changeSelectedSubset}>
          <option value={-1} key={-1} />
          {cardSet.cardSubsetLabels.map((value, index) => (
            <option value={index} key={index}>
              {value}
            </option>
          ))}
        </Select>
      </div>

      <div>
        {selectedSubset !== -1 && (
          <CardPile
            recordChanges={true}
            selectable={true}
            makeChange={makeChange}
            images={cardSet.cardSubsets[selectedSubset]}
          />
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

  const [cards, setCards] = React.useState({});

  function makeChange(i) {
    return value => {
      setCards(prev => {
        return {
          ...prev,
          [i]: value
        };
      });
    };
  }

  function textFieldChange(event) {
    setPileName(event.target.value);
  }

  function closePile() {
    let event = new Event("pile-form-change");
    event.open = false;
    gamedata.dispatchEvent(event);
  }

  function sendPile(pile) {
    if (gamedata.pile_exists(pileName)) {
      notify("warning", "A pile with that name already exists.");
      return;
    } else if (pileName === "") {
      notify("warning", "Cannot have empty pile name.");
      return;
    }

    const data = {
      makePile: {
        client: get_client_id(),
        name: pileName,
        cards: pile
      }
    };

    connection.sendMessage(data);

    setPileName("");
    closePile();
  }

  function makePile() {
    if (
      props.cardSet == null ||
      props.cardSet.index == null ||
      props.cardSet.index === -1
    )
      return;

    let pile = [];

    for (const key1 of Object.keys(cards)) {
      const isInSet = cards[key1];
      for (const key2 of Object.keys(isInSet)) {
        if (isInSet[key2]) {
          pile.push(key2);
        }
      }
    }

    if (!allowDuplicates) {
      pile = [...new Set(pile)];
    }

    sendPile(pile);
  }

  function emptyPile() {
    sendPile([]);
  }

  function completePile() {
    if (
      props.cardSet == null ||
      props.cardSet.index == null ||
      props.cardSet.index === -1
    )
      return;

    const numCards = cardSets[props.cardSet.index].numCards;

    const pile = [];
    for (let i = 0; i < numCards; i += 1) {
      pile.push(i);
    }

    sendPile(pile);
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
          value={pileName}
        />
        <FormControlLabel
          control={<Switch onChange={handleSwitch} color="secondary" />}
          label="Allow duplicates"
        />
        <Button onClick={closePile}>Close</Button>
      </div>

      <div className={classes.buttonRow}>
        <Button color="primary" onClick={completePile}>
          Add all cards
        </Button>
        <Button color="primary" onClick={emptyPile}>
          Empty pile
        </Button>

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
            makeChange={makeChange(index)}
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
