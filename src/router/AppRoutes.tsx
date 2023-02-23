import { CircularProgress, Grid } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage, RegisterPage } from "../auth/pages";
import { HomePage } from "../notes/pages";
import { RootState } from "../store";
import { useRefeshTokenQuery } from "../store/apiSlice";
import { onLogin, onLogout } from "../store/userSlice";

export const AppRoutes: React.FC = () => {
  const { status } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const { data, isLoading } = useRefeshTokenQuery();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      dispatch(onLogout());
    } else {
      try {
        if (data?.token) {
          // Verificar si data tiene un valor para token
          localStorage.setItem("token", data.token);
          dispatch(onLogin({ username: data.username, uid: data.uid }));
        }
      } catch (error) {
        localStorage.clear();
        dispatch(onLogout());
      }
    }
  }, [isLoading, token]);
  useEffect(() => {}, [token, isLoading]);

  if (status === "checking") {
    return (
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: "100vh", backgroundColor: "primary.main", padding: 4 }}
      >
        <Grid container direction="row" justifyContent="center">
          <CircularProgress color="warning" data-testid="circular-progress" />
        </Grid>
      </Grid>
    );
  }

  return (
    <Routes>
      {status === "not-authenticated" ? (
        <>
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/register" element={<RegisterPage />} />
          <Route path="/*" element={<Navigate to={"/auth/login"} />} />
        </>
      ) : (
        <>
          <Route path="/" element={<HomePage />} />
          <Route path="/*" element={<Navigate to={"/"} />} />
        </>
      )}
    </Routes>
  );
};
