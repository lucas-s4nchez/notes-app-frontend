import { useState } from "react";
import { Navbar, Sidebar } from "./";

const drawerWidth: number = 240;

export const ResponsiveMenu: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  const handleDrawerToggle = (): void => {
    setMobileOpen(!mobileOpen);
  };
  const handleDrawerClose = (): void => {
    setMobileOpen(false);
  };
  return (
    <>
      <Navbar
        drawerWidth={drawerWidth}
        handleDrawerToggle={handleDrawerToggle}
      />
      <Sidebar
        drawerWidth={drawerWidth}
        handleDrawerToggle={handleDrawerToggle}
        mobileOpen={mobileOpen}
        handleDrawerClose={handleDrawerClose}
      />
    </>
  );
};
