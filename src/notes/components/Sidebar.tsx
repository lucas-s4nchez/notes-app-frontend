import { ArrowBackIosNew } from "@mui/icons-material";
import {
  Box,
  Drawer,
  IconButton,
  Divider,
  List,
  Toolbar,
  Typography,
} from "@mui/material";
import { SidebarProps } from "../../interfaces";
import { SidebarItem } from "./SidebarItem";

const notes = [
  { id: "1", title: "nota 1", content: "content de nota 1", date: Date.now() },
  {
    id: "2",
    title: "nota 2",
    content:
      "content de nota 2 ahsgdahg dsajd hgasjhdgs adhsga jhkajsdh kjsd hjkahd jhsadkjah",
    date: Date.now(),
  },
];

export const Sidebar: React.FC<SidebarProps> = ({
  drawerWidth,
  window,
  mobileOpen,
  handleDrawerToggle,
  handleDrawerClose,
}: SidebarProps) => {
  const container =
    window !== undefined ? () => window().document.body : undefined;
  return (
    <Box
      component="nav"
      sx={{
        width: { md: drawerWidth },
        flexShrink: { md: 0 },
      }}
    >
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        <Box display="flex" justifyContent="flex-end">
          <IconButton
            title="Cerrar menú"
            aria-label="Cerrar menú"
            sx={{ mr: 1 }}
            color="primary"
            onClick={handleDrawerClose}
          >
            <ArrowBackIosNew />
          </IconButton>
        </Box>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            {/* //TODO: agregar nombre de usuario */}
            Lucas
          </Typography>
        </Toolbar>
        <Divider />
        <List>
          {notes.map((note) => (
            <SidebarItem key={note.id} {...note} />
          ))}
        </List>
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
        open
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            {/* //TODO: agregar nombre de usuario */}
            Lucas
          </Typography>
        </Toolbar>
        <Divider />
        <List>
          {notes.map((note) => (
            <SidebarItem key={note.id} {...note} />
          ))}
        </List>
      </Drawer>
    </Box>
  );
};
