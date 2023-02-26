import { useDispatch } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { WrapperBox } from "../../components/WrapperBox";
import { onLogout } from "../../store/userSlice";
import {
  AppBar,
  Grid,
  IconButton,
  Toolbar,
  Typography,
  Link,
} from "@mui/material";
import { LogoutOutlined } from "@mui/icons-material";

export const Navbar: React.FC = () => {
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(onLogout());
    localStorage.clear();
  };

  return (
    <AppBar position="fixed">
      <Toolbar sx={{ backgroundColor: "secondary.main" }}>
        <WrapperBox>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6" noWrap component="div">
              <Link
                component={RouterLink}
                to="/"
                sx={{ textDecoration: "none", color: "text.primary" }}
              >
                NotesApp
              </Link>
            </Typography>
            <IconButton
              title="Salir"
              aria-label="Salir"
              color="error"
              onClick={logout}
            >
              <LogoutOutlined />
            </IconButton>
          </Grid>
        </WrapperBox>
      </Toolbar>
    </AppBar>
  );
};
