import {
  Backdrop,
  Box,
  Fade,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import { FC, ReactNode } from "react";
import CloseIcon from "@mui/icons-material/Close";

interface modalProps {
  openModal: boolean;
  closeModal: () => void;
  modalHeading?: string;
  modalSubHeading?: string;
  width?: number | string;
  children: ReactNode;
}

const CustomModal: FC<modalProps> = ({
  openModal,
  closeModal,
  modalHeading,
  children,
  width = 500,
}) => {
  return (
    <Modal
      open={openModal}
      onClose={closeModal}
      aria-labelledby={modalHeading}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 300,
          sx: {
            backdropFilter: "blur(2px)",
          },
        },
      }}
    >
      <Fade in={openModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: width,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 3,
            borderRadius: 2,
            maxHeight: "90vh",
            overflowY: "auto",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            {modalHeading && (
              <Typography id="custom-modal-title" variant="h4">
                {modalHeading}
              </Typography>
            )}

            <IconButton onClick={closeModal}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Box
            sx={{
              borderRadius: 1.5,
              border: `1px solid #D9D9D9`,
              p: 2,
              background: "#fff",
            }}
          >
            {children}
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default CustomModal;
