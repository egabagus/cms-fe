import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
import mainListItems from "../utils/menu/mainListItems";
import { LogoutRounded } from "@mui/icons-material";
import useLogout from "../services/auth/Logout";

export default function MenuContent() {
  const handleLogout = useLogout();

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: "space-between" }}>
      <List dense>
        {mainListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              component={Link}
              to={item.path}
              selected={index === 0}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <List dense>
        <ListItem disablePadding sx={{ display: "block" }}>
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon>
              <LogoutRounded />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
    </Stack>
  );
}
