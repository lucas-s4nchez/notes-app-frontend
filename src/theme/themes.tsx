import { createTheme } from "@mui/material";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#ff80ab",
    },
    secondary: {
      main: "#000000",
    },
    error: {
      main: "#ff1744",
    },
    text: {
      primary: "#222222",
      secondary: "#f1f1f1",
    },
    background: {
      paper: "#e7e7e7",
    },
  },
});
export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#ff80ab",
    },
    secondary: {
      main: "#000000",
    },
    error: {
      main: "#ff1744",
    },
    text: {
      primary: "#ffffff",
      secondary: "#222222",
    },
    background: {
      paper: "#212121",
    },
  },
});
