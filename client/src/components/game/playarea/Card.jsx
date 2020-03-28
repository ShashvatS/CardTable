import React, { useEffect } from "react";
import SvgIcon from "@material-ui/core/SvgIcon";
import { Draggable } from "react-drag-and-drop";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  card: {
    height: 150,
    zIndex: 2,
    display: "block"
  },
  cardContainer: {
    display: "inline-block",
    padding: 5
  },
  icon: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    zIndex: 3
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    height: "100%",
    width: "100%",
    padding: 5
  },
  makeR: {
    position: "relative"
  }
}));

//copied from noticon
const iconStyles = {
  opacity: 0.9,
  fontSize: 20,
  marginRight: 8,
  color: "#43a047"
};

const CheckIcon = props => (
  <SvgIcon {...props}>
    <path
      d="M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2,
        4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,
        0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z"
    />
  </SvgIcon>
);

const successIcon = <CheckIcon style={iconStyles} />;

export default function Card(props) {
  const classes = useStyles();

  const recordChanges = props.recordChanges;

  let flip = props.flippable;
  if (flip == null) {
    flip = false;
  }

  let selectable = props.selectable;
  if (selectable == null) {
    selectable = false;
  }

  const [clicked, setClicked] = React.useState(false);

  let currentState = props.viewState;
  if (currentState == null) currentState = clicked;

  let visible = true;

  if (flip && currentState === false) {
    visible = false;
  }

  let iconVisible = false;
  if (selectable && clicked) {
    iconVisible = true;
  }

  const propsmakeChange = props.makeChange;

  function onClick() {
    setClicked(!clicked);
  }

  useEffect(() => {
    if (recordChanges) {
      propsmakeChange(clicked);
    }
  }, [clicked, recordChanges]);

  let main = (
    <div className={classes.makeR}>
      {visible && (
        <img
          className={classes.card}
          src={props.image}
          alt={props.image}
          onClick={onClick}
        />
      )}
      {iconVisible && (
        <div className={classes.overlay} onClick={onClick}>
          <div className={classes.icon}>{successIcon}</div>
        </div>
      )}
      {!visible && (
        <Button color="primary" onClick={onClick}>
          View card
        </Button>
      )}
    </div>
  );

  if (props.drag === true) {
    return (
      <div className={classes.cardContainer}>
        <Draggable>{main}</Draggable>
      </div>
    );
  } else {
    return <div className={classes.cardContainer}>{main}</div>;
  }
}
