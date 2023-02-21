import { Grid, Typography } from "@mui/material";
import PostAddOutlinedIcon from "@mui/icons-material/PostAddOutlined";

export const NothingSelectedView: React.FC = () => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        minHeight: "calc(100vh - 115px)",
        backgroundColor: "primary.main",
        padding: 4,
        borderRadius: 1,
      }}
    >
      <Grid item xs={12}>
        <PostAddOutlinedIcon sx={{ fontSize: 100, color: "secondary.main" }} />
      </Grid>
      <Grid item xs={12}>
        <Typography color="secondary.main" variant="h6" textAlign="center">
          Selecciona o crea una entrada
        </Typography>
      </Grid>
    </Grid>
  );
};
