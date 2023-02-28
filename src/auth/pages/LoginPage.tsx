import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  hasError,
  onChangePasswordVisibility,
  onClearError,
  useLoginMutation,
} from "../../store";
import { AuthLayout } from "../layout";
import {
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
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { MessageAlert } from "../components";

export const LoginPage: React.FC = () => {
  const dispatch = useDispatch();
  const { isVisiblePassword, errorMessage } = useSelector(
    (state) => (state as RootState).ui
  );
  const [login, { isLoading }] = useLoginMutation();

  const { getFieldProps, handleSubmit, errors, touched } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("El email es obligatorio")
        .email("Email no válido"),
      password: Yup.string()
        .required("La contraseña es obligatoria")
        .min(6, "La contraseña debe tener al menos 6 caracteres"),
    }),
    onSubmit: async (values) => {
      const { error }: any = await login({ ...values });
      if (error) {
        const {
          data: {
            errors: { email, password },
          },
        } = error;
        if (email) {
          dispatch(hasError(email.msg));
        }
        if (password) {
          dispatch(hasError(password.msg));
        }
        setTimeout(() => {
          dispatch(onClearError());
        }, 3000);
      }
    },
  });

  useEffect(() => {
    dispatch(onClearError());
  }, []);
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
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Contraseña"
              type={isVisiblePassword ? "text" : "password"}
              placeholder="Contraseña"
              fullWidth
              autoComplete="password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => dispatch(onChangePasswordVisibility())}
                      edge="end"
                    >
                      {isVisiblePassword ? <VisibilityOff /> : <Visibility />}
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
            {errorMessage && <MessageAlert message={errorMessage} />}
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
