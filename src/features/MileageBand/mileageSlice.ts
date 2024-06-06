import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface MileageBand {
  _id?: string;
  vehicle_type: {
    _id?: string;
    base_change: string;
    type: string;
  };
  mileage_limit: string;
  price: string;
}

export const mileageBandSlice = createApi({
  reducerPath: "mileageBand",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}/api/mileageBand`,
  }),
  tagTypes: ["MileageBand"],
  endpoints(builder) {
    return {
      getAllMileageBands: builder.query<MileageBand[], number | void>({
        query() {
          return "/getAllMileageBands";
        },
        providesTags: ["MileageBand"],
      }),
      addNewMileageBand: builder.mutation<void, MileageBand>({
        query(payload) {
          return {
            url: "/newMileageBand",
            method: "POST",
            body: payload,
          };
        },
        invalidatesTags: ["MileageBand"],
      }),
      deleteMileageBand: builder.mutation<void, MileageBand>({
        query: (_id) => ({
          url: `/deleteMileageBand/${_id}`,
          method: "Delete",
        }),
        invalidatesTags: ["MileageBand"],
      }),
    };
  },
});

export const {
  useAddNewMileageBandMutation,
  useDeleteMileageBandMutation,
  useGetAllMileageBandsQuery,
} = mileageBandSlice;
