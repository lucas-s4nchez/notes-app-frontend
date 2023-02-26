import { CssBaseline, ThemeProvider } from "@mui/material";
import { ChildrenProps } from "../interfaces";
import { darkTheme, lightTheme } from "./themes";

export const AppTheme: React.FC<ChildrenProps> = ({
  children,
}: ChildrenProps) => {
  return (
    <ThemeProvider theme={lightTheme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
