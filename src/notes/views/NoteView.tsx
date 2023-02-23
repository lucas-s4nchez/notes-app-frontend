import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  DeleteOutline,
  FileUploadOutlined,
  SaveOutlined,
} from "@mui/icons-material";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { RootState } from "../../store";
import { useAddNoteMutation } from "../../store/apiSlice";
import { useEffect, useState } from "react";

const getInitialValues = (activeNote?: any) => ({
  title: activeNote?.title ?? "",
  content: activeNote?.content ?? "",
});

export const NoteView = () => {
  const [addNote] = useAddNoteMutation();
  const { activeNote, user } = useSelector((state: RootState) => state.auth);
  const [initialValues, setInitialValues] = useState({
    title: activeNote?.title ?? "",
    content: activeNote?.content ?? "",
  });
  const dispatch = useDispatch();
  const { getFieldProps, handleSubmit, resetForm, errors, touched } = useFormik(
    {
      initialValues,
      validationSchema: Yup.object({
        title: Yup.string()
          .trim()
          .min(3, "Minimo 3 caracteres")
          .required("Campo requerido"),
        content: Yup.string()
          .trim()
          .min(5, "Minimo 5 caracteres")
          .required("Campo requerido"),
      }),
      onSubmit: (values) => {
        addNote({
          title: values?.title?.trim()!,
          content: values?.content?.trim()!,
          date: Date.now(),
          user: user,
        });
      },
    }
  );

  useEffect(() => {
    resetForm();
  }, [activeNote]);
  // const formattedDate = useMemo(() => {
  //   const newDate = new Date(date);
  //   return new Intl.DateTimeFormat("es-ES", { dateStyle: "full" }).format(
  //     newDate
  //   );
  // }, [date]);

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <Grid item>
        <Typography
          fontWeight="light"
          textTransform="capitalize"
          sx={{ fontSize: { xs: 20, sm: 24, md: 30 } }}
        >
          jiji
        </Typography>
      </Grid>

      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          type="text"
          placeholder="Título"
          label="Título"
          fullWidth
          variant="filled"
          {...getFieldProps("title")}
          error={!!errors.title && touched.title}
          helperText={touched.title && errors.title}
          sx={{ border: "none", mb: 1 }}
        />
        <TextField
          type="text"
          placeholder="¿Qué sucedió en el día de hoy?"
          label="Descripción"
          fullWidth
          multiline
          variant="filled"
          minRows={5}
          {...getFieldProps("content")}
          error={!!errors.content && touched.content}
          helperText={touched.content && errors.content}
          sx={{ border: "none", mb: 1 }}
        />
        <Button
          type="submit"
          color="primary"
          sx={{ padding: { xs: 0, sm: 1, md: 2 } }}
        >
          <SaveOutlined
            sx={{ fontSize: { xs: 20, md: 30 }, fontWeight: "light" }}
          />
          <Typography sx={{ fontSize: { xs: 10, md: 16 } }}>Guardar</Typography>
        </Button>
      </Box>
      {/* <Grid container justifyContent="end" sx={{ mt: 2 }}>
        <Button color="error" onClick={onDelete}>
          Borrar <DeleteOutline />
        </Button>
      </Grid> */}
      {/* <ImageGallery images={imageUrls} /> */}
    </Grid>
  );
};
