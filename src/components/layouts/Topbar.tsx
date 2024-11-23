import { Box } from "@mui/material";
import ProfileDropdown from "./ProfileDropdown";
import { useAppSelector } from "../../redux/hooks";
import { getAuthState } from "../../redux/features/authSlice";
import UploadButton from "./UploadButton";
import UploadingProgress from "./UploadingProgress";
import { useState } from "react";

const Topbar = () => {
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);

  const { isAuthenticated } = useAppSelector(getAuthState);

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      padding={2}
      borderBottom={1}
      borderColor="lightgray"
    >
      <Box display="flex" alignItems="center" gap={2}>
        <UploadButton setUploadProgress={setUploadProgress} />
        {uploadProgress && <UploadingProgress progress={uploadProgress} />}
      </Box>

      {isAuthenticated && <ProfileDropdown />}
    </Box>
  );
};

export default Topbar;
