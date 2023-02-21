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
      main: "#d50000",
    },
    text: {
      primary: "#333333", // color primario de la fuente en tema claro
      secondary: "#666666", // color secundario de la fuente en tema claro
    },
    background: {
      paper: "#e7e7e7", // Color de fondo de Paper
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
      main: "#d50000",
    },
    text: {
      primary: "#ffffff", // color primario de la fuente en tema claro
      secondary: "#cccccc", // color secundario de la fuente en tema claro
    },
    background: {
      paper: "#212121", // Color de fondo de Paper
    },
  },
});
