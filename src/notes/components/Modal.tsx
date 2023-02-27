import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { onCloseModal, useAddNoteMutation } from "../../store";
import { RootState } from "../../store/store";

import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";

export const Modal: React.FC = () => {
  const dispatch = useDispatch();
  const { isModalOpen } = useSelector((state) => (state as RootState).ui);
  const { user } = useSelector((state) => (state as RootState).auth);
  const [addNote] = useAddNoteMutation();
  const { getFieldProps, handleSubmit, handleReset, errors, touched } =
    useFormik({
      initialValues: {
        title: "",
        content: "",
      },
      validationSchema: Yup.object({
        title: Yup.string()
          .required("El título es obligatorio")
          .min(3, "El título debe tener al menos 3 caracteres"),
        content: Yup.string()
          .required("La descripción es obligatoria")
          .min(5, "La descripción debe tener al menos 5 caracteres"),
      }),
      onSubmit: async (values, { resetForm }) => {
        const newNote = {
          title: values.title,
          content: values.content,
          date: Date.now(),
          user: user,
        };
        await addNote(newNote);
        resetForm();
        dispatch(onCloseModal());
      },
      onReset: () => {
        dispatch(onCloseModal());
      },
    });
  return (
    <Dialog open={isModalOpen} fullWidth>
      <DialogTitle>Crea una nueva nota</DialogTitle>
      <DialogContent>
        <Box
          component={"form"}
          onSubmit={handleSubmit}
          onReset={handleReset}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            marginBlock: 2,
            width: "100%",
            maxWidth: "600px",
          }}
        >
          <Box>
            <TextField
              type="text"
              placeholder="Título"
              label="Título"
              fullWidth
              variant="outlined"
              {...getFieldProps("title")}
              error={!!errors.title && touched.title}
              // helperText={touched.title && errors.title}
              helperText="***El título debe tener al menos 3 caracteres***"
              FormHelperTextProps={{
                style: { color: "InfoText" }, // Cambia el color del helper text aquí
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
          <Box>
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
              // helperText={touched.content && errors.content}
              helperText="***La descripción debe tener al menos 5 caracteres***"
              FormHelperTextProps={{
                style: { color: "InfoText" }, // Cambia el color del helper text aquí
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
              display: "flex",
              flexDirection: { xs: "column", sm: "row", gap: "10px" },
              justifyContent: "flex-end",
            }}
          >
            <Button
              variant="contained"
              color="error"
              type="reset"
              endIcon={<DoDisturbIcon />}
            >
              Cancelar
            </Button>
            <Button type="submit" variant="contained" endIcon={<SaveIcon />}>
              Guardar
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
