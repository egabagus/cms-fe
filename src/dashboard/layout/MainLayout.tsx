import { Outlet } from "react-router-dom";
import { Box, Stack, CssBaseline, alpha } from "@mui/material";
import AppTheme from "../../shared-theme/AppTheme";
import SideMenu from "../components/SideMenu";
import AppNavbar from "../components/AppNavbar";
import Header from "../components/Header";
import type {} from "@mui/x-date-pickers/themeAugmentation";
import type {} from "@mui/x-charts/themeAugmentation";
import type {} from "@mui/x-tree-view/themeAugmentation";
import Copyright from "../internals/components/Copyright";

export default function MainLayout(props: { disableCustomTheme?: boolean }) {
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <Box
        sx={{
          display: "flex",
        }}
      >
        <SideMenu />
        <AppNavbar />
        <Box
          component="main"
          sx={(theme) => ({
            width: "100%",
            backgroundColor: theme.vars
              ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
              : alpha(theme.palette.background.default, 1),
            overflow: "auto",
          })}
        >
          <Stack
            direction="row"
            // spacing={2}
            flexWrap="wrap"
            // justifyContent="space-between"
            sx={{
              alignItems: "center",
              px: 2,
              pb: 5,
              width: "100%",
            }}
          >
            <Header />
            <Outlet />
          </Stack>
          <Copyright sx={{ my: 4 }} />
        </Box>
      </Box>
    </AppTheme>
  );
}
