import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface PricingCalendar {
  _id?: string;
  name: string;
  vehicle_type: string;
  uplift: string;
  days: string[];
  endTime: string;
  endDate: string;
  startTime: string;
  startDate: string;
  accountSchool?: string;
  accountPassenger?: string;
  exclusive: string;
  priority: string;
  accountCompany?: string;
  endPeriod: string;
  allAccounts?: string[];
  allVehicles?: string[];
  startPeriod: string;
}

export const pricingCalendarSlice = createApi({
  reducerPath: "pricingCalendar",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}/api/pricingCalendar`,
  }),
  tagTypes: ["PricingCalendar"],
  endpoints(builder) {
    return {
      getAllPricingCalendars: builder.query<PricingCalendar[], number | void>({
        query() {
          return "/getAllPricingCalendars";
        },
        providesTags: ["PricingCalendar"],
      }),
      addNewPricingCalendar: builder.mutation<void, PricingCalendar>({
        query(payload) {
          return {
            url: "/newPricingCalendar",
            method: "POST",
            body: payload,
          };
        },
        invalidatesTags: ["PricingCalendar"],
      }),
      deletePricingCalendar: builder.mutation<void, PricingCalendar>({
        query: (_id) => ({
          url: `/deletePricingCalendar/${_id}`,
          method: "Delete",
        }),
        invalidatesTags: ["PricingCalendar"],
      }),
    };
  },
});

export const {
  useAddNewPricingCalendarMutation,
  useDeletePricingCalendarMutation,
  useGetAllPricingCalendarsQuery,
} = pricingCalendarSlice;
