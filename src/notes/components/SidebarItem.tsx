import { memo } from "react";
import {
  Grid,
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

export const SidebarItem: React.MemoExoticComponent<
  React.FC<SidebarItemProps>
> = memo(({ id, title, content }: SidebarItemProps) => {
  const handleActiveNote = (): void => {
    const currentNote = notes.find((note) => note.id === id);
    console.log(currentNote);
  };

  return (
    <ListItem disablePadding onClick={handleActiveNote}>
      <ListItemButton>
        <ListItemIcon>
          <TurnedInNot />
        </ListItemIcon>
        <Grid container overflow="hidden">
          <Typography
            sx={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {title}
          </Typography>
          <Typography>{content}</Typography>
        </Grid>
      </ListItemButton>
    </ListItem>
  );
});
