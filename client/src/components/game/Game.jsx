import React from "react";
import { connection } from "../../scripts/webrtc/webrtc";
import { gamedata } from "../../scripts/logic/gamedata";

import Box from "@material-ui/core/Box/Box";
import SetName from "./SetName";
import MainGame from "./MainGame";
import PlayArea from "./playarea/PlayArea";

export class Game extends React.Component {
  constructor(props) {
    super(props);

    this.handleStartup = this.handleStartup.bind(this);

    const state = {
      connected: gamedata.started,
      need_name: gamedata.need_name()
    };

    if (!state.connected) {
      if (connection.is_host === true) {
        state.reason = "Still setting up";
      } else if (connection.is_host === false) {
        state.reason = "Still connecting to host";
      } else {
        state.reason = "Join or host a game first!";
      }
    }

    this.state = state;
  }

  componentDidMount() {
    gamedata.addEventListener("startup-event", this.handleStartup);
  }

  componentWillUnmount() {
    gamedata.removeEventListener("startup-event", this.handleStartup);
  }

  handleStartup(_event) {
    const state = {
      connected: gamedata.started,
      need_name: gamedata.need_name()
    };

    if (!state.connected) {
      if (connection.is_host === true) {
        state.reason = "Still setting up";
      } else if (connection.is_host === false) {
        state.reason = "Still connecting to host";
      } else {
        state.reason = "Join or host a game first!";
      }
    }

    this.setState(state);
  }

  render() {
    if (!this.state.connected) {
      return <Box p={3}>{this.state.reason}</Box>;
    } else if (this.state.need_name) {
      return <Box p={3}><SetName /></Box>;
    } else {
      return <MainGame/>;
    }
  }

  // render() {
  //   return (
  //     <PlayArea />
  //   )
  // }
}

export default Game;
