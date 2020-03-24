import React from "react";
import { connection } from "../../scripts/webrtc/webrtc";

import { gamedata } from "../../scripts/logic/gamedata";

import SetName from "./SetName";
import MainGame from "./MainGame";

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
      return <div>{this.state.reason}</div>;
    } else if (this.state.need_name) {
      return <SetName />;
    } else {
      return (
        <MainGame />
      );
    }
  }

}

export default Game;
