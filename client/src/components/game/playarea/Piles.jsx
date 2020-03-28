import React from "react";
import Draggable from "react-draggable";
import Chip from "@material-ui/core/Chip/Chip";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CardPile from "./CardPile";
import { cardSets } from "../../../scripts/gamesets";
import Button from "@material-ui/core/Button/Button";
import { connection } from "../../../scripts/webrtc/webrtc";
import LockIcon from "@material-ui/icons/Lock";
import LockOpenIcon from "@material-ui/icons/LockOpen";

import { Droppable } from "react-drag-and-drop";

const useStyles = makeStyles(theme => ({
  root: {
    // position: "relative",
    position: "absolute",
    whiteSpace: "nowrap"
  },
  pile: {
    // float: "right"
    display: "inline-block"
  },
  pileTitle: {
    display: "inline"
  },
  pileCards: {
    display: "inline-block"
  }
}));

function Pile(props) {
  const [showCards, setShowCards] = React.useState(false);

  function onClick() {
    setShowCards(!showCards);
  }

  const classes = useStyles();

  let properCardset = true;
  if (props.cardSet == null || props.cardSet.index === -1) {
    properCardset = false;
  }

  const [viewState, setViewState] = React.useState({});

  const [disableDrag, setDisableDrag] = React.useState(false);

  function updateViewState(i) {
    return value => {
      setViewState(prev => {
        let cur = {
          ...prev,
          [i]: value
        };

        return cur;
      });
    };
  }

  function setAll(value) {
    return () => {
      setViewState(prev => {
        let newState = {};
        Object.keys(prev).forEach(v => (newState[v] = value));
        return newState;
      });
    };
  }

  function shuffle(index) {
    return () => {
      const data = {
        shuffle: {
          pile: index
        }
      };

      connection.sendMessage(data);
      setAll(false)();
    };
  }


  function toggleDisable() {
    setDisableDrag(!disableDrag);
  }

  function onDrop(data) {
    if (data.card == null) return;
    const info = JSON.parse(data.card);
    if (info.pile == null || info.card == null) return;

    const message = {
      moveCard: {
        pileTo: props.index,
        pileFrom: info.pile,
        card: info.card
      }
    };

    connection.sendMessage(message);
  }

  const dataFunc = i => {
    return JSON.stringify({
      pile: props.index,
      card: i
    });
  };

  return (
    <Droppable types={["card"]} onDrop={onDrop}>
      <Draggable key={props.index} disabled={disableDrag}>
        <div className={classes.root}>
          <div className={classes.pile}>
            <Chip
              color="primary"
              label={props.pile.name}
              size="medium"
              clickable={true}
              onClick={onClick}
            />
            {showCards && (
              <Button color="primary" onClick={shuffle(props.index)}>
                Shuffle
              </Button>
            )}
            {showCards && (
              <Button color="primary" onClick={setAll(true)}>
                Show all
              </Button>
            )}
            {showCards && (
              <Button color="primary" onClick={setAll(false)}>
                Hide all
              </Button>
            )}
            {showCards && (
              <Button color="primary" onClick={toggleDisable}>
                {disableDrag && <LockIcon color="primary"></LockIcon>}
                {!disableDrag && <LockOpenIcon color="primary"></LockOpenIcon>}
              </Button>
            )}
          </div>
          {properCardset && showCards && (
            <div>
              <CardPile
                className={classes.pileCards}
                images={props.pile.cards.map(
                  i => cardSets[props.cardSet.index].images[i]
                )}
                recordChanges={true}
                selectable={false}
                flippable={true}
                viewState={viewState}
                makeChange={updateViewState}
                drag={true}
                dataFunc={dataFunc}
              />
            </div>
          )}
          {!properCardset && showCards && <div>Select a card set</div>}
        </div>
      </Draggable>
    </Droppable>
  );
}

export default function Piles(props) {
  const piles = props.piles;
  const classes = useStyles();

  return (
    <div>
      <Typography variant="h6" noWrap className={classes.pileTitle}>
        Piles:{" "}
      </Typography>
      {piles.map((pile, index) => (
        <Pile key={index} pile={pile} index={index} {...props} />
      ))}
    </div>
  );
}
