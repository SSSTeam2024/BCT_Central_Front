import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface EmailQueue {
  _id?: string;
  newEmail: string;
  subject: string;
  body: string;
  file: string;
  sender: string;
  name: string;
}

export interface DeleteEmailQueues {
    ids?: string[];
  }

export const emailQueueSlice = createApi({
  reducerPath: "emailQueue",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}/api/emailQueue`,
  }),
  tagTypes: ["EmailQueue", "DeleteEmailQueues"],
  endpoints(builder) {
    return {
      getAllEmailQueues: builder.query<EmailQueue[], number | void>({
        query() {
          return "/getAllEmailQueues";
        },
        providesTags: ["EmailQueue"],
      }),
      addNewEmailQueue: builder.mutation<void, EmailQueue>({
        query(payload) {
          return {
            url: "/newEmailQueue",
            method: "POST",
            body: payload,
          };
        },
        invalidatesTags: ["EmailQueue"],
      }),
      deleteEmailQueue: builder.mutation<void, string>({
        query: (_id) => ({
          url: `/deleteEmailQueue/${_id}`,
          method: "Delete",
        }),
        invalidatesTags: ["EmailQueue"],
      }),
      deleteMultipleEmailQueues: builder.mutation<void, DeleteEmailQueues>({
        query: (payload) => ({
          url: "/deleteEmailQueues",
          method: "Delete",
          body: payload,
        }),
        invalidatesTags: ["EmailQueue"],
      }),
    };
  },
});

export const {
  useAddNewEmailQueueMutation,
  useGetAllEmailQueuesQuery,
  useDeleteEmailQueueMutation,
  useDeleteMultipleEmailQueuesMutation
} = emailQueueSlice;
