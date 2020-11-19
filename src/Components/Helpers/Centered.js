import React from "react";
import Grid from "@material-ui/core/Grid";

const Centered = ({ component }) => {
  return (
    <>
      <Grid item xs={4} />
      <Grid item xs={4}>
        {component}
      </Grid>
      <Grid item xs={4} />
    </>
  );
};

export default Centered;
