import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { CssBaseline } from "@material-ui/core";
import Box from "@material-ui/core/Box/Box";
import ChatIcon from "@material-ui/icons/Chat";
import Input from "@material-ui/core/Input";
import SendIcon from "@material-ui/icons/Send";
import ChatMessages from "./ChatMessages";
import { get_client_id } from "../../scripts/logic/my_id";
import { connection } from "../../scripts/webrtc/webrtc";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    paddingTop: 0,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: "100%"
  },
  appBarShift: {
    width: "70%",
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginRight: "30%"
  },
  title: {
    flexGrow: 1
  },
  hide: {
    display: "none"
  },
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
  content: {
    flexGrow: 1,
    // padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginRight: "-30%"
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginRight: 0
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

export default function MainGame() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

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
    <div>
      <CssBaseline />
      <div
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar>
          <Typography variant="h6" noWrap className={classes.title}>
            {/* Apparently, without this, the chat button moves to the left... */}
          </Typography>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}
            className={clsx(open && classes.hide)}
          >
            <ChatIcon />
          </IconButton>
        </Toolbar>
      </div>
      {/* <div className={classes.drawerHeader} /> */}
      <div className={classes.root}>
        <CssBaseline />
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open
          })}
        >
          <Box p={3}>
            <Typography paragraph>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Rhoncus dolor purus non enim praesent elementum facilisis leo vel.
              Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit
              gravida rutrum quisque non tellus. Convallis convallis tellus id
              interdum velit laoreet id donec ultrices. Odio morbi quis commodo
              odio aenean sed adipiscing. Amet nisl suscipit adipiscing bibendum
              est ultricies integer quis. Cursus euismod quis viverra nibh cras.
              Metus vulputate eu scelerisque felis imperdiet proin fermentum
              leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt
              lobortis feugiat vivamus at augue. At augue eget arcu dictum
              varius duis at consectetur lorem. Velit sed ullamcorper morbi
              tincidunt. Lorem donec massa sapien faucibus et molestie ac.
            </Typography>
            <Typography paragraph>
              Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
              ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar
              elementum integer enim neque volutpat ac tincidunt. Ornare
              suspendisse sed nisi lacus sed viverra tellus. Purus sit amet
              volutpat consequat mauris. Elementum eu facilisis sed odio morbi.
              Euismod lacinia at quis risus sed vulputate odio. Morbi tincidunt
              ornare massa eget egestas purus viverra accumsan in. In hendrerit
              gravida rutrum quisque non tellus orci ac. Pellentesque nec nam
              aliquam sem et tortor. Habitant morbi tristique senectus et.
              Adipiscing elit duis tristique sollicitudin nibh sit. Ornare
              aenean euismod elementum nisi quis eleifend. Commodo viverra
              maecenas accumsan lacus vel facilisis. Nulla posuere sollicitudin
              aliquam ultrices sagittis orci a.
            </Typography>
          </Box>
        </main>
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

                <IconButton
                  className={classes.sendButton}
                  onClick={sendMessage}
                >
                  <SendIcon />
                </IconButton>
              </Box>
            </div>
          </div>
        </Drawer>
      </div>
    </div>
  );
}
