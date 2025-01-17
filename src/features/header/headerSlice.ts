import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface HeaderModel {
  _id?: string;
  logo?: string;
  logo_link: string;
  logo_base64: string;
  logo_extension: string;
  phone_label: string;
  phone_value: string;
  email_label: string;
  email_value: string;
  button_text: string;
  button_link: string;
  color: string;
  address_label: string;
  address_value: string;
  phone_display: string;
  email_display: string;
  button_display: string;
  address_display: string;
}

export const headerSlice = createApi({
  reducerPath: "header",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}/api/header/`,
  }),
  tagTypes: ["HeaderModel"],
  endpoints(builder) {
    return {
      getAllHeaders: builder.query<HeaderModel[], number | void>({
        query() {
          return "/getHeaders";
        },
        providesTags: ["HeaderModel"],
      }),
      updateHeader: builder.mutation<void, HeaderModel>({
        query: ({ _id, ...rest }) => ({
          url: `/updateHeader/${_id}`,
          method: "PATCH",
          body: rest,
        }),
        invalidatesTags: ["HeaderModel"],
      }),
      deleteHeader: builder.mutation<void, HeaderModel>({
        query: (_id) => ({
          url: `/deleteHeader/${_id}`,
          method: "Delete",
        }),
        invalidatesTags: ["HeaderModel"],
      }),
    };
  },
});

export const {
  useGetAllHeadersQuery,
  useDeleteHeaderMutation,
  useUpdateHeaderMutation,
} = headerSlice;
