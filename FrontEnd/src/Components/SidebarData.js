import React from 'react';
import * as FaIcons from 'react-icons/fa';

export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <FaIcons.FaHome />
  },
  {
    title: 'Search',
    path: '/search',
    icon: <FaIcons.FaSearch />
  },
  {
    title: 'Playlists',
    path: '/playlists',
    icon: <FaIcons.FaList />
  },
  {
    title: 'SpotDL',
    path: '/spotdl',
    icon: <FaIcons.FaDownload />
  },
  {
    title: 'My Profile',
    path: '/settings/profile',
    icon: <FaIcons.FaUser />
  },
  {
    title: 'Settings',
    path:'/settings',
    icon: <FaIcons.FaCog />
  }
];

export const SidebarDataLogin = [
  {
    title: 'Sign in',
    path: '/sign-in',
    icon: <FaIcons.FaSignInAlt/>
  },
  {
    title: 'Sign out',
    path: '/',
    icon: <FaIcons.FaSignOutAlt/>
  },
];
