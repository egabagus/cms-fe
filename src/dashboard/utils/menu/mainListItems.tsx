import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import BurstModeIcon from "@mui/icons-material/BurstMode";
import TerminalIcon from "@mui/icons-material/Terminal";

const mainListItems = [
  { text: "Home", icon: <HomeRoundedIcon />, path: "/admin" },
  {
    text: "Portfolio",
    icon: <BurstModeIcon />,
    path: "/admin/portfolio",
  },
  {
    text: "Technology",
    icon: <TerminalIcon />,
    path: "/admin/tech",
  },
];

export default mainListItems;
