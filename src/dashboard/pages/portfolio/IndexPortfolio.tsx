import * as React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import TablePortfolio from "./components/TablePortfolio";
import ModalAddPortfolio from "./components/AddPortfolio";

export default function IndexPortfolios() {
  return (
    <Box sx={{ width: "100%", pt: 3, m: 0 }}>
      <Card variant="outlined">
        <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
          List Portfolios
        </Typography>
        <Stack spacing={2}>
          <ModalAddPortfolio />
          <Button>Create</Button>
        </Stack>
        <CardContent>
          <TablePortfolio />
        </CardContent>
      </Card>
    </Box>
  );
}
