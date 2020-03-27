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

  const x = (value) => {
      if (props.recordChanges) {
          return props.makeChange(value);
      } else {
          return null;
      }
  };

  return (
    <div className={classes.cardPile}>
      {props.images.map((value, index) => (
        <Card {...props} makeChange={x(value)} className={classes.card} key={index} image={value} />
      ))}
    </div>
  );
}
