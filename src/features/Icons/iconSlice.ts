import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface IconModel {
  _id?: string;
  label: string;
  code: string;
}

export const iconSlice = createApi({
  reducerPath: "icon",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}/api/icons`,
  }),
  tagTypes: ["IconModel"],
  endpoints(builder) {
    return {
      getAllIcons: builder.query<IconModel[], number | void>({
        query() {
          return "/getIcons";
        },
        providesTags: ["IconModel"],
      }),
      addNewIcon: builder.mutation<void, IconModel>({
        query(payload) {
          return {
            url: "/createIcon",
            method: "POST",
            body: payload,
          };
        },
        invalidatesTags: ["IconModel"],
      }),
    //   deletePage: builder.mutation<void, IconModel>({
    //     query: (_id) => ({
    //       url: `/deleteMileageBand/${_id}`,
    //       method: "Delete",
    //     }),
    //     invalidatesTags: ["IconModel"],
    //   }),
    //   updatePage: builder.mutation<void, IconModel>({
    //     query: ({ _id, ...rest }) => ({
    //       url: `/updateMileageBand/${_id}`,
    //       method: "PATCH",
    //       body: rest,
    //     }),
    //     invalidatesTags: ["IconModel"],
    //   }),
    };
  },
});

export const {
  useAddNewIconMutation,
  useGetAllIconsQuery,
} = iconSlice;
