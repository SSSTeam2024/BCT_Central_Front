import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface WaitingBand {
  _id?: string;
  vehicle_type: string;
  hours_limit: string;
  price: string;
}

export const waitingBandSlice = createApi({
  reducerPath: "waitingBand",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}/api/waitingBand`,
  }),
  tagTypes: ["WaitingBand"],
  endpoints(builder) {
    return {
      getAllWaitingBands: builder.query<WaitingBand[], number | void>({
        query() {
          return "/getAllWaitingBands";
        },
        providesTags: ["WaitingBand"],
      }),
      addNewWaitingBand: builder.mutation<void, WaitingBand>({
        query(payload) {
          return {
            url: "/newWaitingBand",
            method: "POST",
            body: payload,
          };
        },
        invalidatesTags: ["WaitingBand"],
      }),
      deleteWaitingBand: builder.mutation<void, WaitingBand>({
        query: (_id) => ({
          url: `/deleteWaitingBand/${_id}`,
          method: "Delete",
        }),
        invalidatesTags: ["WaitingBand"],
      }),
      updateWaitingBand: builder.mutation<void, WaitingBand>({
        query: ({ _id, ...rest }) => ({
          url: `/updateWaitingBand/${_id}`,
          method: "PATCH",
          body: rest,
        }),
        invalidatesTags: ["WaitingBand"],
      }),
    };
  },
});

export const {
  useAddNewWaitingBandMutation,
  useDeleteWaitingBandMutation,
  useGetAllWaitingBandsQuery,
  useUpdateWaitingBandMutation
} = waitingBandSlice;
