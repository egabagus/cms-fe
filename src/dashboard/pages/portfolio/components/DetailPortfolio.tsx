import {
  Button,
  FormControl,
  FormLabel,
  Grid2,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import CustomModal from "../../../components/CustomModal";
import { useEffect, useState } from "react";
import ApiConnectionService from "../../../services/auth/ApiConnectionService";
import { PortfolioData } from "@/types/portfolio.types";

const DetailPortfolio = ({
  data,
  detailClose,
}: {
  data: any;
  detailClose: () => void;
}) => {
  if (!data) {
    return null;
  }

  const [dataPort, findData] = useState<PortfolioData>({});

  useEffect(() => {
    ApiConnectionService.get(`/portfolio/${data.id}/detail`).then(
      (response) => {
        findData(response.data.data);
      }
    );
  }, [data?.id]);

  return (
    <CustomModal
      openModal={true}
      closeModal={() => detailClose()}
      modalHeading="Detail Portfolio"
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
                value={dataPort?.title || ""}
                slotProps={{
                  input: {
                    readOnly: true,
                  },
                }}
              />
            </FormControl>
            <FormControl fullWidth sx={{ marginTop: "20px" }}>
              <FormLabel htmlFor="link">Link Project</FormLabel>
              <TextField
                id="link"
                type="text"
                name="link"
                placeholder="Link Project"
                autoFocus
                required
                variant="outlined"
                fullWidth
                value={dataPort?.link || ""}
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
                autoFocus
                required
                variant="outlined"
                fullWidth
                value={dataPort?.meta_desc || ""}
              />
            </FormControl>
            <FormControl fullWidth sx={{ marginTop: "20px" }}>
              <FormLabel htmlFor="order">Order</FormLabel>
              <TextField
                id="order"
                type="number"
                name="order"
                placeholder="Order"
                autoFocus
                required
                variant="outlined"
                fullWidth
                value={dataPort?.order || ""}
              />
            </FormControl>
          </Grid2>
        </Grid2>
        <Stack direction="row" spacing={1}>
          <Button type="button" variant="outlined">
            Cancel
          </Button>
        </Stack>
      </form>
    </CustomModal>
  );
};

export default DetailPortfolio;
