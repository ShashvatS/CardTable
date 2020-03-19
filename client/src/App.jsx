import React from "react";

import MainMenu from "./components/MainMenu";
import { NavTabPanels } from "./components/MainTabs";

function App() {
  let [tabValue, setTabValue] = React.useState(0);
  return (
    <React.Fragment>
      <MainMenu value={tabValue} setValue={setTabValue} />
      <NavTabPanels value={tabValue} />
    </React.Fragment>
  );
}

export default App;
