import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface ShortCode {
  _id?: string;
  name: string;
  text: string;
}

export const shortCodeSlice = createApi({
  reducerPath: "shortCode",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}/api/shortCode`,
  }),
  tagTypes: ["ShortCode"],
  endpoints(builder) {
    return {
      getAllShortCodes: builder.query<ShortCode[], number | void>({
        query() {
          return "/get-all-short-codes";
        },
        providesTags: ["ShortCode"],
      }),
    //   fetchShortCodeById: builder.query<ShortCode, string | void>({
    //     query: (_id) => ({
    //       url: `/getShortCodeById/${_id}`,
    //       method: "GET",
    //     }),
    //     providesTags: ["ShortCode"],
    //   }),
      addNewShortCode: builder.mutation<void, ShortCode>({
        query(payload) {
          return {
            url: "/create-short-code",
            method: "POST",
            body: payload,
          };
        },
        invalidatesTags: ["ShortCode"],
      }),
      deleteShortCode: builder.mutation<void, ShortCode>({
        query: (_id) => ({
          url: `/delete-short-code/${_id}`,
          method: "Delete",
        }),
        invalidatesTags: ["ShortCode"],
      }),
      updateShortCode: builder.mutation<void, ShortCode>({
        query: ({ _id, ...rest }) => ({
          url: `/update-short-code/${_id}`,
          method: "PATCH",
          body: rest,
        }),
        invalidatesTags: ["ShortCode"],
      }),
    };
  },
});

export const {
  useAddNewShortCodeMutation,
  useDeleteShortCodeMutation,
  useGetAllShortCodesQuery,
useUpdateShortCodeMutation
} = shortCodeSlice;
