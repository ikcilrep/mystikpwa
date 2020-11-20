import React from "react";
import Grid from "@material-ui/core/Grid";

const CenteredHorizontal = ({  children }) => {
  return (
    <>
      <Grid item xs={4} />
      <Grid item xs={4}>
        {children}
      </Grid>
      <Grid item xs={4} />
    </>
  );
};

export default CenteredHorizontal;
