import {
  Alert,
  Button,
  FormControl,
  FormLabel,
  Snackbar,
  Stack,
  TextField,
} from "@mui/material";
import CustomModal from "../../../components/CustomModal";
import { useState } from "react";
import ApiConnectionService from "../../../services/ApiConnectionService";
import { useTechContext } from "../TechContext";

export default function AddTechnology() {
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMeesage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    desc: "",
  });
  const { fetchTech } = useTechContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    ApiConnectionService.post("/technology/store", formData)
      .then((response) => {
        setSuccess(true);
        setOpenModal(false);
        fetchTech();
      })
      .catch((response) => {
        setError(true);
        console.log(response.response.data);
        setErrorMeesage(response.response.data.message);
      });
  };

  return (
    <>
      <div>
        <Button variant="contained" onClick={handleOpenModal}>
          Create New
        </Button>
      </div>
      <CustomModal
        openModal={openModal}
        closeModal={() => setOpenModal(false)}
        modalHeading="Create New Technology"
        width={500}
      >
        <form onSubmit={handleSubmit}>
          <FormControl fullWidth>
            <FormLabel htmlFor="name">Name</FormLabel>
            <TextField
              id="name"
              type="text"
              name="name"
              variant="standard"
              onChange={handleChange}
              placeholder="Insert Name"
              required
              autoFocus
            />
          </FormControl>
          <FormControl fullWidth sx={{ marginTop: 2 }}>
            <FormLabel htmlFor="desc">Description</FormLabel>
            <TextField
              id="desc"
              name="desc"
              multiline
              rows={2}
              variant="standard"
              onChange={handleChange}
              fullWidth
              placeholder="Insert Description"
            />
          </FormControl>
          <Stack direction="row" spacing={1} sx={{ marginTop: 5 }}>
            <Button type="submit" variant="contained">
              Submit
            </Button>
            <Button
              type="button"
              variant="outlined"
              onClick={() => setOpenModal(false)}
            >
              Cancel
            </Button>
          </Stack>
        </form>
      </CustomModal>
      <Snackbar
        open={success}
        autoHideDuration={5000}
        onClose={() => setSuccess(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }} // Letakkan di tengah atas
      >
        <Alert severity="success" onClose={() => setSuccess(false)}>
          Saved Successfully
        </Alert>
      </Snackbar>
      <Snackbar
        open={error}
        autoHideDuration={5000}
        onClose={() => setError(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }} // Letakkan di tengah atas
      >
        <Alert severity="warning" onClose={() => setError(false)}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
