import { LogoutOutlined, MenuOutlined } from "@mui/icons-material";
import { AppBar, Grid, IconButton, Toolbar, Typography } from "@mui/material";
import { NavbarProps } from "../../interfaces";

export const Navbar: React.FC<NavbarProps> = ({
  drawerWidth = 240,
  handleDrawerToggle,
}: NavbarProps) => {
  const onLogout = () => {
    console.log("jiji");
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { md: `calc(100% - ${drawerWidth}px)` },
        ml: { md: `${drawerWidth}px` },
      }}
    >
      <Toolbar sx={{ backgroundColor: "secondary.main" }}>
        <IconButton
          title="Abrir menú"
          aria-label="Abrir menú"
          color="primary"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { md: "none" }, color: "primary.main" }}
        >
          <MenuOutlined />
        </IconButton>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h6" noWrap component="div" color="text.primary">
            NotesApp
          </Typography>
          <IconButton
            title="Salir"
            aria-label="Salir"
            color="error"
            onClick={onLogout}
          >
            <LogoutOutlined />
          </IconButton>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
