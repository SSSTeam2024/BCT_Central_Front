import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface EmailSent {
  _id?: string;
  date: string;
  quoteID?: string;
  subjectEmail: string;
  from: string;
  to: string;
}

export const emailSentSlice = createApi({
  reducerPath: "EmailSent",
  baseQuery: fetchBaseQuery({
    baseUrl: "${process.env.REACT_APP_BASE_URL}/api/emailSent",
  }),
  tagTypes: ["EmailSent"],
  endpoints(builder) {
    return {
      getAllSentEmails: builder.query<EmailSent[], number | void>({
        query() {
          return "/allEmailsSent";
        },
        providesTags: ["EmailSent"],
      }),
      getAttachmentByID: builder.query<EmailSent, string | void>({
        query: (_id) => ({
          url: `/get_attachment/${_id}`,
          method: "GET",
        }),
        providesTags: ["EmailSent"],
      }),
      addNewEmailSent: builder.mutation<void, EmailSent>({
        query(payload) {
          return {
            url: "/newEmailSent",
            method: "POST",
            body: payload,
          };
        },
        invalidatesTags: ["EmailSent"],
      }),
      deleteEmailSent: builder.mutation<void, EmailSent>({
        query: (_id) => ({
          url: `/deleteEmailSent/${_id}`,
          method: "Delete",
        }),
        invalidatesTags: ["EmailSent"],
      }),
    };
  },
});

export const {
  useAddNewEmailSentMutation,
  useDeleteEmailSentMutation,
  useGetAllSentEmailsQuery,
  useGetAttachmentByIDQuery
} = emailSentSlice;