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
import { useGetNotesQuery } from "../../store/apiSlice";
import { SidebarItem } from "./SidebarItem";

export const Sidebar: React.FC<SidebarProps> = ({
  drawerWidth,
  window,
  mobileOpen,
  handleDrawerToggle,
  handleDrawerClose,
}: SidebarProps) => {
  const token = localStorage.getItem("token") ?? "";
  const { data: notes, isLoading: isLoadingNotes } = useGetNotesQuery(
    localStorage.getItem("token") ?? ""
  );
  const container =
    window !== undefined ? () => window().document.body : undefined;

  if (isLoadingNotes) {
    return <h1>cargando...</h1>;
  }
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
          {notes?.map((note: any) => (
            <SidebarItem key={note._id} {...note} />
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
          {notes?.map((note: any) => (
            <SidebarItem key={note._id} {...note} />
          ))}
        </List>
      </Drawer>
    </Box>
  );
};
