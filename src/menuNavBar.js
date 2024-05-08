import {
  mdiAccount,
  mdiCogOutline,
  mdiEmail,
  mdiLogout,
  mdiThemeLightDark,
} from "@mdi/js";

export default [
  {
    isCurrentUser: true,
    menu: [
      {
        icon: mdiAccount,
        label: "Thông tin",
        to: "/profile",
      },
      {
        icon: mdiCogOutline,
        label: "Cài đặt",
      },
      {
        icon: mdiEmail,
        label: "Tin nhắn",
      },
      {
        isDivider: true,
      },
      {
        icon: mdiLogout,
        label: "Đăng xuất",
        isLogout: true,
      },
    ],
  },
  {
    icon: mdiThemeLightDark,
    label: "Light/Dark",
    isDesktopNoLabel: true,
    isToggleLightDark: true,
  },

  {
    icon: mdiLogout,
    label: "Đăng xuất",
    isDesktopNoLabel: true,
    isLogout: true,
  },
];
