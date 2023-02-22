import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Alert,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { AuthLayout } from "../layout";
import { useRegisterMutation } from "../../store/apiSlice";

export const RegisterPage: React.FC = () => {
  const [register, { isError, error, isLoading }] = useRegisterMutation();
  const registerError: any = error;

  const { getFieldProps, handleSubmit, errors, touched } = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .trim()
        .required("Campo requerido")
        .min(3, "Minimo 3 caracteres"),
      email: Yup.string()
        .email("Correo electronico invalido")
        .required("Campo requerido"),
      password: Yup.string()
        .min(6, "Minimo 6 caracteres")
        .required("Campo requerido"),
    }),
    onSubmit: (values) => {
      register({ ...values });
    },
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <AuthLayout title="Crear cuenta">
      <form onSubmit={handleSubmit}>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Nombre de usuario"
              type="text"
              placeholder="Tu nombre"
              fullWidth
              autoComplete="off"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <PersonIcon />
                  </InputAdornment>
                ),
              }}
              {...getFieldProps("username")}
              error={!!errors.username && touched.username}
              helperText={touched.username && errors.username}
              sx={{
                "& label": {
                  color: "text.primary",
                },
              }}
            />
            {isError && !!registerError?.data.errors?.username?.msg && (
              <Alert variant="filled" severity="error" sx={{ marginBlock: 1 }}>
                {registerError?.data?.errors?.username?.msg}
              </Alert>
            )}
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Correo electronico"
              type="email"
              placeholder="correo@correo.com"
              fullWidth
              autoComplete="off"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
              {...getFieldProps("email")}
              error={!!errors.email && touched.email}
              helperText={touched.email && errors.email}
              sx={{
                "& label": {
                  color: "text.primary",
                },
              }}
            />
            {isError && !!registerError?.data.errors?.email?.msg && (
              <Alert variant="filled" severity="error" sx={{ marginBlock: 1 }}>
                {registerError?.data?.errors?.email?.msg}
              </Alert>
            )}
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Contraseña"
              type={showPassword ? "text" : "password"}
              placeholder="Contraseña"
              fullWidth
              autoComplete="password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              {...getFieldProps("password")}
              error={!!errors.password && touched.password}
              helperText={touched.password && errors.password}
              sx={{
                "& label": {
                  color: "text.primary",
                },
              }}
            />
            {isError && !!registerError?.data.errors?.password?.msg && (
              <Alert variant="filled" severity="error" sx={{ marginBlock: 1 }}>
                {registerError?.data?.errors?.password?.msg}
              </Alert>
            )}
          </Grid>
          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12}>
              <Button
                title="Crear cuenta"
                aria-label="Crear cuenta"
                type="submit"
                variant="contained"
                fullWidth
                disabled={isLoading}
              >
                <Typography>Crear cuenta</Typography>
              </Button>
            </Grid>
          </Grid>
          <Grid container direction="row" justifyContent="end">
            <Typography sx={{ mr: 1, fontSize: 14 }}>
              ¿Ya tienes una cuenta?
            </Typography>
            <Link
              component={RouterLink}
              sx={{ fontSize: 14 }}
              color="inherit"
              to={"/auth/login"}
            >
              ingresa
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
