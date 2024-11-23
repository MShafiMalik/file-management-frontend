import { FC, ReactNode } from "react";
import SnackbarProviderComp from "./snackbar-provider";
import StoreProvider from "./StoreProvider";

const Providers: FC<{ children: ReactNode }> = ({ children }) => (
  <StoreProvider>
    <SnackbarProviderComp>{children}</SnackbarProviderComp>
  </StoreProvider>
);

export default Providers;
