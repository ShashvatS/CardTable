import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Box from "@material-ui/core/Box/Box";
import Input from "@material-ui/core/Input";
import SendIcon from "@material-ui/icons/Send";
import ChatMessages from "./ChatMessages";
import { get_client_id } from "../../scripts/logic/my_id";
import { connection } from "../../scripts/webrtc/webrtc";

const useStyles = makeStyles(theme => ({
  drawer: {
    width: "30%",
    flexShrink: 0
  },
  drawerPaper: {
    width: "30%"
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-start"
  },
  toolbar: theme.mixins.toolbar,
  chatContainer: {
    display: "flex",
    flexDirection: "column",
    height: "100%"
  },
  header: {
    flex: "0 0 auto"
  },
  messages: {
    flex: "1 1 auto",
    overflow: "auto"
  },
  send: {
    flex: "1 0 auto"
  },
  sendBox: {
    display: "flex",
    width: "100%",
    flexDirection: "row"
  },
  sendField: {
    flex: "1 1",
    // display: "inline-block"
    width: "50%"
  },
  sendButton: {
    flex: "0 0",
    // display: "inline-block"
    width: "50%"
  }
}));

export default function Chat(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = props.open;

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [message, setMessage] = React.useState("");

  function textFieldChange(event) {
    setMessage(event.target.value);
  }

  function sendMessage() {
    const data = {
      chatMessage: {
        author: get_client_id(),
        message: message
      }
    };

    setMessage("");

    connection.sendMessage(data);
  }

  function onKeyPress(event) {
    if (event.key === "Enter") {
      sendMessage();
    }
  }

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="right"
      open={open}
      classes={{
        paper: classes.drawerPaper
      }}
    >
      <div className={classes.chatContainer}>
        <div className={clsx(classes.toolbar, classes.header)} />

        <div className={clsx(classes.drawerHeader, classes.header)}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
          Game Chat
        </div>
        <Divider />
        <div className={classes.messages}>
          <ChatMessages />
        </div>
        <div className={classes.send}>
          <Box p={1} className={classes.sendBox}>
            <Input
              color="primary"
              inputProps={{ "aria-label": "description" }}
              onChange={textFieldChange}
              onKeyPress={onKeyPress}
              className={classes.sendField}
              value={message}
            />

            <IconButton className={classes.sendButton} onClick={sendMessage}>
              <SendIcon />
            </IconButton>
          </Box>
        </div>
      </div>
    </Drawer>
  );
}
