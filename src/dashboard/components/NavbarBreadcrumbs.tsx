import * as React from "react";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Breadcrumbs, { breadcrumbsClasses } from "@mui/material/Breadcrumbs";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { Link } from "@mui/material";
import mainListItems from "../utils/menu/mainListItems";

const StyledBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({
  margin: theme.spacing(1, 0),
  [`& .${breadcrumbsClasses.separator}`]: {
    color: (theme.vars || theme).palette.action.disabled,
    margin: 1,
  },
  [`& .${breadcrumbsClasses.ol}`]: {
    alignItems: "center",
  },
}));

export default function NavbarBreadcrumbs() {
  const location = useLocation(); // Dapatkan path dari react-router
  const pathname = location.pathname;
  const matchedItem = mainListItems.find((item) => item.path === pathname);

  return (
    <Breadcrumbs
      aria-label="breadcrumb"
      separator={<NavigateNextRoundedIcon fontSize="small" />}
    >
      <Link component={RouterLink} to="/" underline="hover">
        Dashboard
      </Link>
      <Typography
        variant="body1"
        sx={{ color: "text.primary", fontWeight: 600 }}
      >
        {matchedItem?.text}
      </Typography>
    </Breadcrumbs>
  );
}
