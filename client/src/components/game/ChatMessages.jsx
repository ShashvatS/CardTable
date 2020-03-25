import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box/Box";
import { gamedata } from "../../scripts/logic/gamedata";
import ListItem from "@material-ui/core/ListItem/ListItem";
import clsx from "clsx";

const useStyles = makeStyles(theme => ({
  container: {
    width: "100%",
    overflow: "auto"
  },
  chatMessage: {
    maxWidth: "80%",
    overflow: "wrap",
    borderRadius: 16,
    verticalAlign: "middle",
    justifyContent: "center",
    fY9nCskuPpBontSize: "0.8125rem",
    padding: 6,
    backgroundColor: theme.palette.grey[300],
    float: "left"
  },
  isAuthor: {
    float: "right",
    color: theme.palette.common.white,
    backgroundColor: theme.palette.primary.main
  },
  authorLabel: {
    fontSize: "0.4rem"
  },
  authorLabelIsAuthor: {
    float: "right"
  }
}));

function ChatMessage(props) {
  const classes = useStyles();
  const message = props.message;

  return (
    <div className={classes.container}>
      <div
        className={clsx(classes.chatMessage, {
          [classes.isAuthor]: message.is_author
        })}
      >
        {message.author}: {message.message}
      </div>
    </div>
  );
}

export default class ChatMessages extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: gamedata.chatMessages
    };

    this.onchatmessage = this.onchatmessage.bind(this);
  }

  onchatmessage() {
    this.setState({
      messages: gamedata.chatMessages
    });
  }

  componentDidMount() {
    gamedata.addEventListener("chat-message", this.onchatmessage);
  }

  componentWillUnmount() {
    gamedata.removeEventListener("chat-message", this.onchatmessage);
  }

  render() {
    return (
      <Box p={1}>
        <div>
          {this.state.messages.map((message, index) => (
            <ListItem key={index}>
              <ChatMessage message={message} />
            </ListItem>
          ))}
        </div>
      </Box>
    );
  }
}
