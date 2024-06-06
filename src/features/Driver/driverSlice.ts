import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Driver {
  _id?: string;
  username: string;
  password: string;
  email: string;
  profile_image_base64_string: string;
  profile_image_extension: string;
  profile_image: string;
  firstname: string;
  surname: string;
  birthdate: string;
  joindate: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postalcode: string;
  language: string;
  nationality: string;
  phonenumber: string;
  emergency_contact: string;
  driverStatus: string;
  bank_name: string;
  account_name: string;
  account_number: string;
  sort_code: string;
  driver_license_base64_string: string;
  driver_license_extension: string;
  driving_license_expiry: string;
  dqc_base64_string: string;
  dqc_extension: string;
  dqc_expiry: string;
  dbscheck_base64_string: string;
  dbscheck_extension: string;
  dbs_issue_date: string;
  dbs_badge_date: string;
  pvc_expiry: string;
  contract_base64_string: string;
  contract_extension: string;
  deposti_held: string;
  notes: string;
  driver_license: string;
  dqc: string;
  dbscheck: string;
  contract: string;
}

export const driverSlice = createApi({
  reducerPath: "driver",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}/api/driver`,
  }),
  tagTypes: ["Driver"],
  endpoints(builder) {
    return {
      getAllDriver: builder.query<Driver[], number | void>({
        query() {
          return "/getAllDrivers";
        },
        providesTags: ["Driver"],
      }),
      getDriverByID: builder.query<Driver, string | void>({
        query: (_id) => ({
          url: `/getDriver/${_id}`,
          method: "GET",
        }),
        providesTags: ["Driver"],
      }),
      addNewDriver: builder.mutation<void, Driver>({
        query(payload) {
          return {
            url: "/register",
            method: "POST",
            body: payload,
          };
        },
        invalidatesTags: ["Driver"],
      }),
      deleteDriver: builder.mutation<void, Driver>({
        query: (_id) => ({
          url: `/deleteDriver/${_id}`,
          method: "Delete",
        }),
        invalidatesTags: ["Driver"],
      }),
    };
  },
});

export const {
  useAddNewDriverMutation,
  useGetAllDriverQuery,
  useDeleteDriverMutation,
  useGetDriverByIDQuery,
} = driverSlice;
