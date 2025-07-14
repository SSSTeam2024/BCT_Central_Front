import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface OffersModel {
  _id?: string;
  name: string;
  school_id?: string | null;
  company_id?: string | null;
  contract_id?: string | null;
  vehicle_id: string;
  driver_id: string;
  pick_up: string;
  destination: string;
  cost: string;
  offer_number: string;
}

export const offerSlice = createApi({
  reducerPath: "offers",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}/api/offer`,
  }),
  tagTypes: ["OffersModel"],
  endpoints(builder) {
    return {
      getAllOffers: builder.query<OffersModel[], number | void>({
        query() {
          return "/getAll";
        },
        providesTags: ["OffersModel"],
      }),
      addNewOffer: builder.mutation<void, OffersModel>({
        query(payload) {
          return {
            url: "/create-new",
            method: "POST",
            body: payload,
          };
        },
        invalidatesTags: ["OffersModel"],
      }),
      deleteOffer: builder.mutation<void, OffersModel>({
        query: (_id) => ({
          url: `/delete/${_id}`,
          method: "Delete",
        }),
        invalidatesTags: ["OffersModel"],
      }),
      updateOffer: builder.mutation<void, OffersModel>({
        query: ({ _id, ...rest }) => ({
          url: `/update/${_id}`,
          method: "PATCH",
          body: rest,
        }),
        invalidatesTags: ["OffersModel"],
      }),
    };
  },
});

export const {
  useAddNewOfferMutation,
  useDeleteOfferMutation,
  useGetAllOffersQuery,
  useUpdateOfferMutation,
} = offerSlice;
