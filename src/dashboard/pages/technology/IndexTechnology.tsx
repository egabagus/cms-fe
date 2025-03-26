import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import ListTechnology from "./components/ListTechnology";
import AddTechnology from "./components/AddTechnology";
import { TechProvider } from "./TechContext";
import ExportConnectionService from "../../services/ExportConnectionService";

const handleExport = () => {
  ExportConnectionService.get("/technology/export").then((response) => {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;

    const contentDisposition = response.headers["content-disposition"];
    let fileName = "download.xlsx"; // Default

    if (contentDisposition) {
      const match = contentDisposition.match(/filename="?(.+?)"?$/);
      if (match.length > 1) {
        fileName = match[1];
      }
    }

    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
  });
};

export default function IndexTechnology() {
  return (
    <TechProvider>
      <Box sx={{ width: "100%", pt: 3, m: 0 }}>
        <Card variant="outlined">
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
              List Technologies
            </Typography>
            <Stack direction="row" spacing={1}>
              <AddTechnology />
              <Button variant="contained" onClick={handleExport}>
                Export
              </Button>
            </Stack>
          </Stack>
          <CardContent sx={{ marginTop: 2 }}>
            <ListTechnology />
          </CardContent>
        </Card>
      </Box>
    </TechProvider>
  );
}
