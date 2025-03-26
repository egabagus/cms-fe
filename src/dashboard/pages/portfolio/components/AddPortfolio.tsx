import {
  Alert,
  Button,
  CircularProgress,
  FormControl,
  FormLabel,
  Grid2,
  MenuItem,
  Select,
  Snackbar,
  Stack,
  TextField,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import CustomModal from "../../../components/CustomModal";
import ApiConnectionService from "../../../services/ApiConnectionService";
import { createEditor, Descendant } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import RichTextEditor from "../../../components/RichTextEditor";

export default function AddPortfolio() {
  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [tech, setTechs] = useState<{ id: number; name: string }[]>([]);
  const editor = useMemo(() => withReact(createEditor()), []);

  const [formData, setFormData] = useState({
    title: "",
    meta_desc: "",
    technologies: [],
    order: "",
    description: "",
    link: "",
    thumbnail: null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({
        ...formData,
        thumbnail: e.target.files[0], // Simpan objek File
      });
    }
  };

  const handleEditorChange = (newContent) => {
    setFormData((prevData) => ({
      ...prevData,
      description: JSON.stringify(newContent), // Simpan teks dari editor
    }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    ApiConnectionService.post("/portfolio/store", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        setSuccess(true);
      })
      .catch((response) => {
        setLoading(false);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
        setOpenModal(false);
      });
  };

  const handleSelectChange = (event: any) => {
    setFormData({ ...formData, technologies: event.target.value });
  };

  useEffect(() => {
    ApiConnectionService.get("/technology/data").then((response) => {
      setTechs(response.data.data);
      console.log(response.data);
    });
  }, []);

  return (
    <>
      <div>
        <Button variant="contained" onClick={handleOpen}>
          New Portfolio
        </Button>
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
                <FormControl
                  fullWidth
                  sx={{ marginTop: "20px" }}
                  variant="outlined"
                >
                  <FormLabel id="demo-simple-select-label">
                    Technology
                  </FormLabel>
                  <Select
                    multiple
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Age"
                    name="technologies"
                    value={formData.technologies}
                    onChange={handleSelectChange}
                  >
                    {tech.map((techs) => (
                      <MenuItem value={techs.id} key={techs.id}>
                        {techs.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth sx={{ marginTop: "20px" }}>
                  <FormLabel htmlFor="link">Link Project</FormLabel>
                  <TextField
                    id="link"
                    type="text"
                    name="link"
                    placeholder="Link Project"
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
                <FormControl fullWidth sx={{ marginTop: "20px" }}>
                  <FormLabel htmlFor="order">Order</FormLabel>
                  <TextField
                    id="order"
                    type="number"
                    name="order"
                    placeholder="Order"
                    onChange={handleChange}
                    autoFocus
                    required
                    variant="outlined"
                    fullWidth
                  />
                </FormControl>
                <FormControl fullWidth sx={{ marginTop: "20px" }}>
                  <FormLabel htmlFor="thumbnail">Thumbnail</FormLabel>
                  <TextField
                    type="file"
                    id="thumbnail"
                    name="thumbnail"
                    variant="outlined"
                    onChange={handleFileChange}
                    fullWidth
                    margin="normal"
                  />
                </FormControl>
              </Grid2>
              <FormControl fullWidth>
                <FormLabel htmlFor="description">Description</FormLabel>
                <RichTextEditor onChange={handleEditorChange} />
              </FormControl>
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
    </>
  );
}
