import React from "react";
import Draggable from "react-draggable";
import Chip from "@material-ui/core/Chip/Chip";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CardPile from "./CardPile";
import { cardSets } from "../../../scripts/gamesets";
import Button from "@material-ui/core/Button/Button";
import { connection } from "../../../scripts/webrtc/webrtc";

const useStyles = makeStyles(theme => ({
  root: {
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

export default function Piles(props) {
  const piles = props.piles;
  const classes = useStyles();

  const [showCards, setShowCards] = React.useState(false);

  function onClick() {
    setShowCards(!showCards);
  }

  function shuffle(index) {
    return () => {
      const data = {
        shuffle: {
          pile: index
        }
      }

      connection.sendMessage(data);
    }
  }

  return (
    <div>
      <Typography variant="h6" noWrap className={classes.pileTitle}>
        Piles:{" "}
      </Typography>
      {piles.map((pile, index) => (
        <Draggable key={index}>
          <div className={classes.root}>
            <div className={classes.pile}>
              <Chip
                color="primary"
                label={pile.name}
                size="medium"
                clickable={true}
                onClick={onClick}
              />
              {showCards && <Button color="primary" onClick={shuffle(index)}>Shuffle</Button>}
              {showCards && <Button color="primary">Show all</Button>}
              {showCards && <Button color="primary">Hide all</Button>}
            </div>
            {props.cardSet != null && showCards && (
              <CardPile
                className={classes.pileCards}
                images={pile.cards.map(
                  i => cardSets[props.cardSet.index].images[i]
                )}
                recordChanges={false}
              />
            )}
          </div>
        </Draggable>
      ))}
    </div>
  );
}
