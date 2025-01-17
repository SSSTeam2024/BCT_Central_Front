import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface FooterSocialModel {
    _id?: string;
    termsAndConditions: {
        name: string;
        link:string
        display: string;
      };
      privacyPolicy: {
        name: string;
        link:string
        display: string;
      };
      siteName: string
      socialLinks: {
        x: {
            link: string,
            display: string,
          },
          facebook: {
            link: string,
            display: string,
          },
          googlePlus: {
            link: string,
            display: string,
          },
          tiktok: {
            link: string,
            display: string,
          },
          youtube: {
            link: string,
            display: string,
          },
      }
  }
  
export const footerSocialSlice = createApi({
  reducerPath: "footerSocial",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}/api/footer-social/`,
  }),
  tagTypes: ["FooterSocialModel"],
  endpoints(builder) {
    return {
        getFooterSocials: builder.query<FooterSocialModel[], number | void>({
        query() {
          return "/getFooterSocials";
        },
        providesTags: ["FooterSocialModel"],
      }),
      updateFooterSocial: builder.mutation<void, FooterSocialModel>({
        query: ({ _id, ...rest }) => ({
          url: `/updateFooterSocial/${_id}`,
          method: "PATCH",
          body: rest,
        }),
        invalidatesTags: ["FooterSocialModel"],
      }),
    //   deleteMenu: builder.mutation<void, FooterList>({
    //     query: (_id) => ({
    //       url: `/deleteMenu/${_id}`,
    //       method: "Delete",
    //     }),
    //     invalidatesTags: ["FooterList"],
    //   }),
    };
  },
});

export const {
  useGetFooterSocialsQuery,
  useUpdateFooterSocialMutation
} = footerSocialSlice;
