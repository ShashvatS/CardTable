import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import MoreIcon from '@material-ui/icons/MoreVert';


const useStyles = makeStyles(theme => ({
  appBar: {
    top: "auto",
    bottom: 0
  },
  grow: {
    flexGrow: 1
  }
}));

export default function BottomApp() {
  const classes = useStyles();

  return (
    <AppBar position="fixed" color="secondary" className={classes.appBar}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="open drawer">
          <MenuIcon />
        </IconButton>
        <div className={classes.grow} />
        <IconButton color="inherit">
          <SearchIcon />
        </IconButton>
        <IconButton edge="end" color="inherit">
          <MoreIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
