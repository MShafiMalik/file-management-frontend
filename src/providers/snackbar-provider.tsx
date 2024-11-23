import { FC, ReactNode } from "react";
import { SnackbarProvider } from "notistack";

const SnackbarProviderComp: FC<{ children: ReactNode }> = ({ children }) => (
  <SnackbarProvider
    maxSnack={1}
    autoHideDuration={3000}
    anchorOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
  >
    {children}
  </SnackbarProvider>
);

export default SnackbarProviderComp;
