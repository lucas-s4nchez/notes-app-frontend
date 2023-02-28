import { Box, Skeleton } from "@mui/material";
import { NotesLayout } from "../layout/NotesLayout";

export const HomePageSkeletonLoader: React.FC = () => {
  return (
    <>
      <NotesLayout>
        <Box
          sx={{
            marginBlock: 2,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(265px, 1fr))",
            gap: 2,
          }}
        >
          <Skeleton variant="rectangular" width={"100%"} height={160} />
          <Skeleton variant="rectangular" width={"100%"} height={160} />
          <Skeleton variant="rectangular" width={"100%"} height={160} />
          <Skeleton variant="rectangular" width={"100%"} height={160} />
        </Box>
      </NotesLayout>
    </>
  );
};
