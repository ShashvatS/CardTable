import React from "react";
import Button from "@material-ui/core/Button/Button";
import { connection } from "../../scripts/webrtc/webrtc";

import { gamedata } from "../../scripts/logic/gamedata";
import { get_client_id, get_socket_id } from "../../scripts/logic/my_id";

export class Game extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);

    this.state = JSON.parse(JSON.stringify(gamedata.state));
  }

  componentDidMount() {
    gamedata.addEventListener("startup-event", this.handleChange);
  }

  componentWillUnmount() {
    gamedata.removeEventListener("startup-event", this.handleChange);
  }

  handleChange(_event) {
    console.log("handle change");
    this.setState(gamedata.state);
  }

  render() {
    console.log(this.state);

    function send(_event) {
      connection.sendMessage({
        hello: "world"
      });
    }

    function setName(_event) {
      connection.sendMessage({
        only_to: "$host",
        startup: {
          request: "set-name?",
          client: get_client_id(),
          socket: get_socket_id(),
          name: "Larry"
        }
      });
    }

    if (this.state.setup) {
      return (
        <Button variant="contained" color="primary" onClick={send}>
          Send a message
        </Button>
      );
    } else if (this.state.need_name) {
      return (
        <Button variant="contained" color="primary" onClick={setName}>
          Set your name
        </Button>
      );
    } else {
      return (
        <div>
          Waiting to connect to the client
        </div>
      )
    }
  }
}

export default Game;
