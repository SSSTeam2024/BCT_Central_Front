import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Location {
  _id?: string;
  start_point: {
    placeName: string;
    coordinates: {
      lat: number;
      lon: number;
    };
    postalCode: string;
  };
}

export const locationSlice = createApi({
  reducerPath: "location",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}/api/location/`,
  }),
  tagTypes: ["Location"],
  endpoints(builder) {
    return {
      getAllLocations: builder.query<Location[], number | void>({
        query() {
          return "/getAllLocations";
        },
        providesTags: ["Location"],
      }),
      getLocation: builder.query<Location, string | void>({
        query: (_id) => ({
          url: `/getLocationById/${_id}`,
          method: "GET",
        }),
        providesTags: ["Location"],
      }),
      addNewLocation: builder.mutation<void, Location>({
        query(payload) {
          return {
            url: "/newLocation",
            method: "POST",
            body: payload,
          };
        },
        invalidatesTags: ["Location"],
      }),
      deleteLocation: builder.mutation<void, Location>({
        query: (_id) => ({
          url: `/deleteLocation/${_id}`,
          method: "Delete",
        }),
        invalidatesTags: ["Location"],
      }),
    };
  },
});

export const {
  useAddNewLocationMutation,
  useDeleteLocationMutation,
  useGetAllLocationsQuery,
  useGetLocationQuery,
} = locationSlice;
