import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface PricingPostalCode {
  _id?: string;
  type_vehicle: string;
  postal_code: string;
  miles: string;
  uplift: string;
  title: string;
}

export const pricingPostalCodeSlice = createApi({
  reducerPath: "pricingPostalCode",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}/api/pricingPostalCode/`,
  }),
  tagTypes: ["PricingPostalCode"],
  endpoints(builder) {
    return {
      getAllPricingPostalCodes: builder.query<
        PricingPostalCode[],
        number | void
      >({
        query() {
          return "/getAllPricingPostalCodes";
        },
        providesTags: ["PricingPostalCode"],
      }),
      getPricingPostalCode: builder.query<PricingPostalCode, number | void>({
        query: (_id) => ({
          url: `/getPricingPostalCode/${_id}`,
          method: "GET",
        }),
        providesTags: ["PricingPostalCode"],
      }),
      addNewPricingPostalCode: builder.mutation<void, PricingPostalCode>({
        query(payload) {
          return {
            url: "/newPricingPostalCode",
            method: "POST",
            body: payload,
          };
        },
        invalidatesTags: ["PricingPostalCode"],
      }),
      deletePricingPostalCode: builder.mutation<void, PricingPostalCode>({
        query: (_id) => ({
          url: `/deletePricingPostalCode/${_id}`,
          method: "Delete",
        }),
        invalidatesTags: ["PricingPostalCode"],
      }),
    };
  },
});

export const {
  useAddNewPricingPostalCodeMutation,
  useDeletePricingPostalCodeMutation,
  useGetAllPricingPostalCodesQuery,
  useGetPricingPostalCodeQuery,
} = pricingPostalCodeSlice;
