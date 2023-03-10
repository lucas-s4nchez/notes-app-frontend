import { Box, Typography, Paper } from "@mui/material";
import { WrapperBox } from "../../components/WrapperBox";
import { IAuthLayoutProps } from "../../interfaces";

export const AuthLayout: React.FC<IAuthLayoutProps> = ({
  children,
  title,
}: IAuthLayoutProps) => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        backgroundColor: "primary.main",
      }}
    >
      <WrapperBox>
        <Paper
          sx={{
            width: { sm: 450 },
            padding: { xs: 2, sm: 3 },
            borderRadius: 2,
            boxShadow: "0px 5px 5px rgba(0, 0, 0, 0.2)",
            margin: "auto",
          }}
        >
          <Typography variant="h5" sx={{ mb: 1 }}>
            {title}
          </Typography>
          {children}
        </Paper>
      </WrapperBox>
    </Box>
  );
};
