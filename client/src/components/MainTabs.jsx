import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import HostJoin from "./HostJoin";

import Game from "./game/Game";

function TabPanel(props) {
  const { children, value, index, havepadding, ...other } = props;

  if (havepadding === 0) {
    return (
      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`main-tabpanel-${index}`}
        aria-labelledby={`main-tab-${index}`}
        {...other}
      >
        {value === index && <Box p={3}>{children}</Box>}
      </Typography>
    );
  } else {
    return (
      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`main-tabpanel-${index}`}
        aria-labelledby={`main-tab-${index}`}
        {...other}
      >
        {value === index && <Box>{children}</Box>}
      </Typography>
    );
  }
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `main-tab-${index}`,
    "aria-controls": `main-tabpanel-${index}`
  };
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={event => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
}));

export function MainTabs(props) {
  const [value, setValue] = [props.value, props.setValue];

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Tabs
      variant="scrollable"
      scrollButtons="auto"
      value={value}
      onChange={handleChange}
      aria-label="main tabs"
    >
      <LinkTab label="Home" href="/" {...a11yProps(0)} />
      <LinkTab label="Host / Join" href="/" {...a11yProps(1)} />
      <LinkTab label="Play" href="/" {...a11yProps(2)} />
    </Tabs>
  );
}

export function NavTabPanels(props) {
  const classes = useStyles();
  const value = props.value;

  return (
    <div className={classes.root}>
      <TabPanel havepadding={0} value={value} index={0}>
        <Typography variant="h6">Home</Typography>
        <p> This website was made by <a href="https://github.com/ShashvatS/CardTable" target="_blank">Shashvat Srivastava</a>
        </p>
        <p>
          How to use this website:

          <br></br>1: Gather a group of friends. Choose a friend to host the game.
          <br></br>2: Host gets a gamecode from the host/join tab and sends the gamecode to the other players.
          <br></br>3: The other players join using the gamecode.
          <br></br>4: The players choose a screenname for use in the gamechat.
          <br></br>5: Players should choose a cardset depending on the game they are playing. Currently, the only cardset are ordinary playing cards. 
          <br></br>6: Players can create piles to represent aspects of the game, e.g., a discard pile, a players's hand, or a draw pile. 
          <br></br>When creating a pile, players can choose to either add all the cards in the card set, add no cards, 
          <br></br>or custom select which cards they want to add.
          <br></br>7: Piles can be dragged around anywhere on the screen. Click the pile to open it and see what cards are inside. 
          <br></br>8: To move cards from pile to pile, simply drag the card to the pile. Cards can be moved even when they are hidden.
           However, to move a card, the pile must be locked first to prevent the pile itself from being repositioned. 
          When a card is moved to another pile, it is added to the end of the pile.
        </p>

        <p>
          Halp:

          <br></br> I got disconnected: if you are the host, create a new game. Check off the button to use the previous game state, and have everyone rejoin the game. If you are not the host, just rejoin the game using the game code. 
        </p>
      </TabPanel>
      <TabPanel havepadding={0} value={value} index={1}>
        <HostJoin />
      </TabPanel>
      <TabPanel havepadding={1} value={value} index={2}>
        <Game />
      </TabPanel>
    </div>
  );
}
