import Button from "@material-ui/core/Button";
import { alpha, CircularProgress, withStyles } from "@material-ui/core";
import React from "react";

export default function LoadingButton(props) {
  const { loading, children, icon } = props;

  return (
    <Button
      {...{ ...props, loading: undefined, icon: undefined }}
      startIcon={loading ? <CircularProgress size={"1em"} /> : icon}
      disabled={loading}
    >
      {children}
    </Button>
  );
}

export const SuccessLoadingButton = withStyles((theme) => ({
  root: {
    borderColor: alpha(theme.palette.success.main, 0.5),
    color: theme.palette.success.main,
    "&:hover": {
      borderColor: theme.palette.success.main,
    },
  },
}))(LoadingButton);