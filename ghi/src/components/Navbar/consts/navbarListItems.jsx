import HomeIcon from "@mui/icons-material/Home";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SettingsEthernetIcon from "@mui/icons-material/SettingsEthernet";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import ForestIcon from "@mui/icons-material/Forest";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";

export const mainNavbarItems = [
  {
    id: 0,
    icon: <HomeIcon />,
    label: "Home",
    route: "/",
  },
  {
    id: 1,
    icon: <ForestIcon />,
    label: "Posts",
    route: "posts",
  },
  {
    id: 3,
    icon: <FavoriteIcon />,
    label: "Favorites",
    route: "favorites",
  },

  {
    id: 5,
    icon: <ManageAccountsIcon />,
    label: "Profile",
    route: "profile",
  },
  {
    id: 6,
    icon: <LogoutIcon />,
    label: "Logout",
    route: "logout",
  },
];

export const noLogNavbar = [
  {
    id: 7,
    icon: <HomeIcon />,
    label: "Home",
    route: "/",
  },
  {
    id: 9,
    icon: <LoginIcon />,
    label: "Login",
    route: "login",
  },
  {
    id: 4,
    icon: <SettingsEthernetIcon />,
    label: "Signup",
    route: "signup",
  },
  {
    id: 8,
    icon: <ForestIcon />,
    label: "Posts",
    route: "posts",
  },
];
