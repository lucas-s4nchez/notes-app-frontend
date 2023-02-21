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

export interface SidebarItemProps {
  id: string;
  title: string;
  content: string;
}
