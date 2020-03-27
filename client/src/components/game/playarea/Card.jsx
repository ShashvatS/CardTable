import React from "react";
import { Draggable } from "react-drag-and-drop";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  card: {
    height: 200
  },
  cardContainer: {
    display: "inline-block",
    padding: 5
  }
}));

export default function Card(props) {
  const classes = useStyles();

  return (
    <div className={classes.cardContainer}>
      <Draggable>
        <img className={classes.card} src={props.image} alt={props.image}></img>
      </Draggable>
    </div>
  );
}
