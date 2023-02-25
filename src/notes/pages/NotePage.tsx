import { useParams } from "react-router-dom";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useGetNoteByIdQuery } from "../../store/apiSlice";

interface CustomFetchBaseQueryError {
  status: number;
  data?: { ok: boolean; msg: string };
  error?: string;
}

export const NotePage: React.FC = () => {
  const params = useParams();
  const id: string = params.id!;
  const {
    data: note,
    isLoading: isLoadingNote,
    isError,
    error,
  } = useGetNoteByIdQuery(id);

  if (isLoadingNote) {
    return <p>...cargando</p>;
  }

  if (isError) {
    const { data, status } = error as CustomFetchBaseQueryError;
    if (data) {
      const { ok, msg: errorMessage } = data;
      return (
        <div>
          <div>Ocurrió un error:</div>
          <div>{`${errorMessage} (${status})`}</div>
        </div>
      );
    }
  }

  return (
    <>
      <p>{note?.title}</p>
      <p>{note?.content}</p>
    </>
  );
};
