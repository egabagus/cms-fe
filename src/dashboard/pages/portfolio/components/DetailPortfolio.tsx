import {
  Button,
  FormControl,
  FormLabel,
  Grid2,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import CustomModal from "../../../components/CustomModal";

interface DetailModalProps {
  open: boolean;
  handleClose: () => void;
  data: {
    id: number;
    title: string;
    meta_desc: string;
    link: string;
    order: number;
    techs: string[];
    description: string;
  };
}

const DetailPortfolio = ({ open, handleClose, data }: DetailModalProps) => {
  return (
    <div>
      <CustomModal
        openModal={open}
        closeModal={() => handleClose(false)}
        modalHeading="Detail Portfolio"
        width={800}
      >
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
      </CustomModal>
    </div>
  );
};
