import { FC } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Backdrop } from "@mui/material";

type TLoadingOverlay = { open: boolean };

const LoadingOverlay: FC<TLoadingOverlay> = ({ open }) => (
  <Backdrop
    sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
    open={open}
  >
    <CircularProgress color="inherit" />
  </Backdrop>
);

export default LoadingOverlay;
