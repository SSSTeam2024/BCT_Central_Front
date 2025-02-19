import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface VehicleGuideModel {
  _id?: string;
  page: string;
  paragraph: string,
  display?: string,
  order?: string,
  typeComponent?: string,
  vehicleType: {
    title: string,
    content: string,
    image: string,
    display: string
  }[]
}

export const vehicleGuideSlice = createApi({
  reducerPath: "vehicleguide",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}/api/vehicle-guide-component`,
  }),
  tagTypes: ["VehicleGuideModel"],
  endpoints(builder) {
    return {
        getVehicleGuides: builder.query<VehicleGuideModel[], number | void>({
        query() {
          return "/getVehicleGuides";
        },
        providesTags: ["VehicleGuideModel"],
      }),
      updateVehicleGuide: builder.mutation<void, VehicleGuideModel>({
              query: ({ _id, ...rest }) => ({
                url: `/updateVehicle/${_id}`,
                method: "PATCH",
                body: rest,
              }),
              invalidatesTags: ["VehicleGuideModel"],
            }),
            addVehicleGuide: builder.mutation<void, VehicleGuideModel>({
                          query(payload) {
                            return {
                              url: "/createVehicleGuide",
                              method: "POST",
                              body: payload,
                            };
                          },
                          invalidatesTags: ["VehicleGuideModel"],
                        }),
    };
  },
});

export const { useGetVehicleGuidesQuery, useUpdateVehicleGuideMutation, useAddVehicleGuideMutation } = vehicleGuideSlice;
