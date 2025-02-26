import {
  Alert,
  Button,
  CircularProgress,
  FormControl,
  FormLabel,
  Grid2,
  Snackbar,
  Stack,
  TextField,
} from "@mui/material";
import { useState } from "react";
import CustomModal from "../../../components/CustomModal";
import ApiConnectionService from "../../../services/auth/ApiConnectionService";
import Loader from "../../../utils/components/Loader";

export default function AddPortfolio() {
  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

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

    setLoading(true);
    ApiConnectionService.post("/portfolio/store", formData)
      .then((response) => {
        console.log(response);
      })
      .catch((response) => {
        console.log(response.data);
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
        setOpenModal(false);
        setError(true);
      });
  };

  return (
    <>
      <div>
        <Button onClick={handleOpen}>Open modal</Button>
        <CustomModal
          openModal={openModal}
          closeModal={() => setOpenModal(false)}
          modalHeading="Create Portfolio"
          width={800}
        >
          <form onSubmit={handleSubmit}>
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
                    onChange={handleChange}
                    autoFocus
                    required
                    variant="outlined"
                    fullWidth
                  />
                </FormControl>
              </Grid2>
              <Grid2 size={6}>
                <FormControl fullWidth>
                  <FormLabel htmlFor="meta_desc">Meta Desc</FormLabel>
                  <TextField
                    id="meta_desc"
                    type="text"
                    name="meta_desc"
                    placeholder="Portfolio Meta"
                    onChange={handleChange}
                    autoFocus
                    required
                    variant="outlined"
                    fullWidth
                  />
                </FormControl>
              </Grid2>
            </Grid2>
            <Stack direction="row" spacing={1}>
              <Button
                type="submit"
                variant="contained"
                disabled={loading}
                sx={{ position: "relative" }}
              >
                {loading ? (
                  <CircularProgress size={18} sx={{ color: "#FFF" }} />
                ) : (
                  "Create"
                )}
              </Button>
              <Button type="button" variant="outlined">
                Cancel
              </Button>
            </Stack>
          </form>
        </CustomModal>
      </div>
      <Snackbar
        open={error}
        autoHideDuration={5000}
        onClose={() => setError(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }} // Letakkan di tengah atas
      >
        <Alert severity="error" onClose={() => setError(false)}>
          505 | Server Error
        </Alert>
      </Snackbar>
    </>
  );
}
