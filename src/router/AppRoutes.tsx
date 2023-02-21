import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage, RegisterPage } from "../auth/pages";
import { HomePage } from "../notes/pages";

// type AuthenticationState = Authenticated | NotAuthenticated | Checking;

export const AppRoutes = () => {
  const status: string = "not-authenticated";

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