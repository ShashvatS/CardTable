import React from "react";
import Box from "@material-ui/core/Box/Box";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { gamedata } from "../../../scripts/logic/gamedata";
import shuffle from "../../../scripts/shuffle";

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
  }
}));

function BoxedMainPlayArea(props) {
  const classes = useStyles();
  return (
    <Box
      p={3}
      className={clsx({ [classes.opaque]: props.isOpaque }, classes.mainPlay)}
    >
      <Piles cardSet={props.cardSet} piles={props.piles} />
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
    this.shuffle = this.shuffle.bind(this);

    this.state = {
      piles: gamedata.state.piles,
      pileFormOpen: false,
      cardSet: null
    };
  }

  componentDidMount() {
    gamedata.addEventListener("new-pile", this.handleNewPile);
    gamedata.addEventListener("startup-event", this.handleNewPile);
    gamedata.addEventListener("pile-form-change", this.pileFormChange);
    gamedata.addEventListener("card-set-change", this.cardSetChange);
    gamedata.addEventListener("shuffle", this.shuffle);
  }

  componentWillUnmount() {
    gamedata.removeEventListener("new-pile", this.handleNewPile);
    gamedata.removeEventListener("startup-event", this.handleNewPile);
    gamedata.removeEventListener("pile-form-change", this.pileFormChange);
    gamedata.removeEventListener("card-set-change", this.cardSetChange);
    gamedata.removeEventListener("shuffle", this.shuffle);
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

  shuffle(event) {
    let pile = event.pile;

    gamedata.state.piles[pile].cards = shuffle(gamedata.state.piles[pile].cards);
    this.setState({
      piles: gamedata.state.piles
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
