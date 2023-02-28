import { Grid, Skeleton } from "@mui/material";
import { NotesLayout } from "../layout/NotesLayout";

export const NotePageSkeletonLoader: React.FC = () => {
  return (
    <NotesLayout>
      <Grid
        container
        direction="column"
        gap={3}
        marginBottom={10}
        marginTop={10}
      >
        <Skeleton variant="rectangular" width={"100%"} height={56} />
        <Skeleton variant="rectangular" width={"100%"} height={148} />
      </Grid>
    </NotesLayout>
  );
};
