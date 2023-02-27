import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useLoginMutation } from "../../store";
import { AuthLayout } from "../layout";
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
import EmailIcon from "@mui/icons-material/Email";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export const LoginPage: React.FC = () => {
  const [login, { isError, error, isLoading }] = useLoginMutation();
  const loginErrors: any = error;

  const { getFieldProps, handleSubmit, errors, touched } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Correo electronico invalido")
        .required("Campo requerido"),
      password: Yup.string()
        .min(6, "Minimo 6 caracteres")
        .required("Campo requerido"),
    }),
    onSubmit: async (values) => {
      const { data }: any = await login({ ...values });
    },
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <AuthLayout title={"Iniciar sesión"}>
      <form onSubmit={handleSubmit}>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2, color: "secondary.main" }}>
            <TextField
              label="Correo electronico"
              type="email"
              placeholder="correo@correo.com"
              autoComplete="off"
              fullWidth
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
            {isError && !!loginErrors?.data.errors?.email?.msg && (
              <Alert variant="filled" severity="error" sx={{ marginBlock: 1 }}>
                {loginErrors?.data?.errors?.email?.msg}
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
            {isError && !!loginErrors?.data.errors?.password?.msg && (
              <Alert variant="filled" severity="error" sx={{ marginBlock: 1 }}>
                {loginErrors?.data?.errors?.password?.msg}
              </Alert>
            )}
          </Grid>
          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12}>
              <Button
                title="Iniciar sesión"
                aria-label="Iniciar sesión"
                type="submit"
                variant="contained"
                fullWidth
                disabled={isLoading}
              >
                <Typography>Iniciar sesion</Typography>
              </Button>
            </Grid>
          </Grid>
          <Grid container direction="row" justifyContent="end">
            <Typography sx={{ mr: 1, fontSize: 14 }}>
              ¿No tienes una cuenta?
            </Typography>
            <Link
              component={RouterLink}
              sx={{ fontSize: 14 }}
              color="inherit"
              to={"/auth/register"}
            >
              registrarse
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
