import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface VehiclesClassModel {
  _id?: string;
  page: string;
  bigTitle: string,
  paragraph: string,
  vehicleTypes: {
    title: string,
    link: string,
    icon: string,
    display: string
  }[],
  display?: string,
  order?: string,
  typeComponent?: string,
}

export const vehicleClassSlice = createApi({
  reducerPath: "vehicleclass",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}/api/vehicles-class-component`,
  }),
  tagTypes: ["VehiclesClassModel"],
  endpoints(builder) {
    return {
        getVehicleClass: builder.query<VehiclesClassModel[], number | void>({
        query() {
          return "/getVehiclesClass";
        },
        providesTags: ["VehiclesClassModel"],
      }),
      updateVehicleClass: builder.mutation<void, VehiclesClassModel>({
              query: ({ _id, ...rest }) => ({
                url: `/updateVehicleClass/${_id}`,
                method: "PATCH",
                body: rest,
              }),
              invalidatesTags: ["VehiclesClassModel"],
            }),
            addVehicleClasse: builder.mutation<void, VehiclesClassModel>({
                                      query(payload) {
                                        return {
                                          url: "/createVehiclesClass",
                                          method: "POST",
                                          body: payload,
                                        };
                                      },
                                      invalidatesTags: ["VehiclesClassModel"],
                                    }),
    };
  },
});

export const { useGetVehicleClassQuery, useUpdateVehicleClassMutation,useAddVehicleClasseMutation } = vehicleClassSlice;
