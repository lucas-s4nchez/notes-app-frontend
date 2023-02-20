import { CssBaseline, ThemeProvider } from "@mui/material";
import { ChildrenProps } from "../interfaces";
import { darkTheme, lightTheme } from "./themes";

export const AppTheme = ({ children }: ChildrenProps) => {
  return (
    <ThemeProvider theme={darkTheme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};