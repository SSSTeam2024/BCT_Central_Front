import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface OffreServiceModel {
  _id?: string;
  littleTitle: {
    name: string;
    display: string;
  };
  bigTitle: {
    name: string;
    display: string;
  };
  cards: {
    title: string;
    display: string;
    content: string;
    icon: string;
    newImage?: string;
    image: string;
    image_base64?: string;
    image_extension?: string;
  }[];
  associatedPage: string;
  display?: string
  order?: string
}

export interface CardOffer {
  offerId?: string;
  title: string;
  display: string;
  content: string;
  icon: string;
  image: string;
  image_base64: string;
  image_extension: string;
}

export const offreServiceSlice = createApi({
  reducerPath: "offreservices",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}/api/offre-service-component/`,
  }),
  tagTypes: ["OffreServiceModel"],
  endpoints(builder) {
    return {
      getOfferService: builder.query<OffreServiceModel[], number | void>({
        query() {
          return "/getOfferService";
        },
        providesTags: ["OffreServiceModel"],
      }),
      updateOfferService: builder.mutation<void, OffreServiceModel>({
        query: ({ _id, ...rest }) => ({
          url: `/updateOfferService/${_id}`,
          method: "PATCH",
          body: rest,
        }),
        invalidatesTags: ["OffreServiceModel"],
      }),
      addServiceOffer: builder.mutation<void, OffreServiceModel>({
              query(payload) {
                return {
                  url: "/createOfferService",
                  method: "POST",
                  body: payload,
                };
              },
              invalidatesTags: ["OffreServiceModel"],
            }),
      addCardToOfferService: builder.mutation<
        void,
       CardOffer
      >({
        query: ({ offerId, ...rest }) => ({
            url: `/addCardToOfferService/${offerId}`,
            method: "PUT",
            body: rest,
        }),
        invalidatesTags: ["OffreServiceModel"],
      }),
    };
  },
});

export const {
  useAddCardToOfferServiceMutation,
  useGetOfferServiceQuery,
  useUpdateOfferServiceMutation,
  useAddServiceOfferMutation
} = offreServiceSlice;
