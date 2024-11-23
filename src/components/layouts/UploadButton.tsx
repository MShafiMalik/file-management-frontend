import { FC, useRef } from "react";
import { Box, Button } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getAuthState } from "../../redux/features/authSlice";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { FileType } from "../../enums";
import { toggleRecordAddedStatus } from "../../redux/features/recordAddedStatusSlice";

type TUploadButton = { setUploadProgress: (val: number | null) => void };

const UploadButton: FC<TUploadButton> = ({ setUploadProgress }) => {
  const maxFileSize = 500 * 1024 * 1024;

  const fileRef = useRef<HTMLInputElement | null>(null);

  const { token } = useAppSelector(getAuthState);
  const dispatch = useAppDispatch();

  const triggerFileInput = () => fileRef.current?.click();

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!Object.values(FileType).includes(file.type as FileType)) {
      enqueueSnackbar("Please upload a valid file.", { variant: "error" });
      return;
    }

    if (file.size > maxFileSize) {
      enqueueSnackbar("This file is too large.", { variant: "error" });
      return;
    }

    try {
      const apiUrl = import.meta.env.VITE_API_URL;

      const formData = new FormData();
      formData.append("file", file);

      await axios.post(`${apiUrl}/files/upload`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total!,
          );
          console.log({ progress });
          setUploadProgress(progress); // Update progress
        },
      });

      dispatch(toggleRecordAddedStatus(true));
      enqueueSnackbar("File Uploaded Successfully!", { variant: "success" });
    } catch (error: any /* eslint-disable-line @typescript-eslint/no-explicit-any */) {
      enqueueSnackbar(
        error?.response?.data?.message || "Failed to upload file",
        { variant: "error" },
      );
    } finally {
      setUploadProgress(null);
    }
  };

  return (
    <>
      <Button variant="contained" size="large" onClick={triggerFileInput}>
        <Box component="span" marginRight={1}>
          Upload File
        </Box>
        <UploadFileIcon />
      </Button>

      <input
        ref={fileRef}
        type="file"
        accept=".jpeg,.png,.gif,.mp4,.mpeg"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
    </>
  );
};

export default UploadButton;
