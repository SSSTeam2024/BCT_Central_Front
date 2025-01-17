import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface PageCollection {
  _id?: string;
  label: string;
  link: string;
}

export const pageSlice = createApi({
  reducerPath: "page",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}/api/pages`,
  }),
  tagTypes: ["PageCollection"],
  endpoints(builder) {
    return {
      getAllPages: builder.query<PageCollection[], number | void>({
        query() {
          return "/getPages";
        },
        providesTags: ["PageCollection"],
      }),
      addNewPage: builder.mutation<void, PageCollection>({
        query(payload) {
          return {
            url: "/createPage",
            method: "POST",
            body: payload,
          };
        },
        invalidatesTags: ["PageCollection"],
      }),
      deletePage: builder.mutation<void, PageCollection>({
        query: (_id) => ({
          url: `/deleteMileageBand/${_id}`,
          method: "Delete",
        }),
        invalidatesTags: ["PageCollection"],
      }),
      updatePage: builder.mutation<void, PageCollection>({
        query: ({ _id, ...rest }) => ({
          url: `/updateMileageBand/${_id}`,
          method: "PATCH",
          body: rest,
        }),
        invalidatesTags: ["PageCollection"],
      }),
    };
  },
});

export const {
  useAddNewPageMutation,
  useDeletePageMutation,
  useGetAllPagesQuery,
  useUpdatePageMutation
} = pageSlice;
