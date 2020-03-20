import React from "react";
import PropTypes from "prop-types";
import Container from "@material-ui/core/Container";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Host from "./Host";
import Join from "./Join";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`hostjoin-tabpanel-${index}`}
      aria-labelledby={`hostjoin-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={2}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `hostjoin-tab-${index}`,
    "aria-controls": `hostjoin-tabpanel-${index}`
  };
}

export default function HostJoin() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container position="static" width="auto">
    <div>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="hostjoin tabs example"
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Host" {...a11yProps(0)} />
        <Tab label="Join" {...a11yProps(1)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Host />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Join />
      </TabPanel>
    </div>
  </Container>
  );
}
