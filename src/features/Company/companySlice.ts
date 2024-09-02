import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Company {
  _id?: string;
  name: string;
  address: string;
  email: string;
  phone: string;
  activity: string;
  service_date: string;
  statusCompany: string;
  account_name: string;
  sort_code: string;
  account_number: string;
  bank_name: string;
  login: string;
  password: string;
  logoBase64String: string;
  logoExtension: string;
  logo_file: string;
  legel_card_base64_string: string;
  legal_card_extension: string;
  legal_file: string;
}

export const companySlice = createApi({
  reducerPath: "company",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}/api/companies`,
  }),
  tagTypes: ["Company"],
  endpoints(builder) {
    return {
      getAllCompany: builder.query<Company[], number | void>({
        query() {
          return "/getAllCompanies";
        },
        providesTags: ["Company"],
      }),
      fetchCompanyById: builder.query<Company, string | void>({
        query: (_id) => ({
          url: `/getCompany/${_id}`,
          method: "GET",
        }),
        providesTags: ["Company"],
      }),
      addNewCompany: builder.mutation<void, Company>({
        query(payload) {
          return {
            url: "/newCompany",
            method: "POST",
            body: payload,
          };
        },
        invalidatesTags: ["Company"],
      }),
      updateCompany: builder.mutation<void, Company>({
        query: ({ _id, ...rest }) => ({
          url: `/updateCompany/${_id}`,
          method: "PATCH",
          body: rest,
        }),
        invalidatesTags: ["Company"],
      }),
      deleteCompany: builder.mutation<void, Company>({
        query: (_id) => ({
          url: `/deleteCompany/${_id}`,
          method: "Delete",
        }),
        invalidatesTags: ["Company"],
      }),
    };
  },
});

export const {
  useAddNewCompanyMutation,
  useDeleteCompanyMutation,
  useGetAllCompanyQuery,
  useFetchCompanyByIdQuery,
  useUpdateCompanyMutation
} = companySlice;
