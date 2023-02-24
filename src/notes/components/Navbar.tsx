import { LogoutOutlined } from "@mui/icons-material";
import { AppBar, Grid, IconButton, Toolbar, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { WrapperBox } from "../../components/WrapperBox";
import { onLogout } from "../../store/userSlice";

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
            <Typography
              variant="h6"
              noWrap
              component="div"
              color="text.primary"
            >
              NotesApp
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
