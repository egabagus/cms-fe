import { Box, Card, CardContent, Typography } from "@mui/material";
import ListTechnology from "./components/ListTechnology";

export default function IndexTechnology() {
  return (
    <Box sx={{ width: "100%", pt: 3, m: 0 }}>
      <Card variant="outlined">
        <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
          List Technologies
        </Typography>
        <CardContent>
          <ListTechnology />
        </CardContent>
      </Card>
    </Box>
  );
}
