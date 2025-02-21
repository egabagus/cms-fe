import * as React from "react";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Breadcrumbs, { breadcrumbsClasses } from "@mui/material/Breadcrumbs";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import { Link as RouterLink, useLocation } from "react-router-dom";
import mainListItems from "../utils/mainListItems";
import { Link } from "@mui/material";

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

// const location = useLocation();

// Mencari item yang sesuai dengan path saat ini
// const currentItem = mainListItems.find(
//   (item) => item.path === location.pathname
// );

export default function NavbarBreadcrumbs() {
  const location = useLocation(); // Dapatkan path dari react-router
  const pathnames = location.pathname.split("/").filter((x) => x); // Pisahkan path

  return (
    <Breadcrumbs
      aria-label="breadcrumb"
      separator={<NavigateNextRoundedIcon fontSize="small" />}
    >
      <Link component={RouterLink} to="/" underline="hover">
        Dashboard
      </Link>
      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;

        return isLast ? (
          <Typography
            key={to}
            variant="body1"
            sx={{ color: "text.primary", fontWeight: 600 }}
          >
            {decodeURIComponent(value)}
          </Typography>
        ) : (
          <Link key={to} component={RouterLink} to={to} underline="hover">
            {decodeURIComponent(value)}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
}
