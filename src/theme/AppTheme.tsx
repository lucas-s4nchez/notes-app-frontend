import { CssBaseline, ThemeProvider } from "@mui/material";
import { useSelector } from "react-redux";
import { ChildrenProps } from "../interfaces";
import { RootState } from "../store";
import { darkTheme, lightTheme } from "./themes";

export const AppTheme: React.FC<ChildrenProps> = ({
  children,
}: ChildrenProps) => {
  const { isDarkTheme } = useSelector((state) => (state as RootState).ui);
  return (
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
