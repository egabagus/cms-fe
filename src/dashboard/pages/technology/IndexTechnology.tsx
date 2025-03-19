import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import ListTechnology from "./components/ListTechnology";
import AddTechnology from "./components/AddTechnology";
import { TechProvider } from "./TechContext";

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
            <AddTechnology />
          </Stack>
          <CardContent sx={{ marginTop: 2 }}>
            <ListTechnology />
          </CardContent>
        </Card>
      </Box>
    </TechProvider>
  );
}
