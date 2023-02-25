import { RootState } from "./index";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_BASE_URL = "http://localhost:3000/api/";

interface User {
  ok?: boolean;
  uid?: string;
  username?: string;
  token: string;
}
interface LoginCredentials {
  email: string;
  password: string;
}
interface RegisterCredentials {
  email: string;
  password: string;
  username: string;
}
interface NoteBody {
  title: string;
  content: string;
  date: number;
  user:
    | {
        username: string;
        uid: string;
      }
    | {};
}
interface Note {
  _id: string;
  title: string;
  content: string;
  date: string;
  user: User;
}

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      const token =
        (getState() as RootState).auth.token || localStorage.getItem("token");
      if (token) {
        headers.set("x-token", `${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["notes"],

  endpoints: (builder) => ({
    login: builder.mutation<User, LoginCredentials>({
      query: ({ email, password }) => ({
        url: "/auth/login",
        method: "POST",
        body: {
          email,
          password,
        },
      }),
    }),
    register: builder.mutation<User, RegisterCredentials>({
      query: ({ email, password, username }) => ({
        url: "/auth/register",
        method: "POST",
        body: {
          email,
          password,
          username,
        },
      }),
    }),
    refeshToken: builder.query<any, void>({
      query: () => ({
        url: "/auth/renew",
        method: "GET",
      }),
    }),
    getNotes: builder.query<Note[], void>({
      query: () => ({
        url: "/notes",
        method: "GET",
        refetchOnMountOrArgChange: true,
      }),
      transformResponse: (response: { ok: boolean; notes: Note[] }) =>
        response.notes,
      providesTags: ["notes"],
    }),
    getNoteById: builder.query<Note, string>({
      query: (id) => ({
        url: `/notes/${id}`,
        method: "GET",
        refetchOnMountOrArgChange: true,
      }),
      transformResponse: (response: { ok: boolean; note: Note }) =>
        response.note,
      providesTags: ["notes"],
    }),
    addNote: builder.mutation<void, NoteBody>({
      query: (note) => ({
        url: "/notes",
        method: "POST",
        body: { ...note },
      }),
      invalidatesTags: ["notes"],
    }),
    updateNote: builder.mutation<void, Note>({
      query: ({ ...note }) => ({
        url: `/notes/${note._id}`,
        method: "PUT",
        body: note,
      }),
      invalidatesTags: ["notes"],
    }),
    deleteNote: builder.mutation<void, string>({
      query: (id) => ({
        url: `/notes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["notes"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useRefeshTokenQuery,
  useGetNotesQuery,
  useGetNoteByIdQuery,
  useAddNoteMutation,
  useUpdateNoteMutation,
  useDeleteNoteMutation,
} = api;
