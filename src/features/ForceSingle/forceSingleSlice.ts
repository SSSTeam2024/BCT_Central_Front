import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface ForceSingle {
  _id?: string;
  car: string;
  percentage: string;
  hours_wait: string;
  miles: string;
}

export const forceSingleSlice = createApi({
  reducerPath: "forceSingle",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}/api/forceSingle`,
  }),
  tagTypes: ["ForceSingle"],
  endpoints(builder) {
    return {
      getAllForceSingles: builder.query<ForceSingle[], number | void>({
        query() {
          return "/getAllForceSingles";
        },
        providesTags: ["ForceSingle"],
      }),
      addNewForceSingle: builder.mutation<void, ForceSingle>({
        query(payload) {
          return {
            url: "/newForceSingle",
            method: "POST",
            body: payload,
          };
        },
        invalidatesTags: ["ForceSingle"],
      }),
      deleteForceSingle: builder.mutation<void, ForceSingle>({
        query: (_id) => ({
          url: `/deleteForceSingle/${_id}`,
          method: "Delete",
        }),
        invalidatesTags: ["ForceSingle"],
      }),
      updateForceSingle: builder.mutation<void, ForceSingle>({
        query: ({ _id, ...rest }) => ({
          url: `/updateForceSingle/${_id}`,
          method: "PATCH",
          body: rest,
        }),
        invalidatesTags: ["ForceSingle"],
      }),
    };
  },
});

export const {
  useAddNewForceSingleMutation,
  useDeleteForceSingleMutation,
  useGetAllForceSinglesQuery,
  useUpdateForceSingleMutation
} = forceSingleSlice;
