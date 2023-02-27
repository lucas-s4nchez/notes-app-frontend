import { CssBaseline, ThemeProvider } from "@mui/material";
import { useSelector } from "react-redux";
import { IChildrenProps } from "../interfaces";
import { RootState } from "../store/store";
import { darkTheme, lightTheme } from "./themes";

export const AppTheme: React.FC<IChildrenProps> = ({
  children,
}: IChildrenProps) => {
  const { isDarkTheme } = useSelector((state) => (state as RootState).ui);
  return (
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
