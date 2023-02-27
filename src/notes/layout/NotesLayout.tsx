import { WrapperBox } from "../../components";
import { Navbar } from "../components";
import { IChildrenProps } from "../../interfaces";
import { Box, Toolbar } from "@mui/material";
export const NotesLayout: React.FC<IChildrenProps> = ({
  children,
}: IChildrenProps) => {
  return (
    <Box>
      <Navbar />
      <Box component="main">
        <Toolbar />
        <WrapperBox>{children}</WrapperBox>
      </Box>
    </Box>
  );
};
