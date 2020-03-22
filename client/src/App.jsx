import React from "react";

import MainMenu from "./components/MainMenu";
import { NavTabPanels } from "./components/MainTabs";

import { SnackbarProvider, withSnackbar } from "notistack";

export function notification(severity, message) {
  const event = new Event("notification");
  event.severity = severity;
  event.message = message;
  return event;
}

export const notificationEvents = new EventTarget();

const NotificationSystem = withSnackbar((props) => {
  const handleEvent = event => {
    props.enqueueSnackbar(event.message, {
      variant: event.severity,
      preventDuplicate: true
    });
  };

  notificationEvents.addEventListener("notification", handleEvent);

  return (
    <div></div>
  );
});

function App(props) {


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
