import HomeIcon from "@mui/icons-material/Home";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SettingsEthernetIcon from "@mui/icons-material/SettingsEthernet";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import ForestIcon from "@mui/icons-material/Forest";
import LogoutIcon from "@mui/icons-material/Logout";

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
  //   {
  //     id: 2,
  //     icon: <ImageIcon />,
  //     label: "I <3 Anna",
  //     route: "storage",
  //   },
  {
    id: 3,
    icon: <FavoriteIcon />,
    label: "Favorites",
    route: "favorites",
  },
  {
    id: 4,
    icon: <SettingsEthernetIcon />,
    label: "Signup",
    route: "signup",
  },
  {
    id: 5,
    icon: <ManageAccountsIcon />,
    label: "Profile",
    route: "users/:username",
  },
  {
    id: 56,
    icon: <LogoutIcon />,
    label: "Logout",
    route: "logout",
  },
];
