import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import { SkillProvider } from "./SkillContext";
import ListSkill from "./components/ListSkill";

export default function IndexSkill() {
  return (
    <>
      <SkillProvider>
        <Box sx={{ width: "100%", pt: 3, m: 0 }}>
          <Card variant="outlined">
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
                List Skill
              </Typography>
              <Stack direction="row" spacing={1}>
                <Button variant="contained">Add Skill</Button>
              </Stack>
            </Stack>
            <CardContent sx={{ marginTop: 2 }}>
              <ListSkill />
            </CardContent>
          </Card>
        </Box>
      </SkillProvider>
    </>
  );
}
