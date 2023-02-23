import { IconButton } from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { NotesLayout } from "../layout/NotesLayout";
import { WrapperBox } from "../../components/WrapperBox";
import { NoteView, NothingSelectedView } from "../views";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { onSetActiveNote } from "../../store/userSlice";

export const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  const { user, activeNote } = useSelector((state: RootState) => state.auth);

  const onAddNewNote = (): void => {
    const newNote = {
      _id: "",
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
        {activeNote ? <NoteView /> : <NothingSelectedView />}
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
          // disabled={isSaving}
        >
          <AddOutlinedIcon />
        </IconButton>
      </WrapperBox>
    </NotesLayout>
  );
};
