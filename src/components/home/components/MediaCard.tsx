import { FC, useState } from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import Draggable from "react-draggable";
import { TFile } from "../../../types";
import PreviewMedia from "./PreviewMedia";
import ImageIcon from "@mui/icons-material/Image";
import VideoFileIcon from "@mui/icons-material/VideoFile";
import PreviewIcon from "@mui/icons-material/Preview";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { getAuthState } from "../../../redux/features/authSlice";
import axios from "axios";
import { toggleRecordAddedStatus } from "../../../redux/features/recordAddedStatusSlice";

type TFileCard = { file: TFile };

const MediaCard: FC<TFileCard> = ({ file }) => {
  const [openPreview, setOpenPreview] = useState(false);

  const { token } = useAppSelector(getAuthState);
  const dispatch = useAppDispatch();

  const showPreview = () => {
    setOpenPreview(true);
    addView();
  };

  const addView = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;

      await axios.get(`${apiUrl}/files/add-view/${file._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      dispatch(toggleRecordAddedStatus(true));
    } catch (error: any /* eslint-disable-line @typescript-eslint/no-explicit-any */) {
      console.log(error?.response?.data?.message || "Failed to add view");
    }
  };

  return (
    <>
      <PreviewMedia
        openPreview={openPreview}
        setOpenPreview={setOpenPreview}
        file={file}
      />
      <Draggable>
        <Box
          component={Paper}
          sx={{
            width: "100%",
            cursor: "grab",
            boxShadow: "none",
            border: "1px solid lightgray",
          }}
        >
          <Button
            variant="contained"
            onClick={showPreview}
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              zIndex: 9999,
            }}
          >
            <PreviewIcon sx={{ fontSize: "1.7rem" }} />
          </Button>

          <Button
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: 9999,
              display: "flex",
              alignItems: "center",
              gap: 1,
              backgroundColor: "#1976d2",
              color: "#fff",
            }}
            disabled
          >
            <Typography color="#fff">{file.views}</Typography>
            <VisibilityIcon sx={{ fontSize: "1rem", color: "#fff" }} />
          </Button>

          <Box display="flex" justifyContent="center" alignItems="center">
            {file.type.startsWith("video") && (
              <VideoFileIcon sx={{ fontSize: "6rem" }} />
            )}

            {file.type.startsWith("image") && (
              <ImageIcon sx={{ fontSize: "6rem" }} />
            )}
          </Box>

          <Typography variant="body1" textAlign="center" padding={1}>
            {file.name}
          </Typography>
        </Box>
      </Draggable>
    </>
  );
};

export default MediaCard;
