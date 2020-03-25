import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChatIcon from "@material-ui/icons/Chat";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import Select from "@material-ui/core/Select/Select";

import { CopyToClipboard } from "react-copy-to-clipboard";

import { notify } from "../NotificationSystem";

import { gamesets } from "../../scripts/gamesets";

/** this style must be depends on the style of maingame
 */
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  inline: {
    display: "inline"
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
  item: {
    padding: 5,
    flexShrink: 1
  },
  space: {
    flexGrow: 1
  },
  hide: {
    display: "none"
  },
  toolbar: theme.mixins.toolbar
}));

export default function MainGameTop(props) {
  const classes = useStyles();
  const [open, setOpen] = props.open;

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  //TODO: check that this doesn't notify when browser is unable to copy the code
  function copy() {
    notify("success", "Copied the game code");
  }

  const [cardSet, setCardSet] = props.cardSet;

  function handleChange(event) {
    const value = event.target.value;
    if (value < 0) {
      setCardSet({
        index: -1,
        name: ""
      });
    } else {
      setCardSet({
        index: value,
        name: gamesets[value]
      });
    }
  }

  return (
    <div
      className={clsx(classes.appBar, {
        [classes.appBarShift]: open
      })}
    >
      <Toolbar>
        <Typography variant="h6" noWrap className={classes.item}>
          {props.playerName}
        </Typography>

        <Divider orientation="vertical" flexItem />

        <Typography variant="h6" noWrap className={classes.item}>
          Gamecode: {props.gameCode}
          <CopyToClipboard text={props.gameCode} onCopy={copy}>
            <IconButton className={classes.gameCode} color="primary">
              <FileCopyIcon />
            </IconButton>
          </CopyToClipboard>
        </Typography>

        <Divider orientation="vertical" flexItem />

        <Typography variant="h6" noWrap className={classes.item}>
          Card-set:{" "}
          <Select
            native
            value={cardSet.index}
            onChange={handleChange}
            className={classes.item}
            inputProps={{
              name: "cardset",
              id: "select-cardset"
            }}
          >
            <option value={-1} key={-2} />
            {gamesets.map((value, index) => (
              <option value={index} key={index}>
                {value}
              </option>
            ))}
          </Select>
        </Typography>

        <Typography variant="h6" noWrap className={classes.space}></Typography>

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
  );
}
