import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid2,
  InputLabel,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import CustomModal from "../../../components/CustomModal";

export default function AddPortfolio() {
  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  const [formData, setFormData] = useState({
    title: "",
    meta_desc: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <CustomModal
        openModal={openModal}
        closeModal={() => setOpenModal(false)}
        modalHeading="Create Portfolio"
        width={800}
      >
        <form>
          <Grid2
            container
            spacing={2}
            columns={12}
            sx={{ mb: (theme) => theme.spacing(4) }}
          >
            <Grid2 size={6}>
              <FormControl fullWidth>
                <FormLabel htmlFor="title">Title</FormLabel>
                <TextField
                  id="title"
                  type="text"
                  name="title"
                  placeholder="Portfolio title"
                  autoFocus
                  required
                  variant="outlined"
                  fullWidth
                />
              </FormControl>
            </Grid2>
            <Grid2 size={6}>
              <FormControl fullWidth>
                <FormLabel htmlFor="title">Title</FormLabel>
                <TextField
                  id="title"
                  type="text"
                  name="title"
                  placeholder="Portfolio title"
                  autoFocus
                  required
                  variant="outlined"
                  fullWidth
                />
              </FormControl>
            </Grid2>
          </Grid2>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "blue",
            }}
          >
            Create
          </Button>
        </form>
      </CustomModal>
    </div>
  );
}
