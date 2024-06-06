import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Attachment {
  _id?: string;
  name: string;
  attachment_base64_string: string;
  attachment_extension: string;
  attachment: string;
}

export const attachmentSlice = createApi({
  reducerPath: "Attachment",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}/api/attachment`,
  }),
  tagTypes: ["Attachment"],
  endpoints(builder) {
    return {
      getAllAttachments: builder.query<Attachment[], number | void>({
        query() {
          return "/all_attachments";
        },
        providesTags: ["Attachment"],
      }),
      getAttachmentByID: builder.query<Attachment, string | void>({
        query: (_id) => ({
          url: `/get_attachment/${_id}`,
          method: "GET",
        }),
        providesTags: ["Attachment"],
      }),
      addNewAttachment: builder.mutation<void, Attachment>({
        query(payload) {
          return {
            url: "/new_attachment",
            method: "POST",
            body: payload,
          };
        },
        invalidatesTags: ["Attachment"],
      }),
      deleteAttachment: builder.mutation<void, Attachment>({
        query: (_id) => ({
          url: `/delete_attachment/${_id}`,
          method: "Delete",
        }),
        invalidatesTags: ["Attachment"],
      }),
    };
  },
});

export const {
  useAddNewAttachmentMutation,
  useDeleteAttachmentMutation,
  useGetAllAttachmentsQuery,
  useGetAttachmentByIDQuery
} = attachmentSlice;