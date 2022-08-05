import React, { Dispatch, FunctionComponent, SetStateAction } from "react";
import { Alert, Snackbar } from "@mui/material";

interface IProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  open: boolean;
}
const ErrorToast: FunctionComponent<IProps> = (props: IProps) => {
  const handleAlertClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    props.setOpen(false);
  };
  console.log(props.open);
  return (
    <Snackbar
      open={props.open}
      autoHideDuration={6000}
      onClose={handleAlertClose}
    >
      <Alert onClose={handleAlertClose} severity="error" sx={{ width: "100%" }}>
        Connect to Wallet first!
      </Alert>
    </Snackbar>
  );
};

export default ErrorToast;
