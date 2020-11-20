import React from "react";
import Grid from "@material-ui/core/Grid";

const CenteredVertical = ({ component }) => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid item xs={3}>
        {component}
      </Grid>
    </Grid>
  );
};

export default CenteredVertical;
