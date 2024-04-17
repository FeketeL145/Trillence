import React from "react";
import * as FaIcons from "react-icons/fa";

export const SidebarData = [
  {
    title: "Home",
    path: "/",
    icon: <FaIcons.FaHome />,
    requireLoggedIn: false,
    requireAdmin: false,
  },
  {
    title: "Search",
    path: "/search",
    icon: <FaIcons.FaSearch />,
    requireLoggedIn: false,
    requireAdmin: false,
  },
  {
    title: "Featuretester",
    path: "/admin-featuretester",
    icon: <FaIcons.FaSearch />,
    requireLoggedIn: false,
    requireAdmin: false,
  },
  {
    title: "Playlists",
    path: "/playlists",
    icon: <FaIcons.FaList />,
    requireLoggedIn: true,
    requireAdmin: false,
  },
  {
    title: "SpotDL",
    path: "/spotdl",
    icon: <FaIcons.FaDownload />,
    requireLoggedIn: true,
    requireAdmin: false,
  },
  {
    title: "My Profile",
    path: "/profile",
    icon: <FaIcons.FaUser />,
    requireLoggedIn: true,
    requireAdmin: false,
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

export const SidebarDataAdmin = [
  {
    title: "Admin Panel",
    path: "/admin-panel",
    icon: <FaIcons.FaLock />,
    requireLoggedIn: true,
    requireAdmin: true,
  },
];