import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Vehicle {
  _id?: string;
  registration_number: string;
  model: string;
  color: string;
  type: string;
  max_passengers: string;
  fleet_number: string;
  engine_number: string;
  sale_date: string;
  purchase_price: string;
  purchase_date: string;
  depot_name: string;
  registration_date: string;
  mileage: string;
  statusVehicle: string;
  manufacturer: string;
  engine_size: string;
  fuel_type: string;
  speed_limit: string;
  insurance_type: string;
  insurance_policy_number: string;
  ownership: string;
  owner_name: string;
  note: string;
  extra: string[];
  vehicle_images_base64_string: string[];
  vehicle_images_extension: string[];
  vehicle_images: string[];
  mot_expiry: string;
  mot_file_base64_string: string;
  mot_file_extension: string;
  tax_expiry: string;
  tax_file_base64_string: string;
  tax_file_extension: string;
  insurance_file_base64_string: string;
  insurance_file_extension: string;
  insurance_expiry: string;
  inspection_due: string;
  service_due: string;
  tacho_calibration_due: string;
  coif_certificate_number: string;
  coif_certificate_date: string;
  hp_start_date: string;
  hp_end_date: string;
  hp_reference_no: string;
  monthly_repayment_amount: string;
  hp_company: string;
  mot_file: string;
  tax_file: string;
  insurance_file: string;
}

export const vehicleSlice = createApi({
  reducerPath: "vehicle",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}/api/vehicle`,
  }),
  tagTypes: ["Vehicle"],
  endpoints(builder) {
    return {
      getAllVehicles: builder.query<Vehicle[], number | void>({
        query() {
          return "/getAllVehicles";
        },
        providesTags: ["Vehicle"],
      }),
      getVehicleByID: builder.query<Vehicle, string | void>({
        query: (_id) => ({
          url: `/getVehicle/${_id}`,
          method: "GET",
        }),
        providesTags: ["Vehicle"],
      }),
      addNewVehicle: builder.mutation<void, Vehicle>({
        query(payload) {
          return {
            url: "/newVehicle",
            method: "POST",
            body: payload,
          };
        },
        invalidatesTags: ["Vehicle"],
      }),
      updateVehicle: builder.mutation<void, Vehicle>({
        query: ({ _id, ...rest }) => ({
          url: `/updateVehicle/${_id}`,
          method: "PATCH",
          body: rest,
        }),
        invalidatesTags: ["Vehicle"],
      }),
      deleteVehicle: builder.mutation<void, Vehicle>({
        query: (_id) => ({
          url: `/deleteVehicle/${_id}`,
          method: "Delete",
        }),
        invalidatesTags: ["Vehicle"],
      }),
    };
  },
});

export const {
  useAddNewVehicleMutation,
  useGetAllVehiclesQuery,
  useDeleteVehicleMutation,
  useGetVehicleByIDQuery,
  useUpdateVehicleMutation
} = vehicleSlice;
