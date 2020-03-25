import React from "react";
import Draggable from "react-draggable";
import Chip from "@material-ui/core/Chip/Chip";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  pile: {
    // float: "right"
  }
}));

export default function Piles(props) {
  const piles = props.piles;
  const classes = useStyles();

  return (
    <div className={classes.pileContainer}>
      {/* kind of hacky but whatever... */}
      {piles.map((pile, index) => (
        <Draggable key={index}>
          <Chip
            color="primary"
            label={pile.name}
            size="medium"
            className={classes.pile}
          />
        </Draggable>
      ))}
    </div>
  );
}
