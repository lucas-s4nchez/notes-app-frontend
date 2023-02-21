import { Box, Toolbar } from "@mui/material";
import { ChildrenProps } from "../../interfaces";
import { ResponsiveMenu } from "../components";
export const NotesLayout: React.FC<ChildrenProps> = ({
  children,
}: ChildrenProps) => {
  return (
    <Box sx={{ display: "flex" }}>
      <ResponsiveMenu />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};
