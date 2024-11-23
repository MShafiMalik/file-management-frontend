import { Box, Grid2, Typography } from "@mui/material";
import MediaCard from "./components/MediaCard";
import { useEffect, useState } from "react";
import { TFile } from "../../types";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getAuthState } from "../../redux/features/authSlice";
import axios from "axios";
import LoadingOverlay from "../LoadingOverlay";
import {
  getRecordAddedStatus,
  toggleRecordAddedStatus,
} from "../../redux/features/recordAddedStatusSlice";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [files, setFiles] = useState<TFile[]>([]);

  const { token } = useAppSelector(getAuthState);
  const { recordAddedStatus } = useAppSelector(getRecordAddedStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    getFiles();
  }, []);

  const getFiles = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;

      const { data } = await axios.get(`${apiUrl}/files/get-by-user`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setFiles(data);
    } catch (error: any /* eslint-disable-line @typescript-eslint/no-explicit-any */) {
      console.log(error?.response?.data?.message || "Failed to upload file");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (recordAddedStatus) {
      getFiles();
      dispatch(toggleRecordAddedStatus(false));
    }
  }, [recordAddedStatus]);

  return (
    <Box width="100%" padding={3}>
      {loading && <LoadingOverlay open={loading} />}

      {!loading && !files.length && (
        <Box display="flex" justifyContent="center" marginTop={5}>
          <Typography variant="h5">No Record Found!</Typography>
        </Box>
      )}

      {!loading && files.length !== 0 && (
        <Grid2
          container
          spacing={{ xs: 4, md: 6 }}
          columns={{ xs: 2, sm: 8, md: 12, lg: 16 }}
        >
          {files.map((file) => (
            <Grid2 key={file._id} size={{ xs: 2, sm: 4, md: 4 }}>
              <MediaCard file={file} />
            </Grid2>
          ))}
        </Grid2>
      )}
    </Box>
  );
};

export default Home;
