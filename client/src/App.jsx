import React from "react";

import MainMenu from "./components/MainMenu";
import { NavTabPanels } from "./components/MainTabs";

import { SnackbarProvider } from "notistack";
import { NotificationSystem } from "./components/NotificationSystem";


function App() {
  let [tabValue, setTabValue] = React.useState(0);
  return (
    <SnackbarProvider maxSnack={3}>
      <MainMenu value={tabValue} setValue={setTabValue} />
      <NavTabPanels value={tabValue} />
      <NotificationSystem />
    </SnackbarProvider>
  );
}

export default App;
