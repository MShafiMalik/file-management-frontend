import { FC } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { TFile } from "../../../types";
import { IconButton } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

type TPreviewMedia = {
  openPreview: boolean;
  setOpenPreview: (val: boolean) => void;
  file: TFile;
};

const PreviewMedia: FC<TPreviewMedia> = ({
  openPreview,
  setOpenPreview,
  file,
}) => {
  const handleClose = () => setOpenPreview(false);

  return (
    <>
      <Dialog
        fullWidth={true}
        open={openPreview}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        sx={{ width: "100%" }}
      >
        <IconButton
          onClick={handleClose}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            zIndex: 9999,
          }}
        >
          <CloseIcon />
        </IconButton>

        <DialogContent>
          {file.type.startsWith("image") && (
            <img
              src={file.path}
              title={file.name}
              style={{ maxHeight: "500px", width: "100%" }}
            />
          )}

          {file.type.startsWith("video") && (
            <video
              width="100%"
              height="100%"
              controls
              style={{ maxHeight: "500px" }}
            >
              <source src={file.path} type={file.type} />
            </video>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PreviewMedia;
