import { IconButton } from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { NotesLayout } from "../layout/NotesLayout";
import { WrapperBox } from "../../components/WrapperBox";
import { NoteView, NothingSelectedView } from "../views";

export const HomePage: React.FC = () => {
  const activeNote = false;
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
            backgroundColor: "error.main",
            position: "fixed",
            right: 50,
            bottom: 50,
            ":hover": { backgroundColor: "error.main", opacity: 0.9 },
          }}
          // onClick={onAddNewNote}
          // disabled={isSaving}
        >
          <AddOutlinedIcon />
        </IconButton>
      </WrapperBox>
    </NotesLayout>
  );
};
