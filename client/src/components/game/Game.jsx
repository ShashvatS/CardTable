import React from "react";
import Button from "@material-ui/core/Button/Button";
import { connection } from "../../scripts/webrtc/webrtc";

import { gamedata } from "../../scripts/logic/gamedata";

import SetName from "./SetName";

export class Game extends React.Component {
  constructor(props) {
    super(props);

    this.handleStartup = this.handleStartup.bind(this);

    this.state = {
      connected: gamedata.started,
      need_name: gamedata.need_name(),
      hello: "world"
    };
  }

  componentDidMount() {
    gamedata.addEventListener("startup-event", this.handleStartup);
  }

  componentWillUnmount() {
    gamedata.removeEventListener("startup-event", this.handleStartup);
  }

  handleStartup(_event) {
    this.setState({
      connected: gamedata.started,
      need_name: gamedata.need_name()
    });
  }

  render() {
    function send(_event) {
      connection.sendMessage({
        hello: "world"
      });
    }

    if (!this.state.connected) {
      return <div>Waiting to connect to the client</div>;
    } else if (this.state.need_name) {
      return (
        <SetName />
      );
    } else {
      return (
        <Button variant="contained" color="primary" onClick={send}>
          Send a message
        </Button>
      );
    }
  }
}

export default Game;
