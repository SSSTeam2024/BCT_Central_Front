import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface htmlPageModel {
  _id?: string;
  name: string;
  link :string;
  quoteForm: string;
  header: string;
  menu: string;
  aboutUs: string;
  ourValues: string;
  offerServices: string;
  footerList: string[];
  socialMedia: string
}

export const htmlPageSlice = createApi({
  reducerPath: "htmlpage",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}/api/html-pages/`,
  }),
  tagTypes: ["htmlPageModel"],
  endpoints(builder) {
    return {
        generate: builder.query<htmlPageModel[], string | void>({
        query(_id) {
          return `/generate/${_id}`;
        },
        providesTags: ["htmlPageModel"],
      }),
      create: builder.mutation<htmlPageModel, htmlPageModel>({
        query: (payload) => ({
          url: `/create`,
          method: "POST",
          body: payload,
        }),
        invalidatesTags: ["htmlPageModel"],
      }),
    };
  },
});

export const {
  useCreateMutation,
  useLazyGenerateQuery,
} = htmlPageSlice;
