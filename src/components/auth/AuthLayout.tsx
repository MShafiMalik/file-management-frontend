import { Box, Paper, Typography } from "@mui/material";
import { FC, ReactNode } from "react";

type TAuthLayout = {
  title: string;
  children: ReactNode;
};

const AuthLayout: FC<TAuthLayout> = ({ title, children }) => {
  return (
    <Box width="100%" padding={2} bgcolor="#f3f3f3" height="100vh">
      <Box
        component={Paper}
        padding={2}
        maxWidth={500}
        marginX="auto"
        marginTop={10}
      >
        <Typography variant="h5" textAlign="center" fontWeight={500}>
          {title}
        </Typography>
        {children}
      </Box>
    </Box>
  );
};

export default AuthLayout;
