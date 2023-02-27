import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { onChangeTheme, onLogout } from "../../store";
import { RootState } from "../../store/store";
import { WrapperBox, ThemeSwitch } from "../../components";
import {
  AppBar,
  Grid,
  IconButton,
  Toolbar,
  Typography,
  Link,
  FormControlLabel,
  Box,
} from "@mui/material";
import { LogoutOutlined } from "@mui/icons-material";

export const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  const { isDarkTheme } = useSelector((state) => (state as RootState).ui);

  const logout = () => {
    dispatch(onLogout());
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
            <Box>
              <FormControlLabel
                control={
                  <ThemeSwitch
                    checked={isDarkTheme}
                    onChange={() => dispatch(onChangeTheme())}
                  />
                }
                label=""
              />
              <IconButton
                title="Salir"
                aria-label="Salir"
                color="error"
                onClick={logout}
              >
                <LogoutOutlined />
              </IconButton>
            </Box>
          </Grid>
        </WrapperBox>
      </Toolbar>
    </AppBar>
  );
};
