import * as React from "react";
import { styled } from "@mui/material/styles";
import { Box, Card, CardContent, Typography } from "@mui/material";
import StatCard, { StatCardProps } from "../../components/StatCard";
import Grid from "@mui/material/Grid2";
import HighlightedCard from "../../components/HighlightedCard";
import SessionsChart from "../../components/SessionsChart";
import PageViewsBarChart from "../../components/PageViewsBarChart";
import ApiConnectionService from "../../services/auth/ApiConnectionService";
import axios from "axios";

const data: StatCardProps[] = [
  {
    title: "Users",
    value: "14k",
    interval: "Last 30 days",
    trend: "up",
    data: [
      200, 24, 220, 260, 240, 380, 100, 240, 280, 240, 300, 340, 320, 360, 340,
      380, 360, 400, 380, 420, 400, 640, 340, 460, 440, 480, 460, 600, 880, 920,
    ],
  },
  {
    title: "Conversions",
    value: "325",
    interval: "Last 30 days",
    trend: "down",
    data: [
      1640, 1250, 970, 1130, 1050, 900, 720, 1080, 900, 450, 920, 820, 840, 600,
      820, 780, 800, 760, 380, 740, 660, 620, 840, 500, 520, 480, 400, 360, 300,
      220,
    ],
  },
  {
    title: "Event count",
    value: "200k",
    interval: "Last 30 days",
    trend: "neutral",
    data: [
      500, 400, 510, 530, 520, 600, 530, 520, 510, 730, 520, 510, 530, 620, 510,
      530, 520, 410, 530, 520, 610, 530, 520, 610, 530, 420, 510, 430, 520, 510,
    ],
  },
];

const getUser = () => {
  React.useEffect(() => {
    ApiConnectionService.get("portfolio/data").then((response) => {
      console.log(response);
    });
  }, []);
  console.log(sessionStorage.getItem("authToken"));
};

export default function ListPortfolios() {
  getUser();
  return (
    <Box sx={{ width: "100%", pt: 3, m: 0 }}>
      <Card variant="outlined">
        <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
          Overview
        </Typography>
        <CardContent>
          <Typography component="h2" variant="subtitle2" gutterBottom>
            hjalo
          </Typography>
          <Grid
            container
            spacing={2}
            columns={12}
            sx={{ mb: (theme) => theme.spacing(2) }}
          >
            <Grid size={{ xs: 12, md: 4 }}>
              <HighlightedCard />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <HighlightedCard />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <HighlightedCard />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}
