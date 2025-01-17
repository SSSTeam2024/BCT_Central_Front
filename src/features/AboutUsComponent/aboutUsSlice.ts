import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface AboutUsModel {
  _id?: string;
  page: string;
  image: {
    path: string;
    display: string;
  };
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
  paragraph: {
    content: string;
    display: string;
  };
  button: {
    label: string;
    display: string;
    link: string;
  };
}

export const aboutUsSlice = createApi({
  reducerPath: "aboutus",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}/api/about-us-component/`,
  }),
  tagTypes: ["AboutUsModel"],
  endpoints(builder) {
    return {
      getAboutUsComponents: builder.query<AboutUsModel[], number | void>({
        query() {
          return "/getAboutUsComponents";
        },
        providesTags: ["AboutUsModel"],
      }),
      updateAboutUs: builder.mutation<void, AboutUsModel>({
        query: ({ _id, ...rest }) => ({
          url: `/updateAboutUsComponent/${_id}`,
          method: "PATCH",
          body: rest,
        }),
        invalidatesTags: ["AboutUsModel"],
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

export const { useGetAboutUsComponentsQuery, useUpdateAboutUsMutation } =
  aboutUsSlice;
