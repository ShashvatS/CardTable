import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import PolymerIcon from "@material-ui/icons/Polymer";

import { MainTabs } from "./MainTabs"

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

export default function MainMenu(props) {
  const classes = useStyles();
  const [value, setValue] = [props.value, props.setValue];

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <PolymerIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Card Table
          </Typography>

          <MainTabs value={value} setValue={setValue}/>
        </Toolbar>
      </AppBar>
    </div>
  );
}
