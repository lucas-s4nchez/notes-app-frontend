import { Box, IconButton } from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { NotesLayout } from "../layout/NotesLayout";
import { WrapperBox } from "../../components/WrapperBox";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { onSetActiveNote } from "../../store/userSlice";
import { useGetNotesQuery } from "../../store/apiSlice";
import { Card } from "../components/Card";

export const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  const { user, activeNote } = useSelector((state: RootState) => state.auth);
  const { data: notes, isLoading: isLoadingNotes } = useGetNotesQuery();

  const onAddNewNote = (): void => {
    const newNote = {
      title: "",
      content: "",
      date: new Date().getTime(),
      user,
    };
    dispatch(onSetActiveNote({ ...newNote }));
  };
  return (
    <NotesLayout>
      <WrapperBox>
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
      </WrapperBox>
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
        onClick={onAddNewNote}
      >
        <AddOutlinedIcon />
      </IconButton>
    </NotesLayout>
  );
};
