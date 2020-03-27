import React from "react";
import Box from "@material-ui/core/Box/Box";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { gamedata } from "../../../scripts/logic/gamedata";

import Piles from "./Piles";
import PileForm from "./PileForm";

const useStyles = makeStyles(theme => ({
  mainPlay: {
    zIndex: 2
  },
  opaque: {
    opacity: 0.0,
    backgroundColor: theme.palette.grey[300]
  },
  center: {
    width: "100%",
    display: "flex"
    // textAlign: "justify",
    // zIndex: 3,

    // justifyContent: "center",
    // alignItems: "center",
  }
}));

function BoxedMainPlayArea(props) {
  const classes = useStyles();
  return (
    <Box
      p={3}
      className={clsx({ [classes.opaque]: props.isOpaque }, classes.mainPlay)}
    >
      <Piles piles={props.piles} />
    </Box>
  );
}

function BoxedPileForm(props) {
  const classes = useStyles();
  return (
    <Box p={3} className={classes.center}>
      <PileForm {...props} />
    </Box>
  );
}

export default class PlayArea extends React.Component {
  constructor(props) {
    super(props);

    this.handleNewPile = this.handleNewPile.bind(this);
    this.pileFormChange = this.pileFormChange.bind(this);
    this.cardSetChange = this.cardSetChange.bind(this);

    this.state = {
      piles: gamedata.state.piles,
      pileFormOpen: false,
      cardSet: null
    };
  }

  componentDidMount() {
    gamedata.addEventListener("new-pile", this.handleNewPile);
    gamedata.addEventListener("pile-form-change", this.pileFormChange);
    gamedata.addEventListener("card-set-change", this.cardSetChange);
  }

  componentWillUnmount() {
    gamedata.removeEventListener("new-pile", this.handleNewPile);
    gamedata.removeEventListener("pile-form-change", this.pileFormChange);
    gamedata.removeEventListener("card-set-change", this.cardSetChange);
  }

  pileFormChange(event) {
    this.setState({
      pileFormOpen: event.open
    });
  }

  handleNewPile() {
    this.setState({
      piles: gamedata.state.piles
    });
  }

  cardSetChange() {
    this.setState({
      cardSet: gamedata.cardSet
    });
  }

  render() {
    return (
      <div>
        {this.state.pileFormOpen && (
          <BoxedPileForm cardSet={this.state.cardSet}></BoxedPileForm>
        )}
        <BoxedMainPlayArea
          isOpaque={this.state.pileFormOpen}
          piles={this.state.piles}
          cardSet={this.state.cardSet}
        />
      </div>
    );
  }
}
