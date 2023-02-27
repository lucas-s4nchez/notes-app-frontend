import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { useRefeshTokenQuery } from "../store";
import { RootState } from "../store/store";
import { LoginPage, RegisterPage } from "../auth/pages";
import { HomePage, NotePage } from "../notes/pages";
import { CircularProgress, Grid } from "@mui/material";

export const AppRoutes: React.FC = () => {
  const { status, token } = useSelector((state: RootState) => state.auth);
  useRefeshTokenQuery();

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
          <Route path="/notes/:id" element={<NotePage />} />
          <Route path="/*" element={<Navigate to={"/"} />} />
        </>
      )}
    </Routes>
  );
};
