import React from "react";
import Grid from "@material-ui/core/Grid";

const CenteredHorizontally = ({ children }) => {
  return (
    <>
      <Grid item xs={12}>
        {children}
      </Grid>
    </>
  );
};

export default CenteredHorizontally;
