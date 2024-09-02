import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface School {
  _id?: string;
  name: string;
  login: string;
  password: string;
  email: string;
  phone: string;
  activity: string;
  address: string;
  service_date: string;
  statusSchool: string;
  legal_status: string;
  account_name: string;
  corporateCategory: string;
  contract: string;
  sort_code: string;
  account_number: string;
  bank_name: string;
  id_creation_date: string;
  id_file: string;
  IdFileBase64String: string;
  IdFileExtension: string;
}

export const schoolSlice = createApi({
  reducerPath: "school",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}/api/authSchool`,
  }),
  tagTypes: ["School"],
  endpoints(builder) {
    return {
      getAllSchools: builder.query<School[], number | void>({
        query() {
          return "/getAllSchools";
        },
        providesTags: ["School"],
      }),
      fetchSchoolById: builder.query<School, string | void>({
        query: (_id) => ({
          url: `/getSchool/${_id}`,
          method: "GET",
        }),
        providesTags: ["School"],
      }),
      addNewSchool: builder.mutation<void, School>({
        query(payload) {
          return {
            url: "/registerSchool",
            method: "POST",
            body: payload,
          };
        },
        invalidatesTags: ["School"],
      }),
      deleteSchool: builder.mutation<void, School>({
        query: (_id) => ({
          url: `/deleteSchool/${_id}`,
          method: "Delete",
        }),
        invalidatesTags: ["School"],
      }),
      updateSchool: builder.mutation<void, School>({
        query: ({ _id, ...rest }) => ({
          url: `/updateSchool/${_id}`,
          method: "PATCH",
          body: rest,
        }),
        invalidatesTags: ["School"],
      }),
    };
  },
});

export const {
  useAddNewSchoolMutation,
  useDeleteSchoolMutation,
  useGetAllSchoolsQuery,
  useFetchSchoolByIdQuery,
  useUpdateSchoolMutation
} = schoolSlice;
