import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      flexDirection="column"
      textAlign="center"
      sx={{ backgroundColor: "#f5f5f5", padding: 2 }}
    >
      <Typography variant="h2" color="primary">
        404
      </Typography>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Oops! Page not found.
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: 2 }}>
        The page you are looking for does not exist or has been moved.
      </Typography>
      <Button variant="contained" onClick={() => navigate("/")}>
        Go to Home
      </Button>
    </Box>
  );
};

export default NotFoundPage;
