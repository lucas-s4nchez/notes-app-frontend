import { useDispatch } from "react-redux";
import { onOpenModal, useGetNotesQuery } from "../../store";
import { NotesLayout } from "../layout/NotesLayout";
import { Card, Modal, HomePageSkeletonLoader } from "../components";
import { Box, IconButton } from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { ICustomFetchBaseQueryError } from "../../interfaces";

export const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  const {
    data: notes,
    isLoading: isLoadingNotes,
    isError,
    error,
  } = useGetNotesQuery();

  if (isLoadingNotes) {
    return <HomePageSkeletonLoader />;
  }

  if (isError) {
    const { data, status } = error as ICustomFetchBaseQueryError;
    if (data) {
      const { ok, msg: errorMessage } = data;
      return (
        <div>
          <div>Ocurrió un error:</div>
          <div>{`${errorMessage} (${status})`}</div>
        </div>
      );
    }
  }

  return (
    <NotesLayout>
      <Box
        sx={{
          marginBlock: 2,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(265px, 1fr))",
          gap: 2,
        }}
      >
        {notes?.map((note) => (
          <Card key={note._id} {...note} />
        ))}
      </Box>
      <IconButton
        title="Crear una nota"
        aria-label="Crear una nota"
        size="large"
        sx={{
          color: "white",
          backgroundColor: "primary.main",
          position: "fixed",
          right: 50,
          bottom: 50,
          ":hover": { backgroundColor: "primary.main", opacity: 0.9 },
        }}
        onClick={() => dispatch(onOpenModal())}
      >
        <AddOutlinedIcon />
      </IconButton>
      <Modal />
    </NotesLayout>
  );
};
