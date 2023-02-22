import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_BASE_URL = "http://localhost:3000/api/";

interface User {
  ok?: boolean;
  uid?: string;
  username?: string;
  token?: string;
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
interface Note {
  _id: string;
  title: string;
  content: string;
  data: Date;
  user: User;
}
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2M2VmYzEyN2RmZmVjYzAwZjY3MzI4ZGQiLCJ1c2VybmFtZSI6ImVtaXIiLCJpYXQiOjE2NzcwNDE5ODIsImV4cCI6MTY3NzA0OTE4Mn0.fmf0AyPTOPGf7Ewh2s31qt7_cXD2EWppjmEhH-OnGc0";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
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
    getNotes: builder.query<Note[], void>({
      query: () => ({
        url: "/notes",
        method: "GET",
        headers: {
          "x-token": token,
        },
      }),
      transformResponse: (response: { ok: boolean; notes: Note[] }) =>
        response.notes,
      providesTags: ["notes"],
    }),
    addNote: builder.mutation<void, Note>({
      query: (note) => ({
        url: "/notes",
        method: "POST",
        body: note,
      }),
      invalidatesTags: ["notes"],
    }),
    updateNote: builder.mutation<void, Note & { id: string }>({
      query: ({ id, ...note }) => ({
        url: `/notes/${id}`,
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
  useGetNotesQuery,
  useAddNoteMutation,
  useUpdateNoteMutation,
  useDeleteNoteMutation,
} = api;
