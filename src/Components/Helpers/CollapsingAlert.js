import React, { useState } from "react";
import Alert from "@material-ui/lab/Alert";
import Collapse from "@material-ui/core/Collapse";

const CollapsingAlert = ({ text }) => {
  const [isAlertOpen, setAlertOpen] = useState(true);

  return (
    <Collapse in={isAlertOpen}>
      {text !== "" ? (
        <Alert onClose={() => setAlertOpen(false)}>{text}</Alert>
      ) : null}
    </Collapse>
  );
};

export default CollapsingAlert;
