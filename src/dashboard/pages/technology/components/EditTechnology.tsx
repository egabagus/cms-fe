import {
  Button,
  FormControl,
  FormLabel,
  Stack,
  TextField,
} from "@mui/material";
import CustomModal from "../../../components/CustomModal";
import { useEffect, useState } from "react";
import { Tech } from "../../../../types/tech.types";
import ApiConnectionService from "../../../services/ApiConnectionService";
import { useTechContext } from "../TechContext";
import Loader from "../../../utils/components/Loader";

interface editProps {
  open: boolean;
  handleClose: () => void;
  data: Tech | null;
}

const EditTechnology = ({ open, handleClose, data }: editProps) => {
  const [formData, setFormData] = useState({
    id: 0,
    name: "",
    description: "",
  });
  const { fetchTech } = useTechContext();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (data) {
      setFormData(data);
    }
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    ApiConnectionService.post(`/technology/${formData.id}/update`, formData)
      .then(() => {
        handleClose();
        fetchTech();
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <CustomModal
        openModal={open}
        closeModal={handleClose}
        modalHeading="Edit Technology"
        width={500}
      >
        <form onSubmit={handleUpdate}>
          <FormControl fullWidth>
            <FormLabel htmlFor="name">Name</FormLabel>
            <TextField
              id="name"
              type="text"
              name="name"
              variant="standard"
              onChange={handleChange}
              value={formData?.name}
              required
            />
          </FormControl>
          <FormControl fullWidth sx={{ marginTop: 2 }}>
            <FormLabel htmlFor="desc">Description</FormLabel>
            <TextField
              id="desc"
              name="description"
              multiline
              rows={2}
              variant="standard"
              onChange={handleChange}
              fullWidth
              value={formData?.description}
            />
          </FormControl>
          <Stack direction="row" spacing={1} sx={{ marginTop: 5 }}>
            <Button type="submit" variant="contained">
              Submit
            </Button>
            <Button type="button" variant="outlined">
              Cancel
            </Button>
          </Stack>
        </form>
      </CustomModal>
      <Loader open={loading}></Loader>
    </>
  );
};

export default EditTechnology;
