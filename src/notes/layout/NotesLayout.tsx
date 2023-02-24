import { Box, Toolbar } from "@mui/material";
import { ChildrenProps } from "../../interfaces";
import { Navbar } from "../components";
export const NotesLayout: React.FC<ChildrenProps> = ({
  children,
}: ChildrenProps) => {
  return (
    <Box>
      <Navbar />
      <Box component="main">
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};
