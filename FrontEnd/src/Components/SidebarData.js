import React from "react";
import * as FaIcons from "react-icons/fa";

export const SidebarData = [
  {
    title: "Home",
    path: "/",
    icon: <FaIcons.FaHome />,
    requireLoggedIn: false,
  },
  {
    title: "Search",
    path: "/search",
    icon: <FaIcons.FaSearch />,
    requireLoggedIn: false,
  },
  {
    title: "Playlists",
    path: "/playlists",
    icon: <FaIcons.FaList />,
    requireLoggedIn: true,
  },
  {
    title: "SpotDL",
    path: "/spotdl",
    icon: <FaIcons.FaDownload />,
    requireLoggedIn: true,
  },
  {
    title: "My Profile",
    path: "/profile",
    icon: <FaIcons.FaUser />,
    requireLoggedIn: true,
  },
];

export const SidebarDataLogin = [
  {
    title: "Sign in",
    path: "/sign-in",
    icon: <FaIcons.FaSignInAlt />,
  },
  {
    title: "Sign out",
    path: "/sign-out",
    icon: <FaIcons.FaSignOutAlt />,
  },
];
