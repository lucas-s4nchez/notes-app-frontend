import { styled } from "@mui/system";
import {
  Button,
  CardActions,
  CardContent,
  Typography,
  Link,
  Card as CardMUI,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { CardItemProps } from "../../interfaces";
import { formattedDate } from "../../helpers/formattedDate";

const ContentStyled = styled(Typography)(({ theme }) => ({
  display: "-webkit-box",
  WebkitLineClamp: 1,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
}));
const TitleStyled = styled(Typography)(({ theme }) => ({
  display: "-webkit-box",
  WebkitLineClamp: 1,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  fontSize: 25,
}));

export const Card: React.FC<CardItemProps> = ({
  _id,
  title,
  content,
  date,
  user,
}: CardItemProps) => {
  return (
    <CardMUI sx={{ width: "100%" }}>
      <CardContent>
        <Typography sx={{ fontSize: 14, color: "GrayText" }}>
          {formattedDate(date)}
        </Typography>
        <TitleStyled>{title}</TitleStyled>
        <ContentStyled>{content}</ContentStyled>
      </CardContent>
      <CardActions>
        <Link
          component={RouterLink}
          to={`/notes/${_id}`}
          sx={{ textDecoration: "none" }}
        >
          <Button size="small" variant="contained">
            Ver
          </Button>
        </Link>
      </CardActions>
    </CardMUI>
  );
};
