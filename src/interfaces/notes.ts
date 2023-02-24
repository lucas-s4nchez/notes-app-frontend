export interface NavbarProps {
  drawerWidth: number;
  handleDrawerToggle: () => void;
}
export interface SidebarProps {
  drawerWidth: number;
  window?: () => Window;
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
  handleDrawerClose: () => void;
}

export interface CardItemProps {
  _id: string;
  title: string;
  content: string;
  date: string;
  user: {};
}
