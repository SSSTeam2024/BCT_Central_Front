import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface FleetModel {
    _id?: string;
    page: string;
    grids: {
        image: string;
        title: string;
        details: string;
        image_base64: string;
  image_extension: string;
    }[]
  }
  
export const fleetSlice = createApi({
  reducerPath: "fleet",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}/api/fleets-component/`,
  }),
  tagTypes: ["FleetModel"],
  endpoints(builder) {
    return {
        getAllFleet: builder.query<FleetModel[], number | void>({
        query() {
          return "/get-all-fleets";
        },
        providesTags: ["FleetModel"],
      }),
      updateFleet: builder.mutation<void, FleetModel>({
        query: ({ _id, ...rest }) => ({
          url: `/update-fleet/${_id}`,
          method: "PUT",
          body: rest,
        }),
        invalidatesTags: ["FleetModel"],
      }),
    };
  },
});

export const {
  useGetAllFleetQuery,
  useUpdateFleetMutation
} = fleetSlice;
