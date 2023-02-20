import { createTheme } from "@mui/material";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#FAFAFA",
    },
    secondary: {
      main: "#f50057",
    },
    text: {
      primary: "#333333", // color primario de la fuente en tema claro
      secondary: "#666666", // color secundario de la fuente en tema claro
    },
  },
});
export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#222222",
    },
    secondary: {
      main: "#f50057",
    },
    text: {
      primary: "#ffffff", // color primario de la fuente en tema claro
      secondary: "#cccccc", // color secundario de la fuente en tema claro
    },
  },
});
