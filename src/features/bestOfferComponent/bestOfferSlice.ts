import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface BestOfferModel {
  _id?: string;
  image: {
    path: string;
    display: string;
  };
  page: string;
  image_base64: string;
  image_extension: string;
  littleTitle: {
    name: string;
    display: string;
  };
  bigTitle: {
    name: string;
    display: string;
  };
  subTitle: {
    name: string;
    display: string;
  };
  liltleSubTitle: {
    name: string;
    display: string;
  }
  tabs: {
    title: string;
    display: string;
    content: string;
    buttonLabel: string;
    buttonLink: string;
    buttonDisplay: string;
  }[];
}

export const bestOfferSlice = createApi({
  reducerPath: "bestoffers",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}/api/best-offers-component/`,
  }),
  tagTypes: ["BestOfferModel"],
  endpoints(builder) {
    return {
      getBestOffers: builder.query<BestOfferModel[], number | void>({
        query() {
          return "/getBestOffer";
        },
        providesTags: ["BestOfferModel"],
      }),
      updateBestOffer: builder.mutation<void, BestOfferModel>({
        query: ({ _id, ...rest }) => ({
          url: `/updateBestOffer/${_id}`,
          method: "PATCH",
          body: rest,
        }),
        invalidatesTags: ["BestOfferModel"],
      }),
      addTabToBestOffer: builder.mutation<void, { _id: string; tabData: BestOfferModel["tabs"][0] }>({
        query: ({ _id, tabData }) => ({
          url: `/addTabToBestOffer/${_id}`,
          method: "PUT",
          body: tabData,
        }),
        invalidatesTags: ["BestOfferModel"],
      }),
      
    };
  },
});

export const { useAddTabToBestOfferMutation, useGetBestOffersQuery, useUpdateBestOfferMutation } =
bestOfferSlice;
