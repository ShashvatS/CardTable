import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import MainGameTop from "./MainGameTop";
import PlayArea from "./playarea/PlayArea";
import Chat from "./Chat";

import { gamedata } from "../../scripts/logic/gamedata";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
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
  }
}));

export default function MainGame() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <CssBaseline />
      <MainGameTop
        open={[open, setOpen]}
        gameCode={gamedata.state.game_code}
        playerName={gamedata.my_name()}
      />

      <div className={classes.root}>
        <CssBaseline />
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open
          })}
        >
          <PlayArea/>
        </main>
        <Chat open={[open, setOpen]} />
      </div>
    </div>
  );
}
