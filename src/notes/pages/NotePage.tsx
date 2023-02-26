import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useDeleteNoteMutation,
  useGetNoteByIdQuery,
  useUpdateNoteMutation,
} from "../../store/apiSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import { WrapperBox } from "../../components/WrapperBox";
import { NotesLayout } from "../layout/NotesLayout";

import {
  Alert,
  Box,
  Button,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface CustomFetchBaseQueryError {
  status: number;
  data?: { ok: boolean; msg: string };
  error?: string;
}

export const NotePage: React.FC = () => {
  const params = useParams();
  const navigate = useNavigate();
  const id: string = params.id!;
  const {
    data: note,
    isLoading: isLoadingNote,
    isError,
    error,
  } = useGetNoteByIdQuery(id);
  const [updateNote] = useUpdateNoteMutation();
  const [deleteNote] = useDeleteNoteMutation();
  const [isNoteModified, setIsNoteModified] = useState(false);

  const { getFieldProps, handleSubmit, resetForm, errors, touched, values } =
    useFormik({
      initialValues: {
        title: "",
        content: "",
      },
      validationSchema: Yup.object({
        title: Yup.string()
          .required("El título es obligatorio")
          .min(3, "El título debe tener al menos 3 caracteres")
          .trim(),
        content: Yup.string()
          .required("La descripción es obligatoria")
          .min(5, "La descripción debe tener al menos 5 caracteres")
          .trim(),
      }),
      onSubmit: async (values, { resetForm }) => {
        if (!!note) {
          await updateNote({
            _id: note._id,
            title: values.title.trim(),
            content: values.content.trim(),
            date: Date.now(),
            user: note.user,
          });
        }
      },
    });
  useEffect(() => {
    if (!!note) {
      resetForm({ values: { title: note.title, content: note.content } });
    }
  }, [note]);
  useEffect(() => {
    if (note) {
      const { title: initialTitle, content: initialContent } = note;
      const { title: currentTitle, content: currentContent } = values;
      setIsNoteModified(
        initialTitle.trim() !== currentTitle.trim() ||
          initialContent.trim() !== currentContent.trim()
      );
    }
  }, [note, values]);

  const formattedDate = useMemo(() => {
    if (!note) return;
    const newDate = new Date(note.date);
    return new Intl.DateTimeFormat("es-ES", { dateStyle: "full" }).format(
      newDate
    );
  }, [note]);

  const onDeleteNote = async () => {
    await deleteNote(id);
    navigate("/", { replace: true });
  };

  if (isLoadingNote) {
    return <p>...cargando</p>;
  }

  if (isError) {
    const { data, status } = error as CustomFetchBaseQueryError;
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
      <WrapperBox>
        <Box>
          <IconButton
            title="Volver"
            aria-label="Volver a la pagina anterior"
            onClick={() => navigate("/")}
            sx={{ marginTop: 1 }}
          >
            <ArrowBackIcon />
          </IconButton>
        </Box>
        <Grid container direction="column" marginBottom={3}>
          <Grid item>
            <Typography
              fontWeight="light"
              sx={{
                fontSize: { xs: 14, sm: 16 },
                marginBottom: 3,
                textAlign: "end",
              }}
            >
              {formattedDate}
            </Typography>
          </Grid>
          <Grid container component="form" onSubmit={handleSubmit} gap={2}>
            <Box sx={{ width: "100%" }}>
              <TextField
                type="text"
                placeholder="Título"
                label="Título"
                fullWidth
                variant="outlined"
                {...getFieldProps("title")}
                error={!!errors.title && touched.title}
                helperText="***El título debe tener al menos 3 caracteres***"
                FormHelperTextProps={{
                  style: { color: "InfoText" },
                }}
                sx={{
                  border: "none",
                  mb: 1,
                  "& label": {
                    color: "text.primary",
                  },
                }}
              />
              {!!errors.title && touched.title && (
                <Alert variant="filled" severity="error">
                  {errors.title}
                </Alert>
              )}
            </Box>
            <Box sx={{ width: "100%" }}>
              <TextField
                type="text"
                placeholder="¿Qué sucedió en el día de hoy?"
                label="Descripción"
                fullWidth
                multiline
                variant="outlined"
                minRows={5}
                {...getFieldProps("content")}
                error={!!errors.content && touched.content}
                helperText="***La descripción debe tener al menos 5 caracteres***"
                FormHelperTextProps={{
                  style: { color: "InfoText" },
                }}
                sx={{
                  border: "none",
                  mb: 1,
                  "& label": {
                    color: "text.primary",
                  },
                }}
              />
              {!!errors.content && touched.content && (
                <Alert variant="filled" severity="error">
                  {errors.content}
                </Alert>
              )}
            </Box>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: { xs: "column", sm: "row", gap: "10px" },
                justifyContent: "flex-end",
              }}
            >
              <Button
                variant="contained"
                color="error"
                endIcon={<DeleteIcon />}
                onClick={onDeleteNote}
              >
                Eliminar
              </Button>
              <Button
                type="submit"
                variant="contained"
                endIcon={<SaveAsIcon />}
                disabled={!isNoteModified || !!errors.title || !!errors.content}
              >
                Modificar
              </Button>
            </Box>
          </Grid>
        </Grid>
      </WrapperBox>
    </NotesLayout>
  );
};
