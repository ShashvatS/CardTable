import React from "react";
import Draggable from "react-draggable";
import Chip from "@material-ui/core/Chip/Chip";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  pile: {
    // float: "right"
  },
  pileTitle: {
    display: "inline"
  }
}));

export default function Piles(props) {
  const piles = props.piles;
  const classes = useStyles();

  return (
    <div>
      <Typography variant="h6" noWrap className={classes.pileTitle}>
        Piles:{" "}
      </Typography>
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
