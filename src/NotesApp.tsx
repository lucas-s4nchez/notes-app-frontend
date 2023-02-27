import { AppRoutes } from "./router/AppRoutes";
import { AppTheme } from "./theme";

const NotesApp: React.FC = () => {
  return (
    <>
      <AppTheme>
        <AppRoutes />
      </AppTheme>
    </>
  );
};

export default NotesApp;
