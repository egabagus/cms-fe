import * as React from "react";
import SignIn from "./SignIn";
import AppTheme from "../../../shared-theme/AppTheme";
import { CssBaseline } from "@mui/material";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import ColorModeSelect from "../../../shared-theme/ColorModeSelect";

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
  minHeight: "100%",
  width: "100%", // Pastikan lebar penuh
  display: "flex",
  justifyContent: "center", // Pusatkan secara horizontal
  alignItems: "center", // Pusatkan secara vertikal
  padding: theme.spacing(2),
  position: "relative", // Penting untuk elemen ::before
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
    ...theme.applyStyles("dark", {
      backgroundImage:
        "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
    }),
  },
}));

export default function Login(props: { disableCustomTheme?: boolean }) {
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <SignInContainer>
        <ColorModeSelect
          sx={{ position: "fixed", top: "1rem", right: "1rem" }}
        />
        <SignIn />
      </SignInContainer>
    </AppTheme>
  );
}
