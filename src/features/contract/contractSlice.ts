import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Contract {
  _id?: string;
  contractName: string;
  invoiceFrequency: string;
  customerNotes: string;
  staffNotes: string;
  prices: string;
  salesperson: string;
  idProgram: string;
  idAccount: string;
  vehicleType: string;
  journeyType: string;
  luggageDetails: string;
  contractStatus: string;
  accountRef: string;
  accountName: string;
  accountEmail: string;
  accountPhone: string;
  unit_price: string;
  contractRef?: string;
  idSchool?: string;
  idCompany?: string;
}

export interface UpdateContractStatus {
  contract_id: string;
  effectiveDate: string;
}

export const contractSlice = createApi({
  reducerPath: "contract",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}/api/contract/`,
  }),
  tagTypes: ["Contract", "UpdateContractStatus"],
  endpoints(builder) {
    return {
      getAllContracts: builder.query<Contract[], number | void>({
        query() {
          return "/getAllContracts";
        },
        providesTags: ["Contract"],
      }),
      getContract: builder.query<Contract, string | void>({
        query: (_id) => ({
          url: `/getContractByID/${_id}`,
          method: "GET",
        }),
        providesTags: ["Contract"],
      }),
      addNewContract: builder.mutation<void, Contract>({
        query(payload) {
          return {
            url: "/newContract",
            method: "POST",
            body: payload,
          };
        },
        invalidatesTags: ["Contract"],
      }),
      updateContract: builder.mutation<void, Contract>({
        query: ({ _id, ...rest }) => ({
          url: `/updateContract/${_id}`,
          method: "PUT",
          body: rest,
        }),
        invalidatesTags: ["Contract"],
      }),
      deleteContract: builder.mutation<void, Contract>({
        query: (_id) => ({
          url: `/deleteContract/${_id}`,
          method: "Delete",
        }),
        invalidatesTags: ["Contract"],
      }),
      updateContractStatusToApproved: builder.mutation<
        void,
        UpdateContractStatus
      >({
        query(payload) {
          return {
            url: "/updateContractStatus",
            method: "POST",
            body: payload,
          };
        },
        invalidatesTags: ["Contract", "UpdateContractStatus"],
      }),
    };
  },
});

export const {
  useAddNewContractMutation,
  useGetAllContractsQuery,
  useDeleteContractMutation,
  useUpdateContractMutation,
  useGetContractQuery,
  useUpdateContractStatusToApprovedMutation,
} = contractSlice;
