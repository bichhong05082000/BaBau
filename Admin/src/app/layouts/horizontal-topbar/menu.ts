import { MenuItem } from "./menu.model";

export const MENU: MenuItem[] = [
  {
    id: 1,
    label: "MENUITEMS.MENU.TEXT",
    isTitle: true,
  },
  {
    id: 2,
    label: "Account",
    icon: "ri-account-pin-circle-line",
    link: "/pregnancy/contacts",
  },
  {
    id: 3,
    label: "Image",
    icon: "ri-gallery-fill",
    link: "/pregnancy/image-child",
  },
  {
    id: 7,
    label: "Music",
    icon: "ri-file-music-fill",
    link: "/pregnancy/music",
  },
  {
    id: 7,
    label: "Video",
    icon: " ri-video-chat-line",
    link: "/pregnancy/video",
  },
  {
    id: 6,
    label: "Stories",
    icon: "ri-billiards-fill",
    link: "/pregnancy/stories",
  },
  {
    id: 4,
    label: "Root Category",
    icon: " ri-search-2-fill",
    link: "/pregnancy/root",
  },
  {
    id: 4,
    label: "Food Category",
    icon: "ri-firefox-line",
    link: "/pregnancy/food-category",
  },
  {
    id: 5,
    label: "Food",
    icon: " ri-moon-cloudy-fill",
    link: "/pregnancy/food",
  },
];
