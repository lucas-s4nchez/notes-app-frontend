import { memo } from "react";
import { styled } from "@mui/system";
import {
  Box,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Typography,
} from "@mui/material";
import { TurnedInNot } from "@mui/icons-material";
import { SidebarItemProps } from "../../interfaces";
const notes = [
  { id: "1", title: "nota 1", content: "content de nota 1", date: Date.now() },
  { id: "2", title: "nota 2", content: "content de nota 2", date: Date.now() },
];

const TwoLinesText = styled(Typography)(({ theme }) => ({
  display: "-webkit-box",
  WebkitLineClamp: 1,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
}));

export const SidebarItem: React.MemoExoticComponent<
  React.FC<SidebarItemProps>
> = memo(({ _id, title, content, date, user }: SidebarItemProps) => {
  const handleActiveNote = (): void => {
    const currentNote = { _id, title, content, date, user };
    console.log(currentNote);
  };

  return (
    <>
      <ListItem
        disablePadding
        onClick={handleActiveNote}
        // sx={{ borderBottom: "1px solid #000" }}
      >
        <ListItemButton sx={{ padding: 1 }}>
          <ListItemIcon
            sx={{
              minWidth: "max-content",
              maxHeight: "max-content",
              paddingRight: 2,
            }}
          >
            <TurnedInNot sx={{ width: "100%" }} />
          </ListItemIcon>
          <Box
            sx={{
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <Typography>{title}</Typography>
            <TwoLinesText>{content}</TwoLinesText>
          </Box>
        </ListItemButton>
      </ListItem>
      <Divider />
    </>
  );
});
