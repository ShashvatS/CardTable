import React from "react";

import { withSnackbar } from "notistack";

const notificationEvents = new EventTarget();

export const notify = (severity, message) => {
    const event = new Event("notification");
    event.severity = severity;
    event.message = message;

    notificationEvents.dispatchEvent(event);
};

export const NotificationSystem = withSnackbar(props => {
  const handleEvent = event => {
    props.enqueueSnackbar(event.message, {
      variant: event.severity,
      preventDuplicate: true,
      autoHideDuration: 2000
    });
  };

  notificationEvents.addEventListener("notification", handleEvent);

  return <div></div>;
});
