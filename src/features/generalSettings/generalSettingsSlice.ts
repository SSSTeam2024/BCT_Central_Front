import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface GeneralSet {
  _id?: string;
  trading_name: string;
  registred_name: string;
  company_number: string;
  tax_number: string;
  driver_app_code: string;
  billing_profile: string;
  prefix: string;
  copy_customer_details: string;
  address: string;
  tel: string;
  mobile: string;
  sales_email: string;
  op_email: string;
  color: string;
  currency_symbol: string;
  symbol_position: string;
  balance_due: string;
  default_deposit_type: string;
  default_deposit_amount: string;
  auto_pricing_type: string;
  auto_pricing_amount: string;
  show_journey_price: string;
  show_journey: string;
  enquiry_email: string;
  booking_email: string;
  regular_email: string;
  mobile_sms: string;
  bcc_email: string;
  logoBase64Strings?: string;
  logoExtension?: string;
  logo: string;
}

export const generalSetSlice = createApi({
  reducerPath: "generalsettings",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}/api/application`,
  }),
  tagTypes: ["GeneralSet"],
  endpoints(builder) {
    return {
      getAllApps: builder.query<GeneralSet[], number | void>({
        query() {
          return "/getAll";
        },
        providesTags: ["GeneralSet"],
      }),
      updateApp: builder.mutation<void, GeneralSet>({
        query: ({ _id, ...rest }) => ({
          url: `/update/${_id}`,
          method: "PUT",
          body: rest,
        }),
        invalidatesTags: ["GeneralSet"],
      }),
    };
  },
});

export const { useGetAllAppsQuery, useUpdateAppMutation } = generalSetSlice;
