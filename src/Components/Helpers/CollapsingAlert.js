import React, { useState } from "react";
import Alert from "@material-ui/lab/Alert";
import Collapse from "@material-ui/core/Collapse";

const CollapsingAlert = ({ text, onClose }) => {
  const [isAlertOpen, setAlertOpen] = useState(true);

  const onAlertClose = () => {
    setAlertOpen(false);
    onClose();
  };

  return (
    <Collapse in={isAlertOpen}>
      {text !== "" ? <Alert onClose={onAlertClose}>{text}</Alert> : null}
    </Collapse>
  );
};

export default CollapsingAlert;
