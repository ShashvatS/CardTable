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
        Home
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
