import { RootState } from "../store";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  IAddNoteBody,
  ILoginCredentials,
  INote,
  IRegisterCredentials,
  IUpdateNoteBody,
  IUser,
} from "../../interfaces";

const API_BASE_URL = "http://localhost:3000/api/";

export const notesApi = createApi({
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
    login: builder.mutation<IUser, ILoginCredentials>({
      query: ({ email, password }) => ({
        url: "/auth/login",
        method: "POST",
        body: {
          email,
          password,
        },
      }),
    }),
    register: builder.mutation<IUser, IRegisterCredentials>({
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
    getNotes: builder.query<INote[], void>({
      query: () => ({
        url: "/notes",
        method: "GET",
        refetchOnMountOrArgChange: true,
      }),
      transformResponse: (response: { ok: boolean; notes: INote[] }) =>
        response.notes,
      providesTags: ["notes"],
    }),
    getNoteById: builder.query<INote, string>({
      query: (id) => ({
        url: `/notes/${id}`,
        method: "GET",
        refetchOnMountOrArgChange: true,
      }),
      transformResponse: (response: { ok: boolean; note: INote }) =>
        response.note,
    }),
    addNote: builder.mutation<void, IAddNoteBody>({
      query: (note) => ({
        url: "/notes",
        method: "POST",
        body: { ...note },
      }),
      invalidatesTags: ["notes"],
    }),
    updateNote: builder.mutation<void, IUpdateNoteBody>({
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
} = notesApi;
