import React from "react";
import Card from "./Card";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  cardPile: {
    width: 1000,
    whiteSpace: "nowrap",
    overflowX: "auto",
    resize: "horizontal"
  }
}));

export default function CardPile(props) {
  const classes = useStyles();

  const x = index => {
    if (props.recordChanges) {
      return props.makeChange(index);
    } else {
      return null;
    }
  };

  const y = index => {
    if (props.viewState == null) return null;
    else return props.viewState[index];
  };

  return (
    <div className={classes.cardPile}>
      {props.images.map((value, index) => (
        <Card
          viewState={y(index)}
          makeChange={x(index)}
          className={classes.card}
          key={index}
          image={value}
          drag={props.drag}
          flippable={props.flippable}
          recordChanges={props.recordChanges}
          selectable={props.selectable}
        />
      ))}
    </div>
  );
}
