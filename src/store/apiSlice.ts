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
  date: Date;
  user: User;
}
const token = localStorage.getItem("token");

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
    refeshToken: builder.query<any, void>({
      query: (uid) => ({
        url: "/auth/renew",
        method: "GET",
        headers: {
          "x-token": token!,
        },
      }),
    }),
    getNotes: builder.query<Note[], string>({
      query: (token: string) => ({
        url: "/notes",
        method: "GET",
        headers: {
          "x-token": token,
        },
        refetchOnMountOrArgChange: true,
      }),
      transformResponse: (response: { ok: boolean; notes: Note[] }) =>
        response.notes,
      providesTags: ["notes"],
    }),

    addNote: builder.mutation<void, NoteBody>({
      query: (note) => ({
        url: "/notes",
        method: "POST",
        headers: {
          "x-token": token!,
        },
        body: { ...note },
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
  useRefeshTokenQuery,
  useGetNotesQuery,
  useAddNoteMutation,
  useUpdateNoteMutation,
  useDeleteNoteMutation,
} = api;
